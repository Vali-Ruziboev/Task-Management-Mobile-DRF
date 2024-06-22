from django.db import models
from django.contrib.auth.models import User


class Task(models.Model):
    title = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    description = models.TextField()
    index = models.IntegerField()
    column_id = models.IntegerField()  
  
    
    def __str__(self) -> str:
        return self.title