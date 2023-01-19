from rest_framework.serializers import ModelSerializer, SerializerMethodField

from .models import Project, Todo


class ProjectModelSerializer(ModelSerializer):
    users = SerializerMethodField("get_users")

    class Meta:
        model = Project
        fields = ("url", "id", "name", "link", "users")

    def get_users(self, obj):
        return ", ".join([users.last_name for users in obj.users.all()])


class TodoModelSerializer(ModelSerializer):
    class Meta:
        model = Todo
        fields = ("url", "id", "project", "text", "created_user", "active")
