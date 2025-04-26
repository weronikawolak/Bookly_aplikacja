# tests/test_books.py

from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth.models import User
from django.urls import reverse
from api.models import Book
from api.models import Category

class BookTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

        self.category = Category.objects.create(name="Fiction")

        self.book = Book.objects.create(
            title="Test Book",
            author="Test Author",
            status="wishlist",
            category=self.category,
            user=self.user
        )

    def test_create_book(self):
        url = reverse('books-list')  # Twój router powinien mieć basename=book
        data = {
            "title": "New Book",
            "author": "New Author",
            "status": "reading",
            "category_id": self.category.id,
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Book.objects.count(), 2)
        self.assertEqual(Book.objects.get(id=response.data['id']).title, "New Book")

    def test_get_books_list(self):
        url = reverse('user-books')  # własny endpoint /api/user/books/
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertGreaterEqual(len(response.data), 1)

    def test_get_single_book(self):
        url = reverse('books-detail', kwargs={'pk': self.book.id})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.book.title)

    def test_update_book(self):
        url = reverse('books-detail', kwargs={'pk': self.book.id})
        data = {
            "status": "completed",
            "rating": 5,
            "review": "Excellent book."
        }
        response = self.client.patch(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.book.refresh_from_db()
        self.assertEqual(self.book.status, "completed")
        self.assertEqual(self.book.rating, 5)

    def test_delete_book(self):
        url = reverse('books-detail', kwargs={'pk': self.book.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Book.objects.filter(id=self.book.id).exists())

    def test_create_book_invalid_data(self):
        url = reverse('books-list')
        data = {
            "title": "",  # brak tytułu
            "author": "Author",
            "status": "wishlist",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_unauthorized_access(self):
        client = APIClient()  # niezalogowany klient
        url = reverse('books-list')
        response = client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

# from django.test import TestCase

# class SimpleTest(TestCase):
#     def test_basic_addition(self):
#         self.assertEqual(2 + 2, 4)
