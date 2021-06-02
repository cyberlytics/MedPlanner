# Admin mode
To get the admin mode put in the browser `localhost:8000/admin`

## Admin Login:
+ user: awe_user
+ password: Z?D76.u(6756

## Trouble shooting
If login errors are occuring try the following:<br>
1. Execute the following command while `docker-compose up` is running in another shell <br>
```
docker exec -it sys-src_backend_1 python manage.py createsuperuser
```
2. Fill in the asked elements, e.g.:
```
Benutzername:
E-Mail-Adresse: [you can it leave blank]
Password: 
Password (again): 
```

3. This will successfully create the superuser. Now you can try admin mode again.
