from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import ugettext_lazy as _

from .models import (
    Appointment,
    Doctor,
    UserProfile,
    Specialization,
    Surgery,
    Tag
)


class MedplannerUserAdmin(UserAdmin):
    """
    Define admin model for custom User model with no username field.
    Elements like first_name, last_name will not be displayed anymore.
    In customized admin model you can also specify behavior for non-superusers: 
            https://realpython.com/manage-users-in-django-admin/
    """
    model = UserProfile
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser',
                                       'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )

    # not editable in admin default change form
    readonly_fields = [
        'date_joined',
    ]

    # instead of username the field email is used
    ordering = ('email',)
    search_fields = ('email',)
    list_display = ('email', 'is_staff', 'is_active', 'is_superuser')
    list_filter = ('email',)


admin.site.register(Doctor)
admin.site.register(UserProfile, MedplannerUserAdmin)
admin.site.register(Appointment)
admin.site.register(Specialization)
admin.site.register(Surgery)
admin.site.register(Tag)
