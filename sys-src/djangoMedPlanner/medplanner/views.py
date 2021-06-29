from django.http import HttpResponse

# start page with dummy content
# def index(request):
#   return HttpResponse("Hello, world. You're at the MedPlanner index.")
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from medplanner.models import Appointment, Doctor, UserProfile
from django.core.mail import send_mail, BadHeaderError
from rest_framework.response import Response
from rest_framework import status


def index(request):
    send_mail('Terminerinnerung für: ',
              'Sehr geehrte/-er Patient/-in,' + '\n' + 'hiermit möchten wir Sie freundlich daran erinnern, dass  Ihr '
                                                       'Termin: Zahnarzt' + ' bei Dr. Schnabel ' + 'am: 06/30/2021, um 14:20 stattfindet.' + '\n' + '\n' + ' Mit freundlichen Grüßen'
              + '\n' + 'Dein MedPlanner-Team'
              ,
              'MedPlanner@web.de',
              ['hhh-iii@web.de'],
              fail_silently=True,
              )
    return HttpResponse("send")
