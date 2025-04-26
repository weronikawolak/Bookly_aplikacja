from api.repositories.review_repository import ReviewRepository

class ReviewService:

    @staticmethod
    def list_user_reviews(user):
        return ReviewRepository.get_user_reviews(user)

    @staticmethod
    def create_review(user, validated_data):
        return ReviewRepository.create_review(user, validated_data)
