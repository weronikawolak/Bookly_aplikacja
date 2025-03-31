from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework import generics, status, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from .models import Book, Review, Category
from .serializers import BookSerializer, ReviewSerializer, CategorySerializer

def home(request):
    return JsonResponse({"message": "Welcome to the Bookly API!"})

class BookViewSet(viewsets.ModelViewSet):
    serializer_class = BookSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Book.objects.filter(user=self.request.user) 

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)  
class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Review.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]


class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, email=email, password=password)
        token, _ = Token.objects.get_or_create(user=user)

        return Response({"token": token.key, "user_id": user.id}, status=status.HTTP_201_CREATED)


class LoginUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")

        print(f"🔍 Próba logowania: {username} / {password}")  

        user = authenticate(username=username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            print(f" Zalogowano: {user.username}, Token: {token.key}")

            return Response({"token": token.key, "user_id": user.id}, status=status.HTTP_200_OK)

        print("❌ Błąd logowania!")  
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
        books = Book.objects.filter(user=request.user)  # ✅ poprawione
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data)
