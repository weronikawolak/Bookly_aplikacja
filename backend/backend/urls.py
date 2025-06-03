from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import (
    BookViewSet, ReviewViewSet, RegisterUserView, LoginUserView,
    LogoutUserView, UserDetailView, UserBooksView,
    ReadingGoalViewSet, CustomListViewSet, CategoryViewSet
)
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

router = DefaultRouter()
router.register(r'books', BookViewSet, basename='books')
router.register(r'reviews', ReviewViewSet, basename='reviews')
router.register(r'reading-goal', ReadingGoalViewSet, basename='readinggoal')
router.register(r'custom-lists', CustomListViewSet, basename='customlist')
router.register(r'categories', CategoryViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),

    path('api/v1/', include(router.urls)),
    path('api/v1/register/', RegisterUserView.as_view(), name="register"),
    path('api/v1/login/', LoginUserView.as_view(), name="login"),
    path('api/v1/logout/', LogoutUserView.as_view(), name="logout"),
    path('api/v1/user/', UserDetailView.as_view(), name='user-detail'),
    path('api/v1/user/books/', UserBooksView.as_view(), name='user-books'),
]
