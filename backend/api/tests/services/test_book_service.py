from django.test import TestCase
from unittest.mock import patch, MagicMock
from django.contrib.auth.models import User
from api.services.book_service import BookService

class BookServiceTests(TestCase):

    def setUp(self):
        self.user = MagicMock()
        self.validated_data = {
            "title": "Test Book",
            "author": "Author",
            "status": "wishlist",
            "category_id": 1
        }

    def test_list_user_books(self):
        with patch("api.services.book_service.BookRepository.get_user_books") as mock_get:
            BookService.list_user_books(self.user)
            mock_get.assert_called_once_with(self.user)

    def test_create_book(self):
        with patch("api.services.book_service.BookRepository.create_book") as mock_create:
            BookService.create_book(self.user, self.validated_data)
            mock_create.assert_called_once_with(self.user, self.validated_data)
