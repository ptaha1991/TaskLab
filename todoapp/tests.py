from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIClient, APIRequestFactory, APITestCase, force_authenticate

from mainapp.models import CustomUser

from .models import Project, Todo
from .views import ProjectModelViewSet


class TestProjectViewSet(TestCase):
    def test_get_list_quest(self):  # 1
        factory = APIRequestFactory()
        request = factory.get("/api/projects/")
        view = ProjectModelViewSet.as_view({"get": "list"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_guest(self):  # 2
        factory = APIRequestFactory()
        request = factory.post("/api/projects/", {"name": "Project5"}, format="json")
        view = ProjectModelViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_admin(self):  # 3
        factory = APIRequestFactory()
        request = factory.post("/api/projects/", {"name": "Project5"}, format="json")
        admin = CustomUser.objects.create_superuser("admin", "admin@admin.com", "admin123456")
        force_authenticate(request, admin)
        view = ProjectModelViewSet.as_view({"post": "create"})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_get_detail_guest(self):  # 4
        project = mixer.blend(Project)
        client = APIClient()
        response = client.get(f"/api/projects/{project.id}/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_edit_admin(self):  # 5
        project = mixer.blend(Project)
        client = APIClient()
        admin = CustomUser.objects.create_superuser("admin", "admin@admin.com", "admin123456")
        client.login(username="admin", password="admin123456")
        response = client.put(f"/api/projects/{project.id}/", {"name": "Proj123"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        project = Project.objects.get(id=project.id)
        self.assertEqual(project.name, "Proj123")
        client.logout()


class TestTodoViewSet(APITestCase):
    def test_get_list_guest(self):  # 6
        response = self.client.get("/api/todos/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_edit_admin(self):  # 7
        todo = mixer.blend(Todo)
        admin = CustomUser.objects.create_superuser("admin", "admin@admin.com", "admin123456")
        self.client.login(username="admin", password="admin123456")
        response = self.client.put(
            f"/api/todos/{todo.id}/",
            {"text": "NewHello", "project": todo.project.id, "created_user": todo.created_user.id},
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        todo = Todo.objects.get(id=todo.id)
        self.assertEqual(todo.text, "NewHello")
