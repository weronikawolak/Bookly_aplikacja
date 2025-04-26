from api.repositories.category_repository import CategoryRepository

class CategoryService:

    @staticmethod
    def list_categories():
        return CategoryRepository.list_categories()
