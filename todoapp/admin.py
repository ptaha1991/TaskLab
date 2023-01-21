from django.contrib import admin

from todoapp import models as todoapp_models


@admin.register(todoapp_models.Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ["name", "get_users"]

    def get_users(self, obj):
        return ", ".join([users.last_name for users in obj.users.all()])


@admin.register(todoapp_models.Todo)
class TodoAdmin(admin.ModelAdmin):
    list_display = ["id", "get_project_name", "created_user", "active"]

    def get_project_name(self, obj):
        return obj.project.name

    get_project_name.short_description = "Project"
