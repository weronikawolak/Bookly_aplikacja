# from api.models import Book

# class BookRepository:

#     @staticmethod
#     def get_user_books(user):
#         return Book.objects.filter(user=user)

#     @staticmethod
#     def get_book(pk):
#         return Book.objects.get(pk=pk)

#     @staticmethod
#     def create_book(**kwargs):
#         return Book.objects.create(**kwargs)

#     @staticmethod
#     def delete_book(book):
#         book.delete()
from api.models import Book

class BookRepository:

    @staticmethod
    def get_user_books(user):
        return Book.objects.filter(user=user)

    @staticmethod
    def get_book(pk):
        return Book.objects.get(pk=pk)

    @staticmethod
    def create_book(user, validated_data):
        return Book.objects.create(user=user, **validated_data)

    @staticmethod
    def delete_book(book):
        book.delete()
