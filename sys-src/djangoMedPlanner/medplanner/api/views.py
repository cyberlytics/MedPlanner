from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from medplanner.models import Doctor, User, Appointment
from medplanner.api.serializers import DoctorSerializer
from rest_framework.parsers import JSONParser



@api_view(['POST', ])
def api_all_doctors_view(request):
    try:
        doctor = Doctor.objects.all()
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "POST":
        serializer = DoctorSerializer(doctor, many=True)
        return Response(serializer.data)


@api_view(['POST', ])
def api_detail_doctor_view(request):
    pk = request.POST.get('pk')
    try:
        doctor = Doctor.objects.get(pk=pk)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "POST":
        serializer = DoctorSerializer(doctor)
        return Response(serializer.data)


@api_view(['POST', ])
def api_update_doctor_view(request):
    pk = request.POST.get('pk')
    first_name = request.POST.get('doctor_first_name')
    last_name = request.POST.get('doctor_last_name')
    try:
        doctor = Doctor.objects.get(pk=pk)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == "POST":
        serializer = DoctorSerializer(doctor, data=request.POST.get('data'))
        data = {}
        if serializer.is_valid():
            serializer.save()
            data["success"] = "update successful"
            return Response(data=data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE', ])
def api_delete_doctor_view(request, pk):
    try:
        doctor = Doctor.objects.get(pk=pk)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        operations = doctor.delete()
        data = {}
        if operations:
            data["success"] = "delete successful"
        else:
            data["failure"] = "delete failed"
        return Response(data=data)


@api_view(['POST', ])
def api_create_doctor_view(request):
    doctor = Doctor()
    if request.method == 'POST':
        serializer = DoctorSerializer(doctor, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

