from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import BookViewSet, home, RegisterUserView, LoginUserView, LogoutUserView

router = DefaultRouter()
router.register(r'books', BookViewSet, basename='book')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'),
    path('api/', include(router.urls)),
    path("api/register/", RegisterUserView.as_view(), name="register"),
    path("api/login/", LoginUserView.as_view(), name="login"),
    path("api/logout/", LogoutUserView.as_view(), name="logout"),
]
