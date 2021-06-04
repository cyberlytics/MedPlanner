from django.urls import path
from medplanner.api import views
from medplanner.api.login import create_user, login, logout, change_user_password, deactivate_user, activate_user


app_name = 'medplanner'

urlpatterns = [

    path('doctor-list', views.doctor_list, name='doctor-list'),
    path('doctor-detail/<str:pk>', views.doctor_detail, name='doctor-detail'),
    path('doctor-create', views.doctor_create, name='doctor-create'),
    path('doctor-update/<str:pk>', views.doctor_update, name='doctor-update'),
    path('doctor-delete/<str:pk>', views.doctor_delete, name='doctor-delete'),

    path('appointment-list', views.appointment_list, name='appointment-list'),
    path('appointment-detail/<str:pk>', views.appointment_detail, name="appointment-detail"),
    path('appointment-create', views.appointment_create, name="appointment-create"),
    path('appointment-update/<str:pk>', views.appointment_update, name="appointment-update"),
    path('appointment-delete/<str:pk>', views.appointment_delete, name="appointment-delete"),

    path('new-user', create_user, name='register'),
    path('login', login, name='login'),
    path('logout', logout, name='logout'),
    path('change-password', change_user_password, name='change-password'),
    path('deactivate-user', deactivate_user, name='deactivate'),
    path('activate-user', activate_user, name='activate'),

]
