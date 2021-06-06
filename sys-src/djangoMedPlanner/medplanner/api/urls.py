from django.urls import path
from medplanner.api import views
from medplanner.api.login import create_user, login, logout, change_user_password, deactivate_user, activate_user

from medplanner.api.views import api_create_appointment_view,api_delete_appointment_view, api_all_appointments_view, api_update_appointment_view, api_detail_appointment_view


app_name = 'medplanner'

urlpatterns = [

    path('doctor-list', views.doctor_list, name='doctor-list'),
    path('doctor-detail/<str:pk>', views.doctor_detail, name='doctor-detail'),
    path('doctor-create', views.doctor_create, name='doctor-create'),
    path('doctor-update/<str:pk>', views.doctor_update, name='doctor-update'),
    path('doctor-delete/<str:pk>', views.doctor_delete, name='doctor-delete'),

    path('new-user', create_user, name='register'),
    path('login', login, name='login'),
    path('logout', logout, name='logout'),
    path('change-password', change_user_password, name='change-password'),
    path('deactivate-user', deactivate_user, name='deactivate'),
    path('activate-user', activate_user, name='activate'),

    path('appointment',              api_all_appointments_view),
    path('appointment-detail/<pk>/', api_detail_appointment_view, name="detail-appointment"),
    path('new-appointment',          api_create_appointment_view, name="create-appointment"),
    path('appointment-delete/<pk>/', api_delete_appointment_view, name="delete-appointment"),
    path('appointment-update/<pk>/', api_update_appointment_view, name="update-appointment"),

]
