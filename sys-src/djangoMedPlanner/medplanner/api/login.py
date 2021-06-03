from django.contrib import auth
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


# user login ; request is the http request in rest framework
@api_view(['POST'])
def login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    try:
        login_user = User.objects.get(username=username)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    check = login_user.check_password(password)
    if (check is True) & login_user.is_active:
        user = auth.authenticate(username=username, password=password)
        auth.login(request, user)
        new_token, created = Token.objects.get_or_create(user=user)
        return Response(data={"result": str(new_token)}, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_403_FORBIDDEN)


# user logout ; request is the http request in rest framework
@api_view(['POST'])
def logout(request):
    username = request.POST.get('username')
    try:
        logout_user = User.objects.get(username=username)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    auth.logout(request)
    logout_user.auth_token.delete()
    return Response(status=status.HTTP_200_OK)


# create a new user
@api_view(['POST'])
def create_user(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    email = request.POST.get('email')
    try:
        user = User.objects.get(username=username)
        if user is not None:
            return Response(status=status.HTTP_403_FORBIDDEN)
    except:
        try:
            new_user = User.objects.create_user(username, email, password)
            new_user.save()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(status=status.HTTP_200_OK)


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



