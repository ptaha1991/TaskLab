from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from mainapp.models import CustomUser


class CustomUserAdmin(UserAdmin):
    model = CustomUser

    list_display = ["username", "email", "is_active"]
    ordering = ["-date_joined"]

    fieldsets = (
        (None, {"fields": ("username", "email", "password", "first_name", "last_name", "birthday_year")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "email",
                    "password1",
                    "password2",
                    "first_name",
                    "last_name",
                    "birthday_year",
                    "is_staff",
                    "is_active",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
    )


admin.site.register(CustomUser, CustomUserAdmin)
