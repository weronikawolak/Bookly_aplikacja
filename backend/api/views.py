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
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import Book
from .serializers import BookSerializer

# Widok strony głównej API
def home(request):
    return JsonResponse({"message": "Welcome to the Bookly API!"})

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

    def retrieve(self, request, pk=None):  # Używamy `pk` zamiast `id`
        """ Pobiera książkę na podstawie dynamicznego parametru `pk` """
        book = get_object_or_404(Book, pk=pk)  # Pobieramy książkę po `pk`
        serializer = BookSerializer(book)
        return Response(serializer.data, status=status.HTTP_200_OK)
