from rest_framework.serializers import HyperlinkedModelSerializer

from .models import Project, Todo


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = ("id", "name", "link")


class TodoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Todo
        fields = ("id", "project", "text", "created_user", "active")
