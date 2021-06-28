from factory import django, Faker, SubFactory
from medplanner.models import Doctor, Appointment, UserProfile, Specialization, Surgery


class UserProfileFactory(django.DjangoModelFactory):

    class Meta:
        model = UserProfile

    email = Faker('email')


class DoctorFactory(django.DjangoModelFactory):

    class Meta:
        model = Doctor

    first_name = Faker('first_name')
    surname = Faker('last_name')
    user_id = SubFactory(UserProfileFactory)


class AppointmentFactory(django.DjangoModelFactory):

    class Meta:
        model = Appointment

    title = Faker('first_name')
    user_id = SubFactory(UserProfileFactory)
    doc_id = SubFactory(DoctorFactory)
    datetime = Faker('date_time_ad')
    priority = "Hoch"


class SpecializationFactory(django.DjangoModelFactory):

    class Meta:
        model = Specialization

    description = Faker('first_name')


class SurgeryFactory(django.DjangoModelFactory):

    class Meta:
        model = Surgery

    address = Faker('street_address')
    zipcode = Faker('postcode')
    city = Faker('city')
    telephone_num = Faker('phone_number')
    user_id = SubFactory(UserProfileFactory)

