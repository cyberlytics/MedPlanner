from django.test import TestCase
from medplanner.api.tests.factories import DoctorFactory, UserProfileFactory, AppointmentFactory, SurgeryFactory, \
    SpecializationFactory, TagFactory


class UserProfileTestCase(TestCase):

    def test_str(self):
        """Test for string representation."""
        user = UserProfileFactory.create()
        self.assertEqual(str(user), user.email)


class DoctorTestCase(TestCase):

    def test_str(self):
        """Test for string representation."""
        doctor = DoctorFactory.create()
        self.assertEqual(str(doctor), doctor.surname)


class AppointmentTestCase(TestCase):

    def test_str(self):
        """Test for string representation."""
        appointment = AppointmentFactory.create()
        self.assertEqual(str(appointment), appointment.title)


class SurgeryTestCase(TestCase):

    def test_str(self):
        """Test for string representation."""
        surgery = SurgeryFactory.create()
        self.assertEqual(str(surgery), surgery.address + ', ' + surgery.zipcode + ' ' + surgery.city)


class SpecializationTestCase(TestCase):

    def test_str(self):
        """Test for string representation."""
        specialization = SpecializationFactory.create()
        self.assertEqual(str(specialization), specialization.description)


class TagTestCase(TestCase):

    def test_str(self):
        """Test for string representation."""
        tag = TagFactory.create()
        self.assertEqual(str(tag), tag.description)
