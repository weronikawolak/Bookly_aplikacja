from api.repositories.user_repository import UserRepository
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

class UserService:

    @staticmethod
    def register_user(username, email, password):
        user = UserRepository.create_user(username, email, password)
        token, _ = Token.objects.get_or_create(user=user)
        return user, token

    @staticmethod
    def authenticate_user(username, password):
        return authenticate(username=username, password=password)

    @staticmethod
    def get_token_for_user(user):
        token, _ = Token.objects.get_or_create(user=user)
        return token
