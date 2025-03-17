# from django.shortcuts import render

# from rest_framework import viewsets
# from .models import Book
# from .serializers import BookSerializer
# from rest_framework.permissions import IsAuthenticated

# class BookViewSet(viewsets.ModelViewSet):
#     serializer_class = BookSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Book.objects.filter(user=self.request.user)

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)
from django.http import JsonResponse
from rest_framework import viewsets, status
from django.shortcuts import get_object_or_404
from .models import Book
from .serializers import BookSerializer
from django.contrib.auth.models import User
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

# Widok strony głównej API
def home(request):
    return JsonResponse({"message": "Welcome to the Bookly API!"})


class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Publiczny dostęp

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        user = User.objects.get(username=response.data['username'])
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key, 'user': response.data}, status=status.HTTP_201_CREATED)

# Logowanie użytkownika
class LoginUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = User.objects.filter(username=username).first()

        if user and user.check_password(password):
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)

        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)

# Wylogowanie (usunięcie tokena)
class LogoutUserView(APIView):
    def post(self, request):
        request.auth.delete()  # Usunięcie tokena
        return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]  # 🔹 Tylko zalogowani użytkownicy

    def retrieve(self, request, pk=None):  # Używamy `pk` zamiast `id`
        """ Pobiera książkę na podstawie dynamicznego parametru `pk` """
        book = get_object_or_404(Book, pk=pk)  # Pobieramy książkę po `pk`
        serializer = BookSerializer(book)
        return Response(serializer.data, status=status.HTTP_200_OK)
