from factory import django, Faker
from medplanner.models import Doctor, Appointment, UserProfile as User


class DoctorFactory(django.DjangoModelFactory):

    doctor_first_name = Faker('first_name')
    doctor_last_name = Faker('last_name')

    class Meta:
        model = Doctor


class UserProfileFactory(django.DjangoModelFactory):

    email = Faker('email')

    class Meta:
        model = User


'''class AppointmentFactory(django.DjangoModelFactory):
    doctor_id = Doctor.objects.create(doctor_last_name=Faker('last_name'))
    # user = User.objects.create_user(email='mmmm@otp.de')
    date_time = Faker('date_time')
    notes = Faker('ascii_email')

    class Meta:
        model = Appointment'''
