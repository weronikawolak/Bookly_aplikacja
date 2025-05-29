from django.test import TestCase
from unittest.mock import patch
from api.repositories.user_repository import UserRepository

class UserRepositoryTests(TestCase):

    def test_create_user(self):
        with patch("api.repositories.user_repository.User.objects.create_user") as mock_create_user:
            UserRepository.create_user("testuser", "test@example.com", "password123")
            mock_create_user.assert_called_once_with(username="testuser", email="test@example.com", password="password123")

    def test_get_user_by_username(self):
        with patch("api.repositories.user_repository.User.objects.filter") as mock_filter:
            mock_query = mock_filter.return_value
            mock_first = mock_query.first
            UserRepository.get_user_by_username("testuser")
            mock_filter.assert_called_once_with(username="testuser")
            mock_first.assert_called_once()
