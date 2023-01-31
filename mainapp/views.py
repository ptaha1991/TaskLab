from rest_framework import mixins, viewsets

from todoapp.views import CustomDjangoModelPermission

from .models import CustomUser
from .serializers import UserModelSerializer


class UserCustomViewSet(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet
):
    queryset = CustomUser.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [CustomDjangoModelPermission]
