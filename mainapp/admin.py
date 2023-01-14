from django.contrib import admin

from mainapp import models as mainapp_models
from todoapp import models as todoapp_models


@admin.register(mainapp_models.User)
class UserAdmin(admin.ModelAdmin):
    list_display = ["last_name", "first_name", "email"]
    ordering = ["last_name"]


@admin.register(todoapp_models.Project)
class ProjectAdmin(admin.ModelAdmin):
    pass


@admin.register(todoapp_models.Todo)
class TodoAdmin(admin.ModelAdmin):
    pass
