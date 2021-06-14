# Admin mode
Um in den Admin-Mode zu gelangen: `localhost:8000/admin`

## Admin Login:
+ admin_user: awe_user@admin.com
+ password: Z?D76.u(6756

## Trouble shooting
Falls es Schwierigkeiten beim Admin-Login gibt, ist vermutlich noch kein superuser erzeugt<br>
1. Während `docker-compose up` läuft, erzeugt man in einer anderen Shell einen neuen Admin <br>
```
docker exec -it sys-src_backend_1 python manage.py createsuperuser
```
2. Eingabe der erforderlichen Ferlder, e.g.:
```
E-Mail-Adresse: <admin_user>
Password: <password>
Password (again): <password>
```

**Anmerkung:** Der Default-User von Django verlangt eigentlich verpflichtend einen Benutzernamen statt einer Email-Adresse. Da wir bei der Registierung bzw. beim Login ausschließlich mit der E-Mail arbeiten, wurde das model entsprechend angepasst.

3. Danach sollte man wie gewohnt in den Admin-Mode gelangen können.
