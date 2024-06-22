from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token
from task_management_app.api.views import UserList, TaskList, TaskDeatil

urlpatterns = [
    path('login/', obtain_auth_token, name='login'),
    path('users/', UserList.as_view(), name='user-list'),
    path('tasks/', TaskList.as_view(), name="task-list"),
    path('tasks/<int:pk>', TaskDeatil.as_view(), name="task-detail")
]
