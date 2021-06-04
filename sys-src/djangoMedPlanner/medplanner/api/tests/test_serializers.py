from django.test import TestCase
from medplanner.api.serializers import DoctorSerializer
from medplanner.api.tests.factories import DoctorFactory


class DoctorSerializer(TestCase):
    test = ''
'''    def test_model_fields(self):
        """Serializer data matches the Doctor object for each field."""
        doctor = DoctorFactory()
        serializer = DoctorSerializer(doctor)
        for field_name in ['doctor_first_name', 'doctor_last_name', 'specializations', 'surgery_id']:
            self.assertEqual(
                serializer.data[field_name],
                getattr(doctor, field_name)
            )
'''