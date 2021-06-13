from factory import django, Faker
from medplanner.models import Doctor, Surgery, Specialization


class DoctorFactory(django.DjangoModelFactory):

    doctor_first_name = Faker('first_name')
    doctor_last_name = Faker('last_name')

    class Meta:
        model = Doctor
