from rest_framework import mixins, viewsets

from todoapp.views import CustomDjangoModelPermission

from .models import CustomUser
from .serializers import UserModelSerializer, UserModelSerializerBase


class UserCustomViewSet(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet
):
    queryset = CustomUser.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = [CustomDjangoModelPermission]

    def get_serializer_class(self):
        if self.request.version == "2.0":
            return UserModelSerializerBase
        return UserModelSerializer
