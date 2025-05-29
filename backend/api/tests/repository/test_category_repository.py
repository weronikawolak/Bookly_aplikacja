from django.test import TestCase
from unittest.mock import patch
from api.repositories.category_repository import CategoryRepository

class CategoryRepositoryTests(TestCase):

    def test_list_categories(self):
        with patch("api.repositories.category_repository.Category.objects.all") as mock_all:
            CategoryRepository.list_categories()
            mock_all.assert_called_once()
