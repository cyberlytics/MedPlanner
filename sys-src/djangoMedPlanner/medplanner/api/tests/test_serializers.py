from django.test import TestCase
from medplanner.api.tests.serializers import DoctorTestSerializer
from medplanner.api.tests.factories import DoctorFactory


'''class DoctorSerializer(TestCase):

    def test_model_fields(self):
        """Serializer data matches the Doctor object for each field."""
        doctor = DoctorFactory()
        serializer = DoctorTestSerializer(instance=doctor)
        for field_name in ['doctor_first_name', 'doctor_last_name']:
            self.assertEqual(
                serializer.data[field_name],
                getattr(doctor, field_name)
            )'''
