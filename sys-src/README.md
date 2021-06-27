# Anleitung für Build und Run

## Starten des Projekts
1. In diesem Ordner `docker-compose-up`ausführen <br>
&rightarrow;
Auf diese Weise werden jeweils für Frontend(ngMedPlanner) und Backend (djangoMedPlanner) zusammen mit der Datenbank Images erzeugt, wichtige Bibliotheken installiert und Container gestartet.

2. Sofern das ng-image bereits existiert, kann in 1. ein Fehler aufgrund von Container-Konflikten entstehen. Mithilfe von `docker system prune`werden alle ungenutzen Container, Images und Volumes. Schritt 1 wiederholen.

3. Wenn beide Container laufen (Im Terminal ersichtlich durch: Compiled Successfully) können die beiden Komponenten folgendermaßen im Browser aufgerufen werden:
    * Angular: https://localhost:4220 
    * Django: https://localhost:8000

## Stoppen des Projekts
1. Die Ausführung von Docker Compose mit `Strg+C` beenden.
2. Ausführen von `exit`.


TODO: nochmal allgemeine Installation von Docker erklären
TODO: die Skripte für das setup von ngMedPlanner hier erwähnen und deren setup
TODO: hier auch das Zeugs für Django config erklären sowie das anlegen eines superusers
## Wichtige Befehle
1. Anzeigen der existierenden Images: `docker image ls`
2. Image entfernen: `docker image rm <imade-id>` <br>
&rightarrow; Erhalten von Image-ID durch `docker image ls`
3. Anzeigen der existierenden Container: `docker container ls`
4. Container entfernen: `docker container rm container-id`

####
1. More info about Django: https://docs.djangoproject.com/en/3.2/intro/tutorial01/ , https://medium.com/shot-code/running-django-postgresql-containers-and-persisting-data-with-docker-4dd8e4dd5361
2. More info about Docker: https://docs.docker.com/samples/django/


### Verwendete Versionen
* Angular: 11.0.1

TODO: Django und Python