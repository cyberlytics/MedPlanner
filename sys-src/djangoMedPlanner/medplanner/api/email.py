from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from medplanner.models import Appointment, Doctor, UserProfile
from django.core.mail import send_mail
from django.http import HttpResponse


# Email-Service
@api_view(['POST'])
@permission_classes((IsAuthenticated,))
def send_email(request):
    data = request.data

    if data.get('email'):
        appointments = Appointment.objects.all()

    if appointments is not None:

        for appointment in appointments:
            doctors = Doctor.objects.all()
            doctor = Doctor.objects.get(id=appointment.doc_id_id)
            user = UserProfile.objects.get(id=appointment.user_id_id)

            date = appointment.datetime.strftime("%m/%d/%Y, %H:%M:%S")
            # Sending email to current user
            send_mail('Terminerinnerung für: ' + str(appointment.title),
                      'Sehr geehrte/-er Patient/-in, hiermit möchten wir sie freundlich daran erinnern, dass  ihr Termin: '
                      + str(appointment.title) + ' bei Herr/Frau ' + str(doctor.first_name) + ' ' + str(
                          doctor.surname) +
                      ' am: ' + date + ' stattfindet.' + '       ' + ' Mit freundlichen Grüßen'
                      + ' dein MedPlanner-Team'
                      ,
                      'MedPlanner@web.de',
                      [user],
                      fail_silently=True,

                      )
    return HttpResponse("email send")
