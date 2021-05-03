#!/bin/sh
docker run -p 4223:4223 -v ${PWD}:/django --env theport=4223 --name DjangoMedPlanner -t -i --rm docker-django-v0.0 /bin/sh
