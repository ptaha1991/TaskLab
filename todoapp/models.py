from django.db import models

from mainapp.models import User


class Project(models.Model):
    name = models.CharField(max_length=64)
    link = models.URLField(blank=True, null=True)
    users = models.ManyToManyField(User)


class Todo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    created_user = models.ForeignKey(User, on_delete=models.CASCADE)
    active = models.BooleanField(default=True, blank=False)
