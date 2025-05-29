from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import BookViewSet, ReviewViewSet, RegisterUserView, LoginUserView, LogoutUserView, UserDetailView
from api.views import UserBooksView
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from api.views import ReadingGoalViewSet
# from api.views import set_reading_goal, reading_goal_progress

router = DefaultRouter()
router.register(r'books', BookViewSet, basename='books')
router.register(r'reviews', ReviewViewSet, basename='reviews')
# router.register(r'categories', basename='categories')
router.register(r'reading-goal', ReadingGoalViewSet, basename='readinggoal')

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
    path('admin/', admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),            # Surowe OpenAPI JSON
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),  # Swagger UI!
    path('api/', include(router.urls)),
    path('api/register/', RegisterUserView.as_view(), name="register"),
    path('api/login/', LoginUserView.as_view(), name="login"),
    path('api/logout/', LogoutUserView.as_view(), name="logout"),
    path('api/user/', UserDetailView.as_view(), name='user-detail'),
    path('api/user/books/', UserBooksView.as_view(), name='user-books'),
    # path('api/reading-goal/', set_reading_goal),
    # path('api/reading-goal/progress/', reading_goal_progress),
]
