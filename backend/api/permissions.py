from rest_framework.permissions import BasePermission
from rest_framework import permissions


class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user or request.user.groups.filter(name='ROLE_ADMIN').exists()

class IsAdminUser(BasePermission):

    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated and request.user.groups.filter(name='ROLE_ADMIN').exists()