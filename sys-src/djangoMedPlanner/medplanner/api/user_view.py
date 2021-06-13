from django.contrib import auth
from rest_framework.authtoken.models import Token
from medplanner.models import UserProfile as User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib import messages


@api_view(['POST'])
def login(request):
    """
    Login of an existing user
    """
    email = request.POST.get('email')
    password = request.POST.get('password')
    try:
        print(User.objects.all())
        login_user = User.objects.get(email=email)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND, data={"message": f"User '{email}' not found"})

    check = login_user.check_password(password)
    if (check is True) & login_user.is_active:
        user = auth.authenticate(username=email, password=password)
        auth.login(request, user)
        new_token, created = Token.objects.get_or_create(user=user)
        return Response(status=status.HTTP_200_OK, data={"token": str(new_token), "email": f"{email}"})
    else:
        return Response(status=status.HTTP_403_FORBIDDEN,
                        data={"message": f"Wrong password for User '{email}' or not activated"})


# @login_required
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def logout(request):
    """
    Only logout a user if he was logged in. Otherwise redirect to Login page.
    Otherwise it will lead to HTTP 404 Not Found.
    Only the correct authentication token in the request header is required to logout the user.
    Django automatically tests the authentication - no extra code is needed.
    """
    try:
        logout_user = request.user
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)

    auth.logout(request)
    logout_user.auth_token.delete()
    return Response(status=status.HTTP_200_OK, data={"message": f"User is logged out {logout_user.email}"})


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
            return Response(status=status.HTTP_403_FORBIDDEN,
                            data={"message": f"User with email '{email}' is already existing"})
    except:
        try:
            new_user = User.objects.create_user(email, password)
            new_user.save()
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    return Response(status=status.HTTP_200_OK,
                    data={"message": f"User account for '{email}' is created"})


# @login_required
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def change_user_password(request):
    """
    Change user password only if the current one is typed in correctly.
    """
    # email = request.POST.get('email')
    curr_password = request.POST.get('password')
    new_password = request.POST.get('password_new')
    try:
        user = request.user
        check = user.check_password(curr_password)
        if check:
            user.set_password(new_password)
            user.save()
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={"message": f"Current password did not match. Cannot update password"})

    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    # show message window if password changed successfully
    # messages.success(request, 'Your password was updated successfully !')
    return Response(status=status.HTTP_200_OK, data={"message": f"Password updated successfully for user '{user.email}'"})


# ? only if user is logged in, he should be able to deactivate the account?
# @login_required
@api_view(['POST', ])
@permission_classes((IsAuthenticated, ))
def deactivate_user(request):
    """
    Instead of deleting the user account, it is better to only deactivate it.
    In this way the user has the chance to activate it again and can access his data.
    """
    # email = request.POST.get('email')
    password = request.POST.get('password')
    try:
        user = request.user
        password_check = user.check_password(password)
        if password_check:
            user.is_active = False
            user.save()
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={"message": f"Current password did not match. Cannot update password"})

    except:
        return Response(status=status.HTTP_400_BAD_REQUEST,
                        data={"message": f"Cannot deactivate account of '{user.email}'. Password does not match"})

    # TODO if needed logout user and delete token
    return Response(status=status.HTTP_200_OK, data={"message": f"Deactivated account of '{user.email}'"})


# ? send email to user for account activation and reset of password?
@api_view(['POST', ])
def activate_user(request):
    """
    Reactivate an existing user account.
    """
    email = request.POST.get('email')
    try:
        user = User.objects.get(email=email)
        user.is_active = True
        user.save()
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    return Response(status=status.HTTP_200_OK, data={"message": f"Activated account of '{user.email}'"})


# @login_required
@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def delete_user(request):
    """
    Completely delete the user account.
    """
    # email = request.POST.get('email')
    password = request.POST.get('password')
    try:
        user = request.user
        check = user.check_password(password)
        if check:
            user.delete()
            messages.info(request, 'Your account has been deleted.')
            # return to specific page, e.g. registration screen
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST,
                            data={"message": f"Current password did not match. Cannot update password"})
        
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    # TODO if needed logout user and delete token
    return Response(status=status.HTTP_200_OK, data={"message": f"Successfully deleted account of '{user.email}'"})
