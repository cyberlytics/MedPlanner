# Informationen für den Frontend-Container
## Bash-Skripte
**Voraussetzung:** Für die Ausführung der Skripte sollte der Container nicht bereits aktiv sein!

Im [Frontend-Ordner](./ngMedPlanner/) sind Bash-Skripte enthalten, die die Ausführung der Dockerbefehle enthalten. Diese sind in der Regel bereits als ausführbare Dateien gespeichert und können folgendermaßen ausgeführt werden:
```
./<dateiname.sh>

#Alternativ falls als normale Datei hinterlegt
sh <dateiname>
```

* [setup.sh](./setup.sh) <br>
&rightarrow; Nachträgliche Installation von Bibliotheken. Dadurch wird gewährleistet, dass alle verwendeten Bibliotheken aus dem Master-Branch auch lokal enthalten sind
* [build.sh](./build.sh) <br>
&rightarrow; Erzeugung eines Docker Images für das Frontend
* [start.sh](./start.sh)<br>
&rightarrow; Starten des Frontend-Containers

## Isolierte Nutzung des Frontend-Containers
1. In diesem Ordner `build.sh`ausführen.<br>
&rightarrow; Dieser Schritt muss nur einmal zu Beginn ausgeführt werden, damit ein Image erstellt wird.
2. Ggf. `setup.sh`ausführen, sofern Änderungen im Master bestehen, die lokal nicht existieren.
3. `start.sh` für das Starten des Containers ausführen.
4. Im Browser http://localhost:4220 öffnen

## Login als Beispielnutzer
Email: test@user.com
Passwort: 123.Klbd
## Tests
Die Unit-Tests können über die Datei [test.sh](./test.sh) ausgeführt werden, jedoch nur, wenn der Container **nicht** bereits aktiv ist. Aufgrund der Vielzahl unserer Komponenten ist es nicht möglich alle Elemente mit Unit-Tests abzudecken. Grund hierfür ist, dass der Zeitaufwand für die Testung der Funktionalität der Komponenten nahezu übereinstimmend mit der eigentlichen Realisierung der Funktionalität ist.

**Anmerkung:** Graphisch einsehbar sind die Testauswertungen über http://localhost:9876/

## Befehle
Rekursiv alle Berechtigungen für die Elemente von `<folder-name>` erteilen, sofern diese vorher schreibgeschützt waren.
```
sudo chmod 777 <folder-name> -R
```

**Hinweis:** Diese Methode ist vor allem in der Entwicklungsphase geeignet, da man so nicht explizit für jede Datei bzw. jeden Ordner neu wählen muss, welche Rechte an dieser Stelle passend sind.