from django.test import TestCase
from unittest.mock import patch, MagicMock
from api.repositories.review_repository import ReviewRepository

class ReviewRepositoryTests(TestCase):

    def setUp(self):
        self.user = MagicMock()

    def test_get_user_reviews(self):
        with patch("api.repositories.review_repository.Review.objects.filter") as mock_filter:
            ReviewRepository.get_user_reviews(self.user)
            mock_filter.assert_called_once_with(user=self.user)

    def test_create_review(self):
        with patch("api.repositories.review_repository.Review.objects.create") as mock_create:
            validated_data = {"book": 1, "rating": 5, "comment": "Good"}
            ReviewRepository.create_review(self.user, validated_data)
            mock_create.assert_called_once_with(user=self.user, **validated_data)
