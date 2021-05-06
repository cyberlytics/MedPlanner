***Ablauf beim erstem Mal***
1. Docker installieren: `sudo apt-get install docker-ce docker-ce-cli containerd.io`
2. In dem Ordner, wo die Datei README liegt, klicke die rechte Maustaste und wähle Open in Terminal
3. Schreibe in dem Terminal `./build.sh` (Der Befehl erzeugt eine Image, das muss man nur ein Mal machen)
4. Wenn das Kommando ausgeführt wurde, schreibe in dem Terminal `./start.sh` (Der Befehl startet einem Container und danach das Projekt)
5. Schreibe `localhost:4220` in einem Browser

***Ablauf bei nächsten Malen***
1. In dem Ordner, wo die Datei README liegt, klicke die rechte Maustaste und wähle Open in Terminal.
2. Wenn das Kommando ausgeführt wurde, schreibe in dem Terminal `./start.sh`. (Container und Projekt starten, das muss man jedes Mal machen)
3. Schreibe `localhost:4220` in einem Browser

***Ablauf im Fall der Nachinstallierung von Bibliotheken***
1. In dem Ordner, wo die Datei README liegt, klicke die rechte Maustaste und wähle Open in Terminal.
3. Wenn das Kommando ausgeführt wurde, schreibe in dem Terminal `./setup.sh`.

***Wichtige Kommandos***
* `cd folder-name`                  -  wechselt in das angegebene Verzeichnis
* `cd ..`                           -  wechselt in das vorherig benutzte Verzeichnis
* `Strg+C`                          - Container stoppen
* `exit`                            - Container verlassen
* `sudo chmod 777 folder-name -R`   - Berechtigungen von einem Ordner und seinen Unterordnern ändern (777 bedeutet alle rechte geben)
* `./file-name`                     - Datei in Terminal öffnen 
