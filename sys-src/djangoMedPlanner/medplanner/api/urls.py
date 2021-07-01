from django.urls import path
from medplanner.api import views
from medplanner.api import user_view
from medplanner.api import email

# list routes URLs to views
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

    path('new-user', user_view.create_user, name='register'),
    path('login', user_view.login, name='login'),
    path('logout', user_view.logout, name='logout'),
    path('change-password', user_view.change_user_password, name='change-password'),
    path('deactivate-user', user_view.deactivate_user, name='deactivate'),
    path('activate-user', user_view.activate_user, name='activate'),
    path('delete-user', user_view.delete_user, name='user-delete'),

    path('tag-delete/<str:pk>', views.tag_delete, name="tag-delete"),
    path('tag-update/<str:pk>', views.tag_update, name="tag-update"),
    path('tag-create', views.tag_create, name="tag-create"),
    path('tag-list', views.tag_list, name='tag-list'),

    path('surgery-delete/<str:pk>', views.surgery_delete, name="surgery-delete"),
    path('surgery-update/<str:pk>', views.surgery_update, name="surgery-update"),
    path('surgery-create', views.tag_create, name="surgery-create"),
    path('surgery-list', views.surgery_list, name="surgery-list"),

    path('specialization-list', views.specialization_list, name="specialization-list"),

    path('send_email', email.send_email, name="send_email"),
]
