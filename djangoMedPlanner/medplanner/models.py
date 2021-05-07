from django.db import models
from django.utils import timezone

# Models: the models that can be used as a ForeignKey must be placed before
# the model that uses the ForeignKeys
class Doctor(models.Model):
    doctor_first_name = models.CharField(max_length=100)
    doctor_last_name = models.CharField(max_length=100)
    def __str__(self):
        return self.doctor_first_name + self.doctor_last_name

class User(models.Model):
    username = models.CharField(max_length=100)
    user_email = models.EmailField()
    def __str__(self):
        return self.username

class Appointment(models.Model):
    doctor_id = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    time = models.TimeField()
    notes = models.TextField(max_length=400)


