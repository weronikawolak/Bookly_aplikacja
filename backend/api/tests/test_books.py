from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth.models import User, Group
from api.models import Book, Category
from django.urls import reverse

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
        url = reverse('books-list')
        data = {
            "title": "New Book",
            "author": "New Author",
            "status": "reading",
            "category_id": self.category.id,
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Book.objects.count(), 2)

    def test_get_books_list(self):
        url = reverse('user-books')
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

    def test_delete_book(self):
        url = reverse('books-detail', kwargs={'pk': self.book.id})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Book.objects.filter(id=self.book.id).exists())

    def test_create_book_invalid_data(self):
        url = reverse('books-list')
        data = {
            "title": "",
            "author": "Author",
            "status": "wishlist",
        }
        response = self.client.post(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_unauthorized_access(self):
        client = APIClient()
        url = reverse('books-list')
        response = client.get(url)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # --- Nowe testy dla 404 ---
    def test_get_nonexistent_book(self):
        url = reverse('books-detail', kwargs={'pk': 9999})
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_nonexistent_book(self):
        url = reverse('books-detail', kwargs={'pk': 9999})
        data = {"status": "completed"}
        response = self.client.patch(url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_delete_nonexistent_book(self):
        url = reverse('books-detail', kwargs={'pk': 9999})
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_admin_can_see_all_books(self):
        # Stwórz drugiego użytkownika i jego książkę
        other_user = User.objects.create_user(username="otheruser", password="testpass")
        other_book = Book.objects.create(
            title="Other Book",
            author="Other Author",
            status="wishlist",
            category=self.category,
            user=other_user
        )

        # Zrób admina z testowego usera
        admin_group, created = Group.objects.get_or_create(name='ROLE_ADMIN')
        self.user.groups.add(admin_group)

        # Admin powinien widzieć WSZYSTKIE książki
        url = reverse('books-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)  # 2 książki: własna + cudza

    def test_user_sees_only_their_books(self):
        # Stwórz drugiego użytkownika i jego książkę
        other_user = User.objects.create_user(username="otheruser", password="testpass")
        Book.objects.create(
            title="Other Book",
            author="Other Author",
            status="wishlist",
            category=self.category,
            user=other_user
        )

        # Zwykły user powinien widzieć tylko SWOJĄ książkę
        url = reverse('books-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_user_cannot_delete_other_users_book(self):
        # Stwórz drugiego użytkownika i jego książkę
        other_user = User.objects.create_user(username="otheruser", password="testpass")
        other_book = Book.objects.create(
            title="Other Book",
            author="Other Author",
            status="wishlist",
            category=self.category,
            user=other_user
        )

        # Zwykły user próbuje usunąć cudzą książkę ➔ powinien dostać 403
        url = reverse('books-detail', kwargs={'pk': other_book.id})
        response = self.client.delete(url)
        self.assertIn(response.status_code, [status.HTTP_403_FORBIDDEN, status.HTTP_404_NOT_FOUND])
