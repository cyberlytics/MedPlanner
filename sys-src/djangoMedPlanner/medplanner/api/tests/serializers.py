from rest_framework import serializers
from medplanner.api.tests.factories import UserProfileFactory, DoctorFactory, AppointmentFactory, \
    SurgeryFactory, SpecializationFactory, TagFactory


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfileFactory
        fields = '__all__'


class DoctorTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorFactory
        fields = '__all__'


class AppointmentTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppointmentFactory
        fields = '__all__'


class SurgeryTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SurgeryFactory
        fields = '__all__'


class SpecializationTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpecializationFactory
        fields = '__all__'


class TagTestSerializer(serializers.ModelSerializer):
    class Meta:
        model = TagFactory
        fields = '__all__'
