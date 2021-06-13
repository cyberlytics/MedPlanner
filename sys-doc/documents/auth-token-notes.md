# Authentication Token

Status Code `HTTP 401: Unauthorized`

Wir nutzen die *tokenbasierte Authentifizierung*, bei der ein User durch Eingabe von seiner E-Mail und einem Passwort ein Token erhält. Das kann er dann nutzen, um eine bestimmte Quelle abzurufen ohne E-Mail- und Passwortinformationen angeben zu müssen.<br>
Sobald der User ein Token erhalten hat, hat er Zugriffsmöglichkeiten auf verschiedene Ressourcen.

## Wo/Wann wird das Token erzeugt?
&rightarrow; Beim Login bzw. bei der Registrierung eines neuen Users

Prinzipiell aber immer, wenn kein Token vorhanden ist.<br>
In unserem Fall bedeutet das konkret: **Beim User-Logout** wird das Token gelöscht. Sobald der User sich wieder einloggt, wird durch Django REST erneut ein Token erzeugt.

## Wie lange bleibt dasselbe Token bestehen?
&rightarrow; Bis zum nächsten Logout

Standardmäßig bietet Django nur an, dass das Token erst dann aktualisiert, besser gesagt neu erstellt, wird, wenn keins für den User vorhanden ist.<br>
Um eine bestimmte Zeitdauer angeben zu können, müsste man die Default-Klasse umschreiben und an die Team-Ansprüche anpassen. Ein Ansatz dazu wird [hier](https://stackoverflow.com/questions/14567586/token-authentication-for-restful-api-should-the-token-be-periodically-changed) dargestellt. <br>
Da wir weitere User Stories haben und die Überarbeitung der Default-Klasse theoretisch eine weitere User Story mit zusätzlichem Zeitaufwand wäre, werden wir im weiteren Verlauf nur mit den Standardkonfigurationen für Tokens arbeiten.   

## Wie arbeiten wir im Projekt mit den Tokens?
### Allgemein
Tokens ersetzen die Eingabe von Passwort und EMail, d.h. überall wo diese Informationen nicht dringend benötigt werden, soll das Token eingesetzt werden.

### Backend
Django bietet eigentlich eine Umgebungsvariable `DEFAULT_PERMISSION_CLASSES` an, die in `settings.py` eingefügt werden kann. Dadurch wird aber überall nach einer Authentifizierung geprüft, was bei Registrierung und Login noch nicht geht.

**Lösung:** Überall, wo eine Authentifizierung erforderlich ist, sollte als Dekorator über die zugehörige Python-Methode (primär bei Views) folgendes stehen.

```
#imports 
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated


@permission_classes((IsAuthenticated, ))
def foo(request):
    # functionality
```
**Anmerkung:** Django prüft selbst die Authentifizierung, d.h. man muss nicht extra selbst Code erstellen. Sofern die Tokens aus dem Backend und dem Request übereinstimmen, können individuelle Prüfungen gemacht werden, z.B. Passwortüberprüfung vor Passwortänderung. 

### Frontend
Das Token soll im Request Header folgendermaßen stehen:
```
 "Authorization:" Token `<token_str>` 
 ```

## Wie kann man sich die Tokens ausgeben lassen?
### Request-Token
```
request.META.get('HTTP_AUTHORIZATION', None)
```  

### Backend-Token
Beispielhaft für user requests
```
#imports
from rest_framework.authtoken.models import Token


user = request.user

#user token
token_backend = Token.objects.get(user=user)
```



