from django.contrib.auth.models import User

class UserRepository:

    @staticmethod
    def create_user(username, email, password):
        return User.objects.create_user(username=username, email=email, password=password)

    @staticmethod
    def get_user_by_username(username):
        return User.objects.filter(username=username).first()
