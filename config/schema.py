import graphene
from graphene_django import DjangoObjectType

from mainapp.models import CustomUser
from todoapp.models import Project, Todo


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo
        fields = "__all__"


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = "__all__"


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = "__all__"


class ProjectMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        id = graphene.ID()

    project = graphene.Field(ProjectType)

    @classmethod
    def mutate(cls, root, info, name, id):
        project = Project.objects.get(pk=id)
        project.name = name
        project.save()
        return ProjectMutation(project=project)


class Mutation(graphene.ObjectType):
    update_project = ProjectMutation.Field()


class Query(graphene.ObjectType):
    all_todos = graphene.List(TodoType)
    all_projects = graphene.List(ProjectType)
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    todos_by_project_name = graphene.List(TodoType, name=graphene.String(required=False))

    def resolve_all_todos(root, info):
        return Todo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_project_by_id(self, info, id):
        try:
            return Project.objects.get(id=id)
        except Project.DoesNotExist:
            return None

    def resolve_todos_by_project_name(self, info, name=None):
        todos = Todo.objects.all()
        if name:
            todos = todos.filter(project__name=name)
        return todos


schema = graphene.Schema(query=Query, mutation=Mutation)
