### If you have to run some command in django:

1. Run in a termin (not the same terminal where docker-compose are running) 
`docker exec medplanner_backend_1 python manage.py your-command` (run a command in a running container)
2. For example: if you edit the model.py file, you have to run 
`docker exec medplanner_backend_1 python manage.py migrate` to update the database.


### Admin mode
For more information open the superuser.md file

### Shell (used to put data in the database)
1. Run the comand in a terminal in the djangoMedPlanner folder (medplanner/djangoMedPlanner):
`docker exec -it medplanner_backend_1 python manage.py shell`

**How to work with shell**
1. For example: to show all objects(instances/rows) stored in the Appointment class (=table), run:
* `from medplanner.models import Doctor`
* `from medplanner.models import User`
* `from medplanner.models import Appointment`
* `Appointment.objects.all()`
2. Other comands:
* `className.objects.first()` to get the first result
* `className.objects.filter(columnName='someValue')` to filter all columnName's values
* `className.objects.filter(columnName='someValue').first()` to get the first value of multiple result
* `someVar = className.objects.first()` to safe resulte in a variable
* `someVar`, `someVar.id` to show all or some data of the variable 
3. Save data in the database:
* `doctor_1 = Doctor(doctor_first_name='Max', doctor_last_name='Mustermann')` to create an instance
* `doctor_1.save()` to save the instance 
* `Doctor.objects.all()` to show the instances of the Docotr class(table)