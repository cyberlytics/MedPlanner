from django.contrib import auth
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from medplanner.api.serializers import DoctorSerializer
from django.views.decorators.http import require_http_methods

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
@api_view(['POST'])
def login(request):
    if request.user.is_authenticated:
        return Response({"result": "is authenticated"})
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        login_user = User.objects.get(username=username)
        check = login_user.check_password(password)
        if (check is True) & login_user.is_active:
            user = auth.authenticate(username=username, password=password)
            if user is not None:
                auth.login(request, user)
                new_token, created = Token.objects.get_or_create(user=user)
                return Response({"ok": str(new_token)})
            else:
                return Response({"error": "User does not exist"})
    else:
        return Response({"error": "Wrong method"})


# user logout ; request is the http request in rest framework
@api_view(['GET'])
def logout(request):
    print(request.GET)
    username = request.GET.get('username')
    print(username)
    return Response(True)

'''    username = request.POST.get('username')
    print(username)
    logout_user = User.objects.get(username)
    print(logout_user)
    auth.logout(request)
    logout_user.auth_token.delete()'''