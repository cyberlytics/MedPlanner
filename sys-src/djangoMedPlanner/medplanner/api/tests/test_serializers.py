from medplanner.api.tests.serializers import UserProfileSerializer, DoctorTestSerializer, SurgeryTestSerializer,\
    TagTestSerializer, SpecializationTestSerializer, AppointmentTestSerializer
from medplanner.api.tests.factories import SurgeryFactory, DoctorFactory, UserProfileFactory, SpecializationFactory,\
    TagFactory, AppointmentFactory
from django.test import TestCase


class UserSerializer(TestCase):
    def test_model_fields(self):
        """Serializer data matches the UserProfileFactory object for each field."""
        user = UserProfileFactory.create()
        serializer = UserProfileSerializer(data=user)
        if serializer.is_valid():
            user_serial = serializer.save()
            for field in ['email', 'password']:
                self.assertEqual(
                    getattr(user, field),
                    user_serial[field]
                )


class DoctorSerializer(TestCase):
    def test_model_fields(self):
        """Serializer data matches the DoctorFactory object for each field."""
        doctor = DoctorFactory.create()
        serializer = DoctorTestSerializer(data=doctor)
        if serializer.is_valid():
            doctor_serial = serializer.save()
            for field in ['surname', 'user_id']:
                self.assertEqual(
                    getattr(doctor, field),
                    doctor_serial[field]
                )


class SurgerySerializer(TestCase):
    def test_model_fields(self):
        """Serializer data matches the SurgeryFactory object for each field."""
        surgery = SurgeryFactory.create()
        serializer = SurgeryTestSerializer(data=surgery)
        if serializer.is_valid():
            surgery_serial = serializer.save()
            for field in ['address', 'zipcode', 'city', 'telephone_num', 'user_id']:
                self.assertEqual(
                    getattr(surgery, field),
                    surgery_serial[field]
                )


class SpecializationSerializer(TestCase):
    def test_model_fields(self):
        """Serializer data matches the SpecializationFactory object for each field."""
        specialization = SpecializationFactory.create()
        serializer = SpecializationTestSerializer(data=specialization)
        if serializer.is_valid():
            specialization_serial = serializer.save()
            for field in ['description', 'color']:
                self.assertEqual(
                    getattr(specialization, field),
                    specialization_serial[field]
                )


class TagSerializer(TestCase):
    def test_model_fields(self):
        """Serializer data matches the TagFactory object for each field."""
        tag = TagFactory.create()
        serializer = TagTestSerializer(data=tag)
        if serializer.is_valid():
            tag_serial = serializer.save()
            for field in ['description', 'color', 'user_id']:
                self.assertEqual(
                    getattr(tag, field),
                    tag_serial[field]
                )


class AppointmentSerializer(TestCase):
    def test_model_fields(self):
        """Serializer data matches the AppointmentFactory object for each field."""
        appointment = AppointmentFactory.create()
        serializer = AppointmentTestSerializer(data=appointment)
        if serializer.is_valid():
            appointment_serial = serializer.save()
            for field in ['title', 'doc_id', 'user_id', 'datetime', 'priority', 'note']:
                self.assertEqual(
                    getattr(appointment, field),
                    appointment_serial[field]
                )
