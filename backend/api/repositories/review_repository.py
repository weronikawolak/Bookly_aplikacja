from api.models import Review

class ReviewRepository:

    @staticmethod
    def get_user_reviews(user):
        return Review.objects.filter(user=user)

    @staticmethod
    def create_review(user, validated_data):
        return Review.objects.create(user=user, **validated_data)
