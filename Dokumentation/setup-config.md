# Informationen zur Projekteinrichtung

(Später ggf. in ngMedPlanner/README.md einfügen)

## Einrichtung von Docker

* Installationsschritten je nach Linux-Distribution in der Docker-Dokumentation folgen, beispielhaft für [Ubuntu-Nutzer](https://docs.docker.com/engine/install/fedora/) 

* Daemon aktivieren (bei jedem Systemstart direkt aktiv)
```
sudo systemctl enable --now docker
```

Damit Docker nicht immer als super user ausgeführt werden muss, kann man folgende Befehle ausführen
```
sudo usermod -aG docker $USER
```

**Anmerkung speziell für Fedora**<br>
Damit die Netzwerkfähigkeit innerhalb von Docker-Containern definitv gewährleistet wird

```
firewall-cmd --permanent --zone=trusted --add-interface=docker0

firewall-cmd --reload
```

Quelle: https://www.linuxuprising.com/2019/11/how-to-install-and-use-docker-on-fedora.html (Zugriff: 03.05.21)

## Benötigte Pakete
Für das Frontend wird `npm` benötigt [1]

```
#Ubuntu
sudo apt install npm

#Fedora
sudo dnf install npm
```





[1] Zumindest bei mir hat es Probleme gemacht