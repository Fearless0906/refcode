from django.shortcuts import render
from rest_framework import generics, status
from .models import Snippet
from .serializers import SnippetSerializer

# Create your views here.
class CodeSnippetList(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer