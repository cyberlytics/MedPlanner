from django.http import HttpResponse
from medplanner.api.login import create_user
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

def index(request):
    return HttpResponse("Hello, world. You're at the MedPlanner index.")

