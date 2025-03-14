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
from rest_framework import viewsets
from .models import Book
from .serializers import BookSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()  # 👈 DODAJ TO, jeśli go brakuje!
    serializer_class = BookSerializer
