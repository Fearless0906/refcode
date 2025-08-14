from rest_framework import generics
from .models import Snippet
from .serializers import SnippetSerializer

class CodeSnippetList(generics.ListAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer

class CodeSnippetCreate(generics.CreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer

class CodeSnippetDetail(generics.RetrieveAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer

class CodeSnippetUpdate(generics.UpdateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer

class CodeSnippetDelete(generics.DestroyAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
