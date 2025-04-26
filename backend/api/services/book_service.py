from api.repositories.book_repository import BookRepository

class BookService:

    @staticmethod
    def list_user_books(user):
        return BookRepository.get_user_books(user)

    @staticmethod
    def create_book(user, validated_data):
        return BookRepository.create_book(user, validated_data)
