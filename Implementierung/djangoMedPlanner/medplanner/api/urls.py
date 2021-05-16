from django.urls import path
from medplanner.api.views import api_create_doctor_view, api_delete_doctor_view, api_all_doctors_view, api_update_doctor_view, api_detail_doctor_view
from medplanner.api.login import create_user


app_name = 'medplanner'

urlpatterns = [
    path('doctors', api_all_doctors_view),
    path('doctor-detail/<pk>/', api_detail_doctor_view, name="detail"),
    path('new-doctor', api_create_doctor_view, name="create"),
    path('doctor-delete/<pk>/', api_delete_doctor_view, name="delete"),
    path('doctor-update/<pk>/', api_update_doctor_view, name="update"),
    path('new-user', create_user)
]
