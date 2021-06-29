from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from medplanner.models import Appointment, Doctor, UserProfile
from django.core.mail import send_mail, BadHeaderError
from rest_framework.response import Response
from rest_framework import status


@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def send_email(request):
    try:
        appointment_id = request.data.get('appointment_id')
        appointment = Appointment.objects.get(id=appointment_id)
    except Appointment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        doctor = Doctor.objects.get(id=appointment.doc_id_id)
    except Doctor.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        user = UserProfile.objects.get(id=appointment.user_id_id)
    except UserProfile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        date = appointment.datetime.strftime("%m/%d/%Y, %H:%M")
        send_mail('Terminerinnerung für: ' + str(appointment.title),
                  'Sehr geehrte/-er Patient/-in,' + '\n' +
                  'hiermit möchten wir Sie freundlich daran erinnern, dass ihr Termin: '
                  + str(appointment.title) + ' bei Dr.' + str(doctor.surname) +
                  ' am: ' + date + ' stattfindet.' + '\n'+ '\n'+  ' Mit freundlichen Grüßen' + '\n'
                  + 'Dein MedPlanner-Team'
                  ,
                  'MedPlanner@web.de',
                  [user.email],
                  fail_silently=True,
                  )
    except BadHeaderError:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(status=status.HTTP_200_OK)
