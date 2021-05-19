from django.contrib import auth
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from medplanner.api.serializers import DoctorSerializer

# get users
def get_all_users():
    return User.objects.all()


def find_user(user_name):
    return User.objects.get(username=user_name)


# create a new user
def create_user(user_name, password, email='', is_superuser=False, is_staff=False):
    new_user = User.objects.create_user(user_name, password)
    # new_user = User.objects.create_user(user_name, email, password)
    new_user.email = email
    new_user.is_superuser = is_superuser
    new_user.is_staff = is_staff
    new_user.save()


# update user profile
def update_user(user_name, new_password, is_superuser, is_staff):
    user = User.objects.get(username=user_name)
    user.set_password(new_password)
    user.is_superuser = is_superuser
    user.is_staff = is_staff
    user.save()


# deactivate / activate user
# not recommend the delete behavior for users, so we use deactivate instead
def deactivate_user(user_name, is_active):
    user = User.objects.get(username=user_name)
    user.is_active = is_active
    user.save()


def activate_user(user_name, is_active):
    user = User.objects.get(username=user_name)
    user.is_active = is_active
    user.save()


# user login ; request is the http request in rest framework
@api_view(['GET', 'POST'])
def login(request):
    login_user = User.objects.get(username=request.user_name)
    check = login_user.check_password(request.password)
    if (check is True) & login_user.is_active:
        auth_user = auth.authenticate(username=request.user_name, password=request.password)
        if auth_user is not None:
            auth.login(request, auth_user)
            new_token, created = Token.objects.get_or_create(user=auth_user)
    return Response(DoctorSerializer.data)


# user logout ; request is the http request in rest framework
@api_view(['GET'])
def logout(request):
    logout_user = User.objects.get(username=request.user_name)
    auth.logout(request)
    logout_user.auth_token.delete()
