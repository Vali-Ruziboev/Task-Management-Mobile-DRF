from rest_framework import generics
from task_management_app.models import Task
from task_management_app.api.serializers import TaskSerializer, UserSerializer
from django.contrib.auth.models import User

class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class TaskList(generics.ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
    def get_queryset(self):
            user = self.request.user
            return Task.objects.filter(user=user)
    
class TaskDeatil(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer