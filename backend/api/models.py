from django.db import models
from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
    STATUS_CHOICES = [
        ('reading', 'Czytam'),
        ('completed', 'Przeczytane'),
        ('wishlist', 'Do przeczytania'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='wishlist')
    rating = models.IntegerField(null=True, blank=True)
    review = models.TextField(blank=True)

    def __str__(self):
        return self.title
