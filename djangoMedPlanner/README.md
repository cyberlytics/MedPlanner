### If you have to run some command in django:

1. Run in a termin (not the same terminal where docker-compose are running) 
`docker exec medplanner_backend_1 python manage.py your-command` (run a command in a running container)
2. For example: if you edit the model.py file, you have to run 
`docker exec medplanner_backend_1 python manage.py migrate` to update the database.


### Admin mode
For more information open the superuser.md file