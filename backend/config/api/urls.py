from django.urls import path, include

urlpatterns = [
    path('accounts/', include('users.urls')),
    path('snippets/', include('snippet.urls')),
]