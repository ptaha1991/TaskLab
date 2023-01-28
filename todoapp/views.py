import copy

from rest_framework import permissions, viewsets
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import BrowsableAPIRenderer, JSONRenderer
from rest_framework.response import Response

from .filters import ProjectFilter, TodoFilter
from .models import Project, Todo
from .serializers import ProjectModelSerializer, TodoModelSerializer


class CustomDjangoModelPermission(permissions.DjangoModelPermissions):
    def __init__(self):
        self.perms_map = copy.deepcopy(self.perms_map)
        self.perms_map["GET"] = ["%(app_label)s.view_%(model_name)s"]


class ProjectLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 10


class TodoLimitOffsetPagination(LimitOffsetPagination):
    default_limit = 20


class ProjectModelViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    permission_classes = [CustomDjangoModelPermission]
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    filterset_class = ProjectFilter
    pagination_class = ProjectLimitOffsetPagination


class TodoModelViewSet(viewsets.ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    permission_classes = [CustomDjangoModelPermission]
    filterset_class = TodoFilter
    pagination_class = TodoLimitOffsetPagination
    # filterset_fields = {
    #     'project': ['exact'],
    #     'created_at': ['gte', 'lte']
    # }

    def destroy(self, request, *args, **kwargs):
        todo_object = self.get_object()
        todo_object.active = False
        todo_object.save()

        return Response({"message": "Todo has been closed"})
