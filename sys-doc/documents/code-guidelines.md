# Code-Richtlinien

## Allgemein
1. Kommentare sind auf Englisch zu verfassen<br>
2. Mindestanforderungen, damit jedes Teammitglied den Code ohne großartige Nachfrage verstehen kann:
    * Dokumentation von Methoden/Funktionen durch Angabe von
        * param
        * ggf. returns 
    
        &rightarrow; in Python: Verwendung von [Docstrings](https://www.programiz.com/python-programming/docstrings) (s. Beispiel 6)<br>
        &rightarrow; in TypeScript/JavaScript: Verwendung von [TSDoc](https://tsdoc.org/)

## Python
* Variablen- und Funktionsnamen in snake_case<br>
    **Anmerkung:** Konstanten ggf. in Großbuchstaben:
    ```
    def example_foo(dummy_param):
        EXAMPLE_CONST = "const"
        #do stuff
    ```
* Type Hinting <br>
Angabe von Typen bei Parametern und Rückgabewerten <br>

    **Variable:** `<var_name>: <type>` <br>
    **Rückgabewert** `-> <type>`

    ```
    def stringify(num: int) -> str:
        return str(num)
    ```    
    weitere Beispiele sind [hier](https://mypy.readthedocs.io/en/stable/cheat_sheet_py3.html) zu finden.


## TypeScript
Installation der VSCode Extension `tslint` <br>
Nutzung der Extension wird im folgenden [YouTube-Video](https://www.youtube.com/watch?v=-lgBFAtKJ1k) in 5 Minuten aufgezeigt.

**Anmerkung**: Zum aktuellen Stand sollen die Default-Einstellungen von tslint genutzt werden. Sofern Anpassungen vorgeschlagen werden, müssen diese zunächst im Team besprochen werden und einheitlich eingeführt werden.

