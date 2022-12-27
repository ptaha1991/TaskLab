from django.contrib import admin

from mainapp import models as mainapp_models


@admin.register(mainapp_models.User)
class LessonAdmin(admin.ModelAdmin):
    list_display = ["last_name", "first_name", "email"]
    ordering = ["last_name"]
