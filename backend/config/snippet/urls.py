from django.urls import path
from . import views

urlpatterns = [
    # List all snippets
    path('snippet-list/', views.CodeSnippetList.as_view(), name='snippet-list'),

    # Create a snippet
    path('snippet-create/', views.CodeSnippetCreate.as_view(), name='snippet-create'),

    # Retrieve a single snippet
    path('<int:pk>/', views.CodeSnippetDetail.as_view(), name='snippet-detail'),

    # Update a snippet
    path('<int:pk>/update/', views.CodeSnippetUpdate.as_view(), name='snippet-update'),

    # Delete a snippet
    path('<int:pk>/delete/', views.CodeSnippetDelete.as_view(), name='snippet-delete'),
]
