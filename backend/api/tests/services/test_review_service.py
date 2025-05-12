from django.test import TestCase
from unittest.mock import patch, MagicMock
from api.services.review_service import ReviewService

class ReviewServiceTests(TestCase):

    def setUp(self):
        self.user = MagicMock()
        self.validated_data = {
            "book": 1,
            "rating": 5,
            "comment": "Great book!"
        }

    def test_list_user_reviews(self):
        with patch("api.services.review_service.ReviewRepository.get_user_reviews") as mock_get:
            ReviewService.list_user_reviews(self.user)
            mock_get.assert_called_once_with(self.user)

    def test_create_review(self):
        with patch("api.services.review_service.ReviewRepository.create_review") as mock_create:
            ReviewService.create_review(self.user, self.validated_data)
            mock_create.assert_called_once_with(self.user, self.validated_data)
