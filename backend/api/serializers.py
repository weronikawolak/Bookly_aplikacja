from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Book, Review, ReadingGoal, CustomList, Category


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class BookSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='category',
        write_only=True
    )
    custom_lists = serializers.PrimaryKeyRelatedField(
        queryset=CustomList.objects.all(),
        many=True,
        required=False
    )

    class Meta:
        model = Book
        fields = [
            'id', 'user', 'title', 'author', 'category', 'category_id',
            'status', 'rating', 'review', 'pages',
            'cover_url', 'description', 'created_at', 'pages_read', 'updated_at', 'custom_lists'
        ]
        read_only_fields = ['user', 'created_at', 'updated_at']

    def create(self, validated_data):
        custom_lists = validated_data.pop('custom_lists', [])
        book = Book.objects.create(**validated_data)
        book.custom_lists.set(custom_lists)
        return book

    def update(self, instance, validated_data):
        custom_lists = validated_data.pop('custom_lists', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if custom_lists is not None:
            instance.custom_lists.set(custom_lists)
        return instance


class ReviewSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Review
        fields = ['id', 'user', 'book', 'rating', 'comment', 'created_at']


class CustomListSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomList
        fields = ['id', 'name']


class ReadingGoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReadingGoal
        fields = ['id', 'year', 'goal']


class ReadingProgressSerializer(serializers.Serializer):
    year = serializers.IntegerField()
    goal = serializers.IntegerField()
    completed = serializers.IntegerField()
    progress = serializers.FloatField()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]

    def create(self, validated_data):
        return User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"]
        )
