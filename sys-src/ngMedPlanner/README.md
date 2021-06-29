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
* [test.sh](./test.sh)<br>
&rightarrow; Ausführung der Unit-Tests für das Frontend<br>
**Anmerkung:** Graphisch einsehbar sind die Tests über http://localhost:9876/
#TODO Andrei fragen, was die Debug-Darstellung jeweils zeigt.

## Isolierte Nutzung des Frontend-Containers
1. In diesem Ordner `build.sh`ausführen.<br>
&rightarrow; Dieser Schritt muss nur einmal zu Beginn ausgeführt werden, damit ein Image erstellt wird.
2. Ggf. `setup.sh`ausführen, sofern Änderungen im Master bestehen, die lokal nicht existieren.
3. `start.sh` für das Starten des Containers ausführen.
4. Im Browser http://localhost:4220 öffnen

## Befehle
Rekursiv alle Berechtigungen für die Elemente von `<folder-name>` erteilen, sofern diese vorher schreibgeschützt waren.
```
sudo chmod 777 <folder-name> -R
```

**Hinweis:** Diese Methode ist vor allem in der Entwicklungsphase geeignet, da man so nicht explizit für jede Datei bzw. jeden Ordner neu wählen muss, welche Rechte an dieser Stelle passend sind.
