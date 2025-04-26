from api.models import Category

class CategoryRepository:

    @staticmethod
    def list_categories():
        return Category.objects.all()
