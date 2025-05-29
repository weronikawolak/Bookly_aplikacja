from django.test import TestCase
from unittest.mock import patch
from api.services.category_service import CategoryService

class CategoryServiceTests(TestCase):

    def test_list_categories(self):
        with patch("api.services.category_service.CategoryRepository.list_categories") as mock_list:
            CategoryService.list_categories()
            mock_list.assert_called_once()
