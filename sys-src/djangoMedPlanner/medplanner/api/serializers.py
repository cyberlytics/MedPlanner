from rest_framework import serializers
from medplanner.models import Doctor, Appointment, Specialization, Tag, Surgery


class DoctorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Doctor
        fields = '__all__'


class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = '__all__'

class SpecializationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Specialization
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class SurgerySerializer(serializers.ModelSerializer):
    class Meta:
        model = Surgery
        fields = '__all__'
