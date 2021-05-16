from django.shortcuts import render
from django.http import HttpResponse
from medplanner.api.login import create_user


def index(request):
    result = create_new_user()
    print(result)
    return HttpResponse("Hello, world. You're at the MedPlanner index.")


def create_new_user():
    create_user('newUser', 'test123456')
    return True
