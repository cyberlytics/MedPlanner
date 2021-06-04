from django.test import TestCase
from medplanner.api.tests.factories import DoctorFactory


class DoctorTestCase(TestCase):
    def test_str(self):
        """Test for string representation."""
        doctor = DoctorFactory()
        self.assertEqual(str(doctor), doctor.doctor_last_name)
