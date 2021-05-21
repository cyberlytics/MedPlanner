from django.contrib import auth
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response


# user login ; request is the http request in rest framework
@api_view(['POST'])
def login(request):
    if request.user.is_authenticated:
        return Response({"result": "is authenticated"})

    username = request.POST.get('username')
    password = request.POST.get('password')
    
    try:
        login_user = User.objects.get(username=username)
    except:
        return Response({"error": "User does not exist"})
    
    check = login_user.check_password(password)
    if (check is True) & login_user.is_active:
        user = auth.authenticate(username=username, password=password)
        auth.login(request, user)
        new_token, created = Token.objects.get_or_create(user=user)
        return Response({"ok": str(new_token)})
    else:
        return Response({"error": "Password is wrong"})


# user logout ; request is the http request in rest framework
@api_view(['POST'])
def logout(request):
    username = request.POST.get('username')
    logout_user = User.objects.get(username=username)
    auth.logout(request)
    logout_user.auth_token.delete()
    return Response(True)


# get users
def get_all_users():
    return User.objects.all()


def find_user(user_name):
    return User.objects.get(username=user_name)


# create a new user
@api_view(['POST'])
def create_user(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    email = request.POST.get('email')
    # TODO: check if username exists
    new_user = User.objects.create_user(username, email, password)
    new_user.save()
    return Response(True)


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



