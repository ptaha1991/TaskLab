from rest_framework.serializers import ModelSerializer

from .models import Project, Todo


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = ("url", "id", "name", "link")


class TodoModelSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = ("url", "id", "project", "text", "created_user", "active")
