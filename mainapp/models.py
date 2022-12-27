from uuid import uuid4

from django.db import models


class User(models.Model):
    id = models.UUIDField(default=uuid4, primary_key=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    birthday_year = models.PositiveIntegerField(blank=True, null=True)
    email = models.CharField(max_length=256, unique=True)
