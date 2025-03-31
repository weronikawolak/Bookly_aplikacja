from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import BookViewSet, ReviewViewSet, CategoryViewSet, RegisterUserView, LoginUserView, LogoutUserView, UserDetailView
from api.views import UserBooksView

router = DefaultRouter()
router.register(r'books', BookViewSet, basename='books')
router.register(r'reviews', ReviewViewSet, basename='reviews')
router.register(r'categories', CategoryViewSet, basename='categories')

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('', home, name='home'),
#     path('api/', include(router.urls)),
#     path("api/register/", RegisterUserView.as_view(), name="register"),
#     path("api/login/", LoginUserView.as_view(), name="login"),
#     path("api/logout/", LogoutUserView.as_view(), name="logout"),
#     path("api/user/", UserDetailView.as_view(), name="user-detail"),
#     path("api/user-books/", UserBooksView.as_view(), name="user-books"),
# ]

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/register/', RegisterUserView.as_view(), name="register"),
    path('api/login/', LoginUserView.as_view(), name="login"),
    path('api/logout/', LogoutUserView.as_view(), name="logout"),
    path('api/user/', UserDetailView.as_view(), name='user-detail'),
    path('api/user/books/', UserBooksView.as_view(), name='user-books'),  # ✅ dodaj to

]