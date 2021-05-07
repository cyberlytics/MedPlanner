# WEB-AE 2021
# Group project

### Start project
1. To start the project run `docker-compose up`
2. If ng-image is already created, the step 1. can occur a problem (container conflicts). In that situation run `docker system prune`
to remove all unused containers, images and volumes.
3. Run again `docker-compose up`.
4. That command creates images for Angular(frontend) and Django(backend) projects and for Postgres DB (already not used), installs 
necessary libs and creates containers for the same projects. 
4. When all containers are running, open Angular as `localhost:4220` and Django as `localhost:8000` in a browser.

### Stop project
1. In the terminal run `Strg+C`
2. Run `exit`

### Useful commands
1. Show all existing images: `docker image ls`
2. Remove an image: `docker image rm imade-id` (to get the image name, run `docker image ls` and find the image in the table)
3. Show all existing containers: `docker container ls`
4. Remove a container: `docker container rm container-id`

####
1. More info about Django: https://docs.djangoproject.com/en/3.2/intro/tutorial01/ , https://medium.com/shot-code/running-django-postgresql-containers-and-persisting-data-with-docker-4dd8e4dd5361
2. More info about Docker: https://docs.docker.com/samples/django/