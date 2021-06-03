from rest_framework    import serializers
from medplanner.models import User, Doctor, Appointment


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = ['doctor_first_name', 'doctor_last_name', 'specializations', 'surgery_id']

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['doctor_id', 'user_id', 'date_time', 'priority', 'note']
