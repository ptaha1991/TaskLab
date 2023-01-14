from rest_framework import mixins, viewsets

from .models import User
from .serializers import UserModelSerializer


class UserCustomViewSet(
    mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.ListModelMixin, viewsets.GenericViewSet
):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
