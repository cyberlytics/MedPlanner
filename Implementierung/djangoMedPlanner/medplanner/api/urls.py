from django.urls import path
from medplanner.api.views import api_create_doctor_view, api_delete_doctor_view, api_detail_doctor_view, api_update_doctor_view

app_name = 'medplanner'

urlpatterns = [
    path('doctors', api_detail_doctor_view, name="detail"),
]
