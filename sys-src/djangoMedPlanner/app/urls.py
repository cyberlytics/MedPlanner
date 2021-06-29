# list routes URLs to views
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('', include('medplanner.urls')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),
    path('api/', include('medplanner.api.urls', 'medplanner_api')),
]
