import django_filters
from django_filters import rest_framework as filters

from .models import Project, Todo


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr="contains")

    class Meta:
        model = Project
        fields = ["name"]


class TodoFilter(filters.FilterSet):
    created_at_gte = django_filters.DateTimeFilter(
        field_name="created_at__date", lookup_expr="gte", label="created_at is greater than or equal to:"
    )
    created_at_lte = django_filters.DateTimeFilter(
        field_name="created_at__date", lookup_expr="lte", label="created_at is less than or equal to:"
    )

    class Meta:
        model = Todo
        fields = ["project"]
