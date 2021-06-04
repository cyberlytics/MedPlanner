from rest_framework import serializers
from medplanner.models import Doctor, UserProfile


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['doctor_first_name', 'doctor_last_name', 'specializations', 'surgery_id']