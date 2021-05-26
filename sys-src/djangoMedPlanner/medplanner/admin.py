from django.contrib import admin

from .models import Appointment, Doctor, User, Specialization, Surgery, Tag

admin.site.register(Doctor)
admin.site.register(User)
admin.site.register(Appointment)
admin.site.register(Specialization)
admin.site.register(Surgery)
admin.site.register(Tag)
