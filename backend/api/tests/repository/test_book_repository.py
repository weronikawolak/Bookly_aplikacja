from django.test import TestCase
from unittest.mock import patch, MagicMock
from api.repositories.book_repository import BookRepository

class BookRepositoryTests(TestCase):

    def setUp(self):
        self.user = MagicMock()
        self.book = MagicMock()

    def test_get_user_books(self):
        with patch("api.repositories.book_repository.Book.objects.filter") as mock_filter:
            BookRepository.get_user_books(self.user)
            mock_filter.assert_called_once_with(user=self.user)

    def test_get_book(self):
        with patch("api.repositories.book_repository.Book.objects.get") as mock_get:
            BookRepository.get_book(pk=1)
            mock_get.assert_called_once_with(pk=1)

    def test_create_book(self):
        with patch("api.repositories.book_repository.Book.objects.create") as mock_create:
            validated_data = {"title": "Test", "author": "Author"}
            BookRepository.create_book(self.user, validated_data)
            mock_create.assert_called_once_with(user=self.user, **validated_data)

    def test_delete_book(self):
        book = MagicMock()
        BookRepository.delete_book(book)
        book.delete.assert_called_once()
