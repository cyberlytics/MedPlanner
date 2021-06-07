from django.contrib import auth
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
#from django.contrib.auth.models import User
from medplanner.models import UserProfile as User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password
from django.contrib.auth.decorators import login_required
from django.contrib import messages


@api_view(['POST'])
def login(request):
    """
    Login of an existing user
    """
    email = request.POST.get('email')
    password = request.POST.get('password')
    try:
        login_user = User.objects.get(email=email)
    except:
        return Response(data={"message": f"User '{email}' not found"}, status=status.HTTP_404_NOT_FOUND)
    
    check = login_user.check_password(password)
    if (check is True) & login_user.is_active:
        user = auth.authenticate(username=email, password=password)
        auth.login(request, user)
        new_token, created = Token.objects.get_or_create(user=user)
        return Response(data={"token": str(new_token), "email": f"{email}"}, status=status.HTTP_200_OK)
    else:
        return Response(data={"message": f"Wrong password for User '{email}' or not activated"}, status=status.HTTP_403_FORBIDDEN)


# TODO check token
#@login_required
@api_view(['POST'])
def logout(request):
    """
    Only logout a user if he was logged in. Otherwise redirect to Login page.
    Otherwise it will lead to HTTP 404 Not Found
    """
    email = request.POST.get('email')
    try:
        logout_user = User.objects.get(email=email)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    auth.logout(request)
    logout_user.auth_token.delete()
    return Response(status=status.HTTP_200_OK, data={"message": f"User '{email}'' is logged out"})


@api_view(['POST'])
def create_user(request):
    """
    Registration of a new user.
    """
    email = request.POST.get('email')
    password = request.POST.get('password')
    try:
        user = User.objects.get(email=email)
        if user is not None:
            return Response(status=status.HTTP_403_FORBIDDEN, data= {"message": f"User with email '{email}' is already existing"})
    except:
        try:
            new_user = User.objects.create_user(email, password)
            new_user.save()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(status=status.HTTP_200_OK, data= {"message": f"User account for '{email}' is created"})


#? TODO: change password only if logged in?
# TODO check token
#@login_required
@api_view(['POST'])
def change_user_password(request):
    """
    Change user password only if the current one is typed in correctly.
    """
    email = request.POST.get('email')
    curr_password = request.POST.get('password')
    new_password = request.POST.get('password_new')
    try:
        user = User.objects.get(email=email)
        check = user.check_password(curr_password)
        if check:
            user.set_password(new_password)
            user.save()
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": f"Current password did not match. Cannot update password"})

    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    # show message window if password changed successfully
    # messages.success(request, 'Your password was updated successfully !')
    return Response(status=status.HTTP_200_OK, data={"message": f"Password updated successfully for user '{email}'"})


#? TODO only if user is logged in, he should be able to deactivate the account
# TODO check token
#@login_required
@api_view(['POST'])
def deactivate_user(request):
    """
    Instead of deleting the user account, it is better to only deactivate it.
    In this way the user has the chance to activate it again and can access his data.
    """
    email = request.POST.get('email')
    password = request.POST.get('password')
    #is_active = request.POST.get('is_active')
    try:
        user = User.objects.get(email=email)
        check = user.check_password(password)
        if check:
            #user.is_active = is_active
            user.is_active = False
            user.save()
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": f"Current password did not match. Cannot update password"})

    except:
        return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": f"Cannot deactivate account of '{email}'. Password does not match"})

    return Response(status=status.HTTP_200_OK, data={"message": f"Deactivated account of '{email}'"})


#TODO send email to user for account activation and reset of password?
@api_view(['POST'])
def activate_user(request):
    """
    Reactivate an existing user account.
    """
    email = request.POST.get('email')
    #is_active = request.POST.get('is_active')
    try:
        user = User.objects.get(email=email)
        user.is_active = True
        user.save()
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    return Response(status=status.HTTP_200_OK, data={"message": f"Activated account of '{email}'"})


# TODO check token
#@login_required
@api_view(['POST'])
def delete_user(request):
    """
    Completely delete the user account.
    """
    email = request.POST.get('email')
    password = request.POST.get('password')
    try:
        user = User.objects.get(email=email)
        check = user.check_password(password)
        if check:
            user.delete()
            messages.info(request, 'Your account has been deleted.')
            #return to specific page, e.g. registration screen
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST, data={"message": f"Current password did not match. Cannot update password"})
        
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    return Response(status=status.HTTP_200_OK, data={"message": f"Successfully deleted account of '{email}'"})
