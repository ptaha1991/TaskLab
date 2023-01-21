from rest_framework.serializers import HyperlinkedModelSerializer

from .models import CustomUser


class UserModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ("first_name", "last_name", "email")
        # fields = "__all__"
