from rest_framework.serializers import ModelSerializer
from medplanner.api.tests.test_models import DoctorTestCase


class DoctorTestSerializer(ModelSerializer):
    class Meta:
        model = DoctorTestCase
        fields = ('doctor_first_name', 'doctor_last_name')
