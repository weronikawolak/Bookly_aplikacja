from django.test import TestCase
from unittest.mock import patch, MagicMock
from api.services.user_service import UserService

class UserServiceTests(TestCase):

    def setUp(self):
        self.user = MagicMock()

    def test_register_user(self):
        with patch("api.services.user_service.UserRepository.create_user") as mock_create_user, \
             patch("api.services.user_service.Token.objects.get_or_create") as mock_get_token:
            
            mock_user = MagicMock()
            mock_token = MagicMock()
            mock_create_user.return_value = mock_user
            mock_get_token.return_value = (mock_token, True)

            user, token = UserService.register_user("user", "email@example.com", "pass123")

            mock_create_user.assert_called_once_with("user", "email@example.com", "pass123")
            mock_get_token.assert_called_once_with(user=mock_user)
            self.assertEqual(user, mock_user)
            self.assertEqual(token, mock_token)

    def test_authenticate_user(self):
        with patch("api.services.user_service.authenticate") as mock_auth:
            UserService.authenticate_user("user", "pass")
            mock_auth.assert_called_once_with(username="user", password="pass")

    def test_get_token_for_user(self):
        with patch("api.services.user_service.Token.objects.get_or_create") as mock_get_token:
            mock_token = MagicMock()
            mock_get_token.return_value = (mock_token, False)

            token = UserService.get_token_for_user(self.user)

            mock_get_token.assert_called_once_with(user=self.user)
            self.assertEqual(token, mock_token)
