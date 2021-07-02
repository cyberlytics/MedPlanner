from django.http import HttpResponse

# start page with dummy content
 def index(request):
   return HttpResponse("Welcome to MedPlanner! Go to /admin to use admin mode.")
