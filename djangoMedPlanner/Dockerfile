# syntax=docker/dockerfile:1
FROM python:3.8-slim-buster
ENV PYTHONUNBUFFERED=1
WORKDIR /django
COPY requirements.txt /django/
RUN pip install -r requirements.txt
RUN pip install Django
RUN pip install djangorestframework
RUN pip install djongo
RUN pip install dnspython
RUN pip install django-cors-headers
EXPOSE 4223
#COPY . /django/ 

#docker run -p 4223:4223 -v ${PWD}:/django --env theport=4223 --name DjangoMedPlanner -t -i --rm docker-django-v0.0 /bin/sh
#docker run -p 4223:4223 -v ${PWD}:/django --env theport=4223 --name DjangoMedPlanner -t -i --rm docker-django-v0.0 --host 0.0.0.0
#CMD python manage.py runserver 
