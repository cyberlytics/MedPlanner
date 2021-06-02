from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import (
    Appointment, 
    Doctor, 
    UserProfile, 
    Specialization, 
    Surgery, 
    Tag
)

admin.site.register(Doctor)
admin.site.register(UserProfile, UserAdmin)
admin.site.register(Appointment)
admin.site.register(Specialization)
admin.site.register(Surgery)
admin.site.register(Tag)
