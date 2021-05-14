# GitLab-Richtlinien

1. In den master wird nur über merge-requests gepusht <br>
&rightarrow; Hierbei können nur folgende Mitglieder in master pushen
    * Andrei Trukhin
    * Madina Kamalova
    * Egidia Cenko

2. Issues können immer im Backlog (issue-board im Bereich *Open*) von jedem Mitglied eingetragen werden. Diese werden dann ggf. im Meeting diskutiert. <br>
Eingetragen wird immer ein Assignee als Hauptverantwortlicher. Falls mehrere Gruppenmitglieder beiteiligt waren, sollen diese beim Commit mit der Bezeichnung `Co-authored-by:`[1]
3. Für die Bearbeitung von Issues muss immer ein neuer branch erzeugt werden mit `git checkout -b <branch-name>` <br>
Der branch name folgt dabei der Syntax `<vorname>/<prägnante-Bezeichnung-für-Änderung>`

**Anmerkung:** Arbeiten mehrere Teilnehmer am gleichen issue (und somit im gleichen branch), können beide Vornamen, mit Unterstrich getrennt, im branch name stehen.

[1] https://mokacoding.com/blog/how-to-add-coauthors-to-a-git-commit/