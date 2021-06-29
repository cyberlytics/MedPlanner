from factory import django, Faker
from medplanner.models import Doctor, Appointment, UserProfile as User


# Factory classes for testing purposes
class DoctorFactory(django.DjangoModelFactory):
    first_name = Faker('first_name')
    surname = Faker('last_name')

    class Meta:
        model = Doctor


class UserProfileFactory(django.DjangoModelFactory):
    email = Faker('email')

    class Meta:
        model = User
