from rest_framework import permissions
from rest_framework.permissions import BasePermission


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        # Jeśli użytkownik jest właścicielem albo adminem, zezwól
        return obj.user == request.user or request.user.groups.filter(name='ROLE_ADMIN').exists()

class IsAdminUser(BasePermission):
    """
    Pozwala tylko użytkownikom z grupy 'ROLE_ADMIN'.
    """

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.groups.filter(name='ROLE_ADMIN').exists()