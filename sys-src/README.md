# Anleitung für Build und Run

## Allgemeine Informationen
### Einrichtung von Docker auf Linux
1. Installationsschritten je nach Linux-Distribution in der Docker-Dokumentation folgen, beispielhaft für [Ubuntu-Nutzer](https://docs.docker.com/engine/install/ubuntu/) 
2. Daemon aktivieren (bei jedem Systemstart direkt aktiv)
```
sudo systemctl enable --now docker
```
3. Damit Docker nicht immer als super user ausgeführt werden muss, kann man folgende Befehle ausführen
```
sudo usermod -aG docker $USER
```
### Wichtige Befehle
1. Anzeigen der existierenden Images: `docker image ls`
2. Image entfernen: `docker image rm <imade-id>` <br>
&rightarrow; Erhalten von Image-ID durch `docker image ls`
3. Anzeigen der existierenden Container: `docker container ls`
4. Container entfernen: `docker container rm container-id`

## Build und Start des Projekts
Mithilfe der Datei [docker-compose.yml](./docker-compose.yml) werden für das Frontend und das Backend (zusammen mit der Datenbank) Images erzeugt , wichtige Bibliotheken installiert und die Container gestartet.

1. Erzeugung und Starten von Containern
```
docker-compose up
``` 

**Hinweis**: Bei der ersten Ausführung dauert die Erzeugung am längsten, da hierbei neben der Installation von externen Modulen für Python und Angular auch die Migration der Datenbank stattfindet.

2. Warten, bis auch vom Angular-Container die Meldung *Compiled Successfully* erscheint
3. Die Container können folgendermaßen im Browser aufgerufen werden:
    * Frontend-Container: http://localhost:4220 
    * Backend-Container: http://localhost:8000

4. Möchte man alle existenten Container, Images und Volumes entfernen (da es bei der Ausführung zu Konflikten gekommen ist), kann man folgenden Befehl nutzen:
```
docker system prune --all
```
**Hinweis**: Mit `--filter`kann man je nach Anwendungsfall Elemente entfernen, die nicht mehr benötigt werden.

### Stoppen des Projekts
1. Die Ausführung von Docker Compose mit `Strg+C` beenden.
2. Innerhalb eines Containers: Ausführen von `exit`.

## Informationen zum Backend-Container
Genauere Informationen, um den Docker-Container für das Backend zu nutzen, sind im zugehörigen [README.md](./djangoMedPlanner/README.md) enthalten.

Darin wird u.a. die Nutzung des Admin-Modes erklärt.

## Informationen zum Frontend-Container
Genauere Informationen, um den Docker-Container für das Frontend zu nutzen, sind im zugehörigen [README.md](./ngMedPlanner/README.md) enthalten.<br>

Darin werden u.a. die verwendeten Bash-Skripte für die Projektausfürhung erklärt

## Verwendete Versionen
Hierbei wird nur auf die relevantesten Versionen eingegangen, die nicht ohne zusätzlichen Aufwand ermittelt werden können.
|Container| Package | Version |
|:--:|:--|:--:|
|Frontend|Angular| 11.0.7|
||TypeScript|4.0.7|
|Backend|Python|3.9.5
||pip|21.1.3|
||Django| 3.2.4|

#TODO check if paths are correct
#TODO grammar