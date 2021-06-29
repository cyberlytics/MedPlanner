from rest_framework.serializers import ModelSerializer
from medplanner.api.tests.test_models import DoctorTestCase

# Serializer classes to serialize data from database
class DoctorTestSerializer(ModelSerializer):
    class Meta:
        model = DoctorTestCase
        fields = ('doctor_first_name', 'doctor_last_name')
