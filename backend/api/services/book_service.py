from api.repositories.book_repository import BookRepository

class BookService:

    @staticmethod
    def list_user_books(user):
        return BookRepository.get_user_books(user)

    @staticmethod
    def create_book(user, validated_data):
        return BookRepository.create_book(user, validated_data)

    def update_book(book, validated_data):
            for attr, value in validated_data.items():
                setattr(book, attr, value)

            # wymuszenie aktualizacji czasu
            book.updated_at = timezone.now()
            book.save()
            return book