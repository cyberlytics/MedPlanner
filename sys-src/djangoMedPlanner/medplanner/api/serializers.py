from rest_framework import serializers
from medplanner.models import Doctor, UserProfile, Appointment

class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['doctor_first_name', 'doctor_last_name', 'specializations', 'surgery_id']
