# from rest_framework import viewsets, status
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework.permissions import AllowAny, IsAuthenticated
# from rest_framework.authentication import TokenAuthentication
# from django.contrib.auth.models import User, Group
# from django.http import JsonResponse
# from rest_framework.exceptions import PermissionDenied
# from rest_framework.permissions import IsAdminUser
# from .models import Book, Review, Category
# from .serializers import BookSerializer, ReviewSerializer, CategorySerializer

# from api.services.book_service import BookService
# from api.services.review_service import ReviewService
# from api.services.category_service import CategoryService
# from api.services.user_service import UserService

# from api.permissions import IsOwnerOrAdmin 

# def home(request):
#     return JsonResponse({"message": "Welcome to the Bookly API!"})

# class BookViewSet(viewsets.ModelViewSet):
#     serializer_class = BookSerializer
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated, IsOwnerOrAdmin]

#     def get_queryset(self):
#         user = self.request.user
#         # Jeśli użytkownik jest adminem ➔ zwracaj WSZYSTKIE książki
#         if user.groups.filter(name='ROLE_ADMIN').exists():
#             return Book.objects.all()
#         # Zwykły użytkownik ➔ tylko swoje książki
#         return Book.objects.filter(user=user)

#     def perform_create(self, serializer):
#         book = BookService.create_book(self.request.user, serializer.validated_data)
#         serializer.instance = book

#     def destroy(self, request, *args, **kwargs):
#         book = self.get_object()

#         if request.user.groups.filter(name='ROLE_ADMIN').exists():
#             return super().destroy(request, *args, **kwargs)

#         if book.user == request.user:
#             return super().destroy(request, *args, **kwargs)

#         raise PermissionDenied("You do not have permission to delete this book.")


# class ReviewViewSet(viewsets.ModelViewSet):
#     serializer_class = ReviewSerializer
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return ReviewService.list_user_reviews(self.request.user)

#     def perform_create(self, serializer):
#         ReviewService.create_review(self.request.user, serializer.validated_data)

# class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
#     serializer_class = CategorySerializer
#     permission_classes = [AllowAny]

#     def get_queryset(self):
#         return CategoryService.list_categories()

# class RegisterUserView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         username = request.data.get("username")
#         email = request.data.get("email")
#         password = request.data.get("password")

#         if User.objects.filter(username=username).exists():
#             return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

#         user, token = UserService.register_user(username, email, password)

#         # PRZYPISYWANIE GRUPY "ROLE_USER"
#         user_group, created = Group.objects.get_or_create(name='ROLE_USER')
#         user.groups.add(user_group)

#         return Response({"token": token.key, "user_id": user.id}, status=status.HTTP_201_CREATED)

# class LoginUserView(APIView):
#     permission_classes = [AllowAny]

#     def post(self, request):
#         username = request.data.get("username")
#         password = request.data.get("password")

#         user = UserService.authenticate_user(username, password)

#         if user:
#             token = UserService.get_token_for_user(user)
#             return Response({"token": token.key, "user_id": user.id}, status=status.HTTP_200_OK)

#         return Response({"error": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)

# class LogoutUserView(APIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]

#     def post(self, request):
#         request.auth.delete()
#         return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

# class UserDetailView(APIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         user = request.user
#         return Response({
#             "id": user.id,
#             "username": user.username,
#             "email": user.email,
#             "date_joined": user.date_joined.strftime('%Y-%m-%d %H:%M:%S')
#         })

# class UserBooksView(APIView):
#     authentication_classes = [TokenAuthentication]
#     permission_classes = [IsAuthenticated]

#     def get(self, request):
#         books = BookService.list_user_books(request.user)
#         serializer = BookSerializer(books, many=True)
#         return Response(serializer.data)



from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User, Group
from django.http import JsonResponse
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAdminUser
from .models import Book, Review, Category
from .serializers import BookSerializer, ReviewSerializer, CategorySerializer
from drf_spectacular.utils import extend_schema, OpenApiExample

from api.services.book_service import BookService
from api.services.review_service import ReviewService
from api.services.category_service import CategoryService
from api.services.user_service import UserService

from api.permissions import IsOwnerOrAdmin 

def home(request):
    return JsonResponse({"message": "Welcome to the Bookly API!"})

@extend_schema(
    tags=['Books'],
    description="Endpoint do zarządzania książkami użytkownika lub admina.",
    responses=BookSerializer,
)

class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated, IsOwnerOrAdmin]

    def get_queryset(self):
        user = self.request.user
        # Jeśli użytkownik jest adminem ➔ zwracaj WSZYSTKIE książki
        if user.groups.filter(name='ROLE_ADMIN').exists():
            return Book.objects.all()
        # Zwykły użytkownik ➔ tylko swoje książki
        return Book.objects.filter(user=user)

    def perform_create(self, serializer):
        book = BookService.create_book(self.request.user, serializer.validated_data)
        serializer.instance = book

    def destroy(self, request, *args, **kwargs):
        book = self.get_object()

        if request.user.groups.filter(name='ROLE_ADMIN').exists():
            return super().destroy(request, *args, **kwargs)

        if book.user == request.user:
            return super().destroy(request, *args, **kwargs)

        raise PermissionDenied("You do not have permission to delete this book.")

@extend_schema(
    tags=['Reviews'],
    description="Endpoint do zarządzania recenzjami książek.",
    responses=ReviewSerializer,
)


class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ReviewService.list_user_reviews(self.request.user)

    def perform_create(self, serializer):
        ReviewService.create_review(self.request.user, serializer.validated_data)

@extend_schema(
    tags=['Categories'],
    description="Endpoint do odczytu dostępnych kategorii książek.",
    responses=CategorySerializer,
)

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        return CategoryService.list_categories()

@extend_schema(
    tags=['Authentication'],
    description="Rejestracja nowego użytkownika. Zwraca token.",
    request=OpenApiExample(
        name="Register User",
        value={"username": "example", "email": "example@email.com", "password": "secret123"},
    ),
    responses={201: OpenApiExample(name="Token response", value={"token": "xyz", "user_id": 1})}
)

class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user, token = UserService.register_user(username, email, password)

        # PRZYPISYWANIE GRUPY "ROLE_USER"
        user_group, created = Group.objects.get_or_create(name='ROLE_USER')
        user.groups.add(user_group)

        return Response({"token": token.key, "user_id": user.id}, status=status.HTTP_201_CREATED)

@extend_schema(
    tags=['Authentication'],
    description="Logowanie użytkownika. Zwraca token.",
    request=OpenApiExample(
        name="Login User",
        value={"username": "example", "password": "secret123"},
    ),
    responses={200: OpenApiExample(name="Token response", value={"token": "xyz", "user_id": 1})}
)

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

@extend_schema(
    tags=['Authentication'],
    description="Wylogowanie użytkownika. Usuwa token.",
    responses={200: OpenApiExample(name="Logout response", value={"message": "Logged out successfully"})}
)

class LogoutUserView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.auth.delete()
        return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

@extend_schema(
    tags=['User'],
    description="Zwraca dane zalogowanego użytkownika.",
    responses={
        200: OpenApiExample(
            name="User Details",
            value={"id": 1, "username": "example", "email": "example@email.com", "date_joined": "2024-04-26 13:10:00"}
        )
    }
)



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

@extend_schema(
    tags=['Books'],
    description="Zwraca listę książek zalogowanego użytkownika.",
    responses=BookSerializer(many=True)
)


class UserBooksView(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        books = BookService.list_user_books(request.user)
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
