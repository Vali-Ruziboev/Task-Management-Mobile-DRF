from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.http import JsonResponse
# Create your views here.
User = get_user_model()

def users_list(request):
    users = User.objects.all()
    return JsonResponse({'data':list(users.values())})