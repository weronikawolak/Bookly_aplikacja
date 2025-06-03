from rest_framework import viewsets, status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import action
from django.contrib.auth.models import User, Group
from django.http import JsonResponse
from django.utils import timezone
from rest_framework.exceptions import PermissionDenied
from drf_spectacular.utils import extend_schema, OpenApiExample
from datetime import datetime
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter

from .models import Book, Review, Category, ReadingGoal, CustomList
from .serializers import (
    BookSerializer, ReviewSerializer, ReadingGoalSerializer,
    ReadingProgressSerializer, CustomListSerializer, CategorySerializer
)
from api.services.book_service import BookService
from api.services.review_service import ReviewService
from api.services.user_service import UserService
from api.permissions import IsOwnerOrAdmin
from .tasks import test_task
from .tasks import send_welcome_email

def home(request):
    return JsonResponse({"message": "Welcome to the Bookly API!"})

def test_view(request):
    test_task.delay()
    return JsonResponse({"message": "Zadanie wysłane do kolejki"})


@extend_schema(tags=['Books'])
class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ['status', 'author', 'category']
    ordering_fields = ['title', 'created_at', 'updated_at', 'pages']
    search_fields = ['title', 'author', 'description']

    # def get_queryset(self):
    #     user = self.request.user
    #     if user.groups.filter(name='ROLE_ADMIN').exists():
    #         return Book.objects.all()
    #     return Book.objects.filter(user=user)

    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='ROLE_ADMIN').exists():
            return Book.objects.all().order_by('id')
        return Book.objects.filter(user=user).order_by('id')

    def perform_create(self, serializer):
        # book = BookService.create_book(self.request.user, serializer.validated_data)
        # serializer.instance = book
        serializer.save(user=self.request.user)


    def destroy(self, request, *args, **kwargs):
        book = self.get_object()
        if request.user.groups.filter(name='ROLE_ADMIN').exists() or book.user == request.user:
            return super().destroy(request, *args, **kwargs)
        raise PermissionDenied("You do not have permission to delete this book.")

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        if "status" in serializer.validated_data:
            instance.updated_at = timezone.now()
        self.perform_update(serializer)
        return Response(serializer.data)


@extend_schema(tags=['Reviews'])
class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, OrderingFilter, SearchFilter]
    filterset_fields = ['book']
    ordering_fields = ['created_at', 'rating']
    search_fields = ['text']

    def get_queryset(self):
        return ReviewService.list_user_reviews(self.request.user)

    def perform_create(self, serializer):
        ReviewService.create_review(self.request.user, serializer.validated_data)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = [OrderingFilter, SearchFilter]
    ordering_fields = ['name']
    search_fields = ['name']


class ReadingGoalViewSet(viewsets.ModelViewSet):
    serializer_class = ReadingGoalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ReadingGoal.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        year = serializer.validated_data.get('year')
        goal = serializer.validated_data.get('goal')
        user = self.request.user
        ReadingGoal.objects.update_or_create(user=user, year=year, defaults={'goal': goal})

    @action(detail=False, methods=['get'], url_path='progress')
    def progress(self, request):
        try:
            year = int(request.query_params.get('year', datetime.now().year))
        except ValueError:
            return Response({"error": "Invalid year."}, status=status.HTTP_400_BAD_REQUEST)

        goal = ReadingGoal.objects.filter(user=request.user, year=year).first()
        completed = Book.objects.filter(user=request.user, status='completed', updated_at__year=year).count()

        return Response({
            'year': year,
            'goal': goal.goal if goal else None,
            'completed': completed,
            'progress': round((completed / goal.goal) * 100, 2) if goal and goal.goal else 0
        })


class CustomListViewSet(viewsets.ModelViewSet):
    serializer_class = CustomListSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [OrderingFilter, SearchFilter]
    ordering_fields = ['name', 'created_at']
    search_fields = ['name']

    def get_queryset(self):
        return CustomList.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user, token = UserService.register_user(username, email, password)
        user_group, _ = Group.objects.get_or_create(name='ROLE_USER')
        user.groups.add(user_group)

        send_welcome_email.delay(username, email)


        return Response({"token": token.key, "user_id": user.id}, status=status.HTTP_201_CREATED)


class LoginUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = UserService.authenticate_user(username, password)

        if user:
            token = UserService.get_token_for_user(user)
            return Response({"token": token.key, "user_id": user.id}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutUserView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.auth.delete()
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)


class UserDetailView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "date_joined": user.date_joined.strftime('%Y-%m-%d %H:%M:%S')
        })


class UserBooksView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        books = BookService.list_user_books(request.user)
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
