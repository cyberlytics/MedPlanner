from rest_framework import status
from rest_framework.response import Response
from medplanner.models import Doctor, Appointment
from medplanner.api.serializers import DoctorSerializer, AppointmentSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def doctor_list(request):
    try:
        doctors = Doctor.objects.all()
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def doctor_detail(request, pk):
    try:
        doctor = Doctor.objects.get(id=pk)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = DoctorSerializer(doctor, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def doctor_create(request):
    serializer = DoctorSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def doctor_update(request, pk):
    try:
        doctor = Doctor.objects.get(id=pk)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = DoctorSerializer(instance=doctor, data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
def doctor_delete(request, pk):
    try:
        doctor = Doctor.objects.get(id=pk)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    doctor.delete()
    return Response(status=status.HTTP_200_OK)

# Appointment


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def appointment_list(request):
    try:
        appointments = Appointment.objects.all()
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def appointment_detail(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = AppointmentSerializer(appointment, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def appointment_update(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = AppointmentSerializer(instance=appointment, data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def appointment_create(request):
    serializer = AppointmentSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
def appointment_delete(request, pk):
    try:
        appointment = Appointment.objects.get(id=pk)
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    appointment.delete()
    return Response(status=status.HTTP_200_OK)

