from django.urls import path
from medplanner.api.views import api_create_doctor_view, api_delete_doctor_view, api_all_doctors_view, \
    api_update_doctor_view, api_detail_doctor_view
from medplanner.api.login import create_user, login, logout, change_user_password, deactivate_user, activate_user


app_name = 'medplanner'

urlpatterns = [
    path('all-doctors', api_all_doctors_view),
    path('doctor-detail', api_detail_doctor_view, name='detail'),
    path('new-doctor', api_create_doctor_view, name='create'),
    path('doctor-delete', api_delete_doctor_view, name='delete'),
    path('doctor-update', api_update_doctor_view, name='update'),
    path('new-user', create_user, name='register'),
    path('login', login, name='login'),
    path('logout', logout, name='logout'),
    path('change-password', change_user_password, name='change-password'),
    path('deactivate-user', deactivate_user, name='deactivate'),
    path('activate-user', activate_user, name='activate'),
]
