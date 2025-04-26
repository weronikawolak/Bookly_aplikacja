from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth.models import User
from django.urls import reverse

class UserTests(APITestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", password="testpass")
    
    def test_register_user_success(self):
        url = reverse('register')
        data = {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "newpassword123"
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('token', response.data)
        self.assertIn('user_id', response.data)

    def test_register_user_existing_username(self):
        url = reverse('register')
        data = {
            "username": "testuser",  # już istniejący użytkownik
            "email": "duplicate@example.com",
            "password": "newpassword123"
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(response.data['error'], "Username already exists")

    def test_login_user_success(self):
        url = reverse('login')
        data = {
            "username": "testuser",
            "password": "testpass"
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.assertIn('user_id', response.data)

    def test_login_user_invalid_credentials(self):
        url = reverse('login')
        data = {
            "username": "testuser",
            "password": "wrongpassword"
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertEqual(response.data['error'], "Invalid username or password")

    def test_logout_user(self):
        # Najpierw zaloguj się
        token_url = reverse('login')
        login_data = {"username": "testuser", "password": "testpass"}
        login_response = self.client.post(token_url, login_data, format="json")
        token = login_response.data['token']

        # Ustaw nagłówek tokena
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        # Wyloguj się
        logout_url = reverse('logout')
        response = self.client.post(logout_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['message'], "Logged out successfully")

    def test_user_detail(self):
        # Najpierw zaloguj się
        token_url = reverse('login')
        login_data = {"username": "testuser", "password": "testpass"}
        login_response = self.client.post(token_url, login_data, format="json")
        token = login_response.data['token']

        # Ustaw nagłówek tokena
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token)

        # Pobierz dane użytkownika
        detail_url = reverse('user-detail')
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], "testuser")
