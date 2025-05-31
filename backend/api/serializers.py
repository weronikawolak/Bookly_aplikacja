from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Book, Review, ReadingGoal
from .models import CustomList


# class CategorySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Category
#         fields = ['id', 'name']

# class BookSerializer(serializers.ModelSerializer):
#     category = CategorySerializer(read_only=True)
#     category_id = serializers.PrimaryKeyRelatedField(
#         queryset=Category.objects.all(), source='category', write_only=True
#     )

#     class Meta:
#         model = Book
#         fields = '__all__'
#         read_only_fields = ['user']


# class ReadingGoalSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ReadingGoal
#         fields = ['id', 'user', 'year', 'goal']
#         read_only_fields = ['user']

class ReadingGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadingGoal
        fields = ['id', 'year', 'goal']


class ReadingProgressSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    goal = serializers.IntegerField()
    completed = serializers.IntegerField()
    progress = serializers.FloatField()


# class BookSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Book
#         fields = [
#             'id', 'user', 'title', 'author', 'category',
#             'status', 'rating', 'review', 'pages', 'cover_url', 'description', 'pages_read'
#         ]
#         read_only_fields = ['user']

class BookSerializer(serializers.ModelSerializer):

    class Meta:
        model = Book
        fields = [
            'id', 'user', 'title', 'author', 'category',
            'status', 'rating', 'review', 'pages',
            'cover_url', 'description', 'created_at', 'pages_read', 'updated_at', 'custom_list'
        ]
        read_only_fields = ['user', 'created_at', 'updated_at']



class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'user', 'book', 'rating', 'comment', 'created_at']

class CustomListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomList
        fields = ['id', 'name']


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
        return user
