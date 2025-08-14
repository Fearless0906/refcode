from rest_framework import serializers
from .models import Snippet

class SnippetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Snippet
        fields = [
            'id',
            'title',
            'description',
            'code',
            'language',
            'tags',
            'created_at',
            'favorite',
            'user',
        ]
