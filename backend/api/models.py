from django.db import models
from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

class ReadingGoal(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    year = models.IntegerField()
    goal = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)


    class Meta:
        unique_together = ['user', 'year']

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name
    
    # books/models.py
class CustomList(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="custom_lists")

    def __str__(self):
        return f"{self.name} ({self.user.username})"


class Book(models.Model):
    STATUS_CHOICES = [
        ('reading', 'Czytam'),
        ('completed', 'Przeczytane'),
        ('wishlist', 'Do przeczytania'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    category = models.CharField(max_length=100, null=True, blank=True)  # zamiast ForeignKey
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='wishlist')
    rating = models.IntegerField(null=True, blank=True)
    review = models.TextField(blank=True)
    pages = models.PositiveIntegerField(null=True, blank=True)
    cover_url = models.URLField(null=True, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    pages_read = models.PositiveIntegerField(default=0)  # ✅ <-- TO TUTAJ
    custom_list = models.ForeignKey(CustomList, on_delete=models.CASCADE, null=True, blank=True, related_name="books")


    def __str__(self):
        return self.title

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="reviews")
    rating = models.PositiveIntegerField()
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.username} for {self.book.title}"
    

