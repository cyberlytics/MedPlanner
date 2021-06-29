from rest_framework import status
from rest_framework.response import Response
from medplanner.models import Doctor, Appointment, Tag, Surgery, Specialization
from medplanner.api.serializers import DoctorSerializer, AppointmentSerializer, TagSerializer, SurgerySerializer, \
     SpecializationSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def doctor_list(request):
    """
    Returns all doctor objects
    """
    try:
        doctors = Doctor.objects.all()
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def doctor_detail(request, pk):
    """
    Returns information of doctor object
    """
    try:
        doctor = Doctor.objects.get(id=pk)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = DoctorSerializer(doctor, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def doctor_create(request):
    """
    Returns new doctor object
    """
    serializer = DoctorSerializer(data=request.data)
    if serializer.is_valid():
        doctor = serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(data={'id': doctor.id}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def doctor_update(request, pk):
    """
    Returns updated doctor object
    """
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
    """
    Deletes doctor object
    """
    try:
        doctor = Doctor.objects.get(id=pk)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    doctor.delete()
    return Response(status=status.HTTP_200_OK)


# CRUD services for Appointment model


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def appointment_list(request):
    """
    Returns all appointment objects
    """
    try:
        user_id = request.user.id
        appointments = Appointment.objects.filter(user_id=user_id)
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = AppointmentSerializer(appointments, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def appointment_detail(request, pk):
    """
    Returns information of appointment object
    """
    try:
        appointment = Appointment.objects.get(id=pk)
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = AppointmentSerializer(appointment, many=False)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def appointment_update(request, pk):
    """
    Returns updated appointment object
    """
    try:
        appointment = Appointment.objects.get(id=pk)
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = AppointmentSerializer(instance=appointment, data=request.data)
    if serializer.is_valid():
        appointment = serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(data={'id': appointment.id}, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def appointment_create(request):
    """
    Returns new appointment object
    """
    print(request.data)
    serializer = AppointmentSerializer(data=request.data)
    if serializer.is_valid():
        appointment = serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(data={'id': appointment.id}, status=status.HTTP_201_CREATED)


@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
def appointment_delete(request, pk):
    """
    Deletes appointment object
    """
    try:
        appointment = Appointment.objects.get(id=pk)
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    appointment.delete()
    return Response(status=status.HTTP_200_OK)


# CRUD services for Tag model


@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
def tag_delete(request, pk):
    """
    Deletes tag object
    """
    try:
        tag = Tag.objects.get(id=pk)
    except Tag.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    tag.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def tag_update(request, pk):
    """
    Returns updated tag object
    """
    try:
        tag = Tag.objects.get(id=pk)
    except Tag.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TagSerializer(instance=tag, data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def tag_create(request):
    """
    Returns new tag object
    """
    serializer = TagSerializer(data=request.data)
    if serializer.is_valid():
        tag = serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(data={'id': tag.id}, status=status.HTTP_201_CREATED)
    

@api_view(['READ'])
@permission_classes((IsAuthenticated, ))
def tag_list(request):
    """
    Returns all tag objects
    """
    try:
        tags = Tag.objects.all()
    except Tag.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TagSerializer(tags, many=True)
    return Response(serializer.data)


# CRUD services for Surgery model


@api_view(['DELETE'])
@permission_classes((IsAuthenticated, ))
def surgery_delete(request, pk):
    """
    Deletes surgery object
    """
    try:
        surgery = Surgery.objects.get(id=pk)
    except Surgery.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    surgery.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def surgery_update(request, pk):
    """
    Returns updated surgery object
    """
    try:
        surgery = Surgery.objects.get(id=pk)
    except Surgery.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = SurgerySerializer(instance=surgery, data=request.data)
    if serializer.is_valid():
        serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def surgery_create(request):
    """
    Returns new surgery object
    """
    serializer = SurgerySerializer(data=request.data)
    if serializer.is_valid():
        surgery = serializer.save()
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return Response(data={'id': surgery.id}, status=status.HTTP_201_CREATED)


@api_view(['READ'])
@permission_classes((IsAuthenticated, ))
def surgery_list(request):
    """
    Returns all surgery objects
    """
    try:
        surgeries = Surgery.objects.all()
    except Surgery.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = SurgerySerializer(surgeries, many=True)
    return Response(serializer.data)


@api_view(['READ'])
@permission_classes((IsAuthenticated, ))
def specialization_list(request):
    """
    Returns all specializations objects
    """
    try:
        specializations = Specialization.objects.all()
    except Specialization.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = SpecializationSerializer(specializations, many=True)
    return Response(serializer.data)
