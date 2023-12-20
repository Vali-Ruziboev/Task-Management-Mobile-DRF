from django.urls import path, include
from task_management_app.api.views import users_list

urlpatterns = [
    path('users/', users_list, name='user-list')
]
