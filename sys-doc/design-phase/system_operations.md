# Systemoperationen
Beschreibung von Funktionalitäten, die im Backend gebraucht werden.

## Termin-Operationen
|Operation|Anmerkung|
|:---|:---|
|`set_appointment(date, time, doctor, user, note=None, priority=None)`|- `None` steht für optionale Angaben, deshalb wird es defaultmäßig übergeben <br>* #TODO date und time zu datetime?|
|`get_appointment(appointment_id)`|Für die Anzeige bei der Detailansicht|
|`edit_appointment(appointment_id, set_appointment()?`| Sofern in set_appointment kein neuer Eintrag in der DB entsteht, könnte man die Funktion wiederverwenden|
|`delete_appointment(appointment_id)`||


Für die restlichen Entitäten sind die CRUD-Operationen ebenfalls nötig

## User-Operationen
Definitiv in Backend hashen, aber auch im Frontend nötig? 
|Operation|Anmerkung|
|:---|:---|
|`hash_passwd(password)`| Funktion wählt dann random salt und hasht das passwd|
|`check_passwd(?, hashed_passwd)`|Param1: Je nachdem, ob man über https das Passwort aus dem Frontend im Klartext angibt oder ebenfalls hasht #TODO|

## Benachrichtigung
|Operation|Anmerkung|
|:---|:---|
|`send_email_notification(user_id, appointment_id)`|über die User_ID kennt man die EMail-Adresse des Nutzers und kann mithilfe der Appointment_ID eine Benachrichtigung für Termin x schicken|


