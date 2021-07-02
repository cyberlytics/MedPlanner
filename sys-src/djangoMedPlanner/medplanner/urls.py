from django.urls import path
from . import views

# list routes URLs to views
urlpatterns = [
    path('', views.index, name='index'),
]
