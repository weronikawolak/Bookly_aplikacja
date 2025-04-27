from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth.models import User
from django.urls import reverse

class AuthenticationTests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="testuser", password="testpass")
        self.client = APIClient()
        self.books_url = reverse('books-list')

    def test_access_without_token(self):
        # Próba dostępu BEZ tokena
        response = self.client.get(self.books_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_access_with_invalid_token(self):
        # Ustawiamy nieprawidłowy token
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + 'invalidtoken123')
        response = self.client.get(self.books_url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
