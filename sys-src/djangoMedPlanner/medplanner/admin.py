from django.contrib import admin

from .models import Appointment, Doctor, User

admin.site.register(Doctor)
admin.site.register(User)
admin.site.register(Appointment)