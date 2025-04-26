from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth.models import User
from api.models import Book, Category
from django.urls import reverse

class ReviewTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="reviewer", password="testpass")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.category = Category.objects.create(name="Fantasy")
        self.book = Book.objects.create(
            title="Fantasy Book",
            author="Fantasy Author",
            status="reading",
            category=self.category,
            user=self.user
        )

    def test_create_review(self):
        url = reverse('reviews-list')
        data = {
            "book": self.book.id,
            "rating": 5,
            "comment": "Amazing book!"
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_reviews_list(self):
        url = reverse('reviews-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_review_unauthenticated(self):
        client = APIClient()  # niezalogowany
        url = reverse('reviews-list')
        data = {
            "book": self.book.id,
            "rating": 4,
            "comment": "Good book."
        }
        response = client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
