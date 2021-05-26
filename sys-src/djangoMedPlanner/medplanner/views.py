from django.http import HttpResponse


# start page with dummy content
def index(request):
    return HttpResponse("Hello, world. You're at the MedPlanner index.")

