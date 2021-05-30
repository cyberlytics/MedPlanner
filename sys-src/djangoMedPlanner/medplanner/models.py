from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from datetime import datetime


# Models: the models that can be used as a ForeignKey must be placed before
# the model that uses the ForeignKeys
class Doctor(models.Model):
    doctor_first_name = models.CharField(max_length=100)
    doctor_last_name  = models.CharField(max_length=100)

    def __str__(self):
        return self.doctor_first_name + '' + self.doctor_last_name


class User(models.Model):
    username   = models.CharField(max_length=100)
    user_email = models.EmailField()

    def __str__(self):
        return self.username


class Appointment(models.Model):
    doctor_id = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    user_id   = models.ForeignKey(User, on_delete=models.CASCADE)
    date_time = models.DateTimeField(default=datetime.now, blank=True)
    notes     = models.TextField()

class Specialization(models.Model):
    description = models.CharField(max_length=100)

class Surgery(models.Model):
    location         = models.CharField(max_length=100)
    street           = models.CharField(max_length=100)
    description      = models.CharField(max_length=100)
    telephone_number = models.CharField(max_length=100)
    website          = models.CharField(max_length=100)

class Tag(models.Model):
    description = models.CharField(max_length=100)
    colour      = models.CharField(max_length=100)

    #posted = model.DateTimeField(auto_now=True) #it will update the `posted` field every time when it was modified 
    #posted = model.DateTimeField(auto_now_add=True) # ... when it was created


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    # Creates a token by registrating a new user
    if created:
        Token.objects.create(user=instance)
