from django.test import TestCase
from medplanner.api.tests.factories import DoctorFactory, UserProfileFactory


class DoctorTestCase(TestCase):
    def test_str(self):
        """Test for string representation."""
        doctor = DoctorFactory()
        self.assertEqual(str(doctor), doctor.doctor_last_name)


class UserProfileTestCase(TestCase):
    def test_str(self):
        """Test for string representation."""
        user = UserProfileFactory()
        self.assertEqual(str(user), user.email)


'''class AppointmentTestCase(TestCase):
    def test_str(self):
        """Test for string representation."""
        print("!!!!!!!!!!!!!")
        appointment = AppointmentFactory()
        self.assertEqual(str(appointment), str(appointment.date_time))'''
