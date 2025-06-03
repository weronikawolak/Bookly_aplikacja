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
        custom_lists = validated_data.pop('custom_lists', [])
        book = Book.objects.create(user=user, **validated_data)
        if custom_lists:
            book.custom_lists.set(custom_lists)
        return book
    @staticmethod
    def delete_book(book):
        book.delete()
