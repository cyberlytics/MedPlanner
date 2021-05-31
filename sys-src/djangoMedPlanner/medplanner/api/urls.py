from django.urls import path
from medplanner.api.views import api_create_doctor_view, api_delete_doctor_view, api_all_doctors_view, api_update_doctor_view, api_detail_doctor_view
from medplanner.api.login import create_user, login, logout

from medplanner.api.views import api_create_appointment_view,api_delete_appointment_view, api_all_appointments_view, api_update_appointment_view, api_detail_appointment_view


app_name = 'medplanner'

urlpatterns = [
    path('doctors', api_all_doctors_view),
    path('doctor-detail/<pk>/', api_detail_doctor_view, name="detail"),
    path('new-doctor', api_create_doctor_view, name="create"),
    path('doctor-delete/<pk>/', api_delete_doctor_view, name="delete"),
    path('doctor-update/<pk>/', api_update_doctor_view, name="update"),
    path('new-user', create_user, name="register"),
    path('login', login, name="login"),
    path('logout', logout, name="logout"),

    path('appointment',              api_all_appointments_view),
    path('appointment-detail/<pk>/', api_detail_appointment_view, name="all-appointment"),
    path('new-appointment',          api_create_appointment_view, name="create-appointment"),
    path('appointment-delete/<pk>/', api_delete_appointment_view, name="delete-appointment"),
    path('appointment-update/<pk>/', api_update_appointment_view, name="update-appointment"),
]
