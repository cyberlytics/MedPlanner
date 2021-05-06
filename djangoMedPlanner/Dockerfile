# syntax=docker/dockerfile:1
FROM python:3.8
ENV PYTHONUNBUFFERED=1
WORKDIR /django
COPY requirements.txt /django/
RUN pip install -r requirements.txt
RUN pip install django
RUN pip install djangorestframework
RUN pip install djongo
RUN pip install dnspython
RUN pip install django-cors-headers
ENV PORT=4223
EXPOSE 4223
COPY . /django/ 

#docker run -it -p 4223:4223 -v ${PWD}:/django --name DjangoMedPlanner --rm docker-django-v0.0 
#docker run -p 4223:4223 -v ${PWD}:/django      --name DjangoMedPlanner -t -i --rm docker-django-v0.0 --host 0.0.0.0
#CMD python manage.py runserver 
