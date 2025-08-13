from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Snippet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='snippets')
    description = models.TextField(blank=True)
    code = models.TextField()
    language = models.CharField(max_length=100)
    tags = models.JSONField(default=list)  # stores an array of strings
    created_at = models.DateTimeField(auto_now_add=True)
    favorite = models.BooleanField(default=False)

    def __str__(self):
        return self.title
