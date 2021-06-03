from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from datetime import datetime


# Models: the models that can be used as a ForeignKey must be placed before
# the model that uses the ForeignKeys
class User(models.Model):
    username   = models.CharField(max_length=100)
    user_email = models.EmailField(blank=True)

    def __str__(self):
        return self.username


class Specialization(models.Model):
    description = models.CharField(max_length=100)

    def __str__(self):
        return self.description


class Surgery(models.Model):
    location         = models.CharField(max_length=100)
    street           = models.CharField(max_length=100)
    description      = models.CharField(max_length=100, blank=True)
    telephone_number = models.CharField(max_length=100)
    website          = models.CharField(max_length=100, blank=True)

    def __str__(self):
        return self.location + '' + self.street


class Doctor(models.Model):
    doctor_first_name = models.CharField(max_length=100, blank=True)
    doctor_last_name  = models.CharField(max_length=100)
    specializations   = models.ManyToManyField(Specialization, blank=True)
    surgery_id        = models.ForeignKey(Surgery, on_delete=models.CASCADE, related_name='surgery', default='', null=True,
                                   blank=True)
    def __str__(self):
        return self.doctor_last_name


class Tag(models.Model):
    description = models.CharField(max_length=100)
    colour      = models.CharField(max_length=100)


class Appointment(models.Model):
    doctor_id = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='doctor')
    user_id   = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
    date_time = models.DateTimeField(default=datetime.now)
    notes     = models.TextField(blank=True)
    tags      = models.ManyToManyField(Tag, blank=True)


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    # Creates a token by registrating a new user
    if created:
        Token.objects.create(user=instance)
