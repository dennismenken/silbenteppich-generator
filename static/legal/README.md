# Rechtliche Dokumente

Dieses Verzeichnis ist für rechtliche Dokumente gedacht, die im Footer angezeigt werden.

## Rechtliche Dokumente hinzufügen

So fügen Sie rechtliche Dokumente zu Ihrer Anwendung hinzu:

### 1. Impressum
Erstellen Sie eine Datei `imprint.md` in diesem Verzeichnis mit Ihrem Impressum.

### 2. Datenschutzerklärung  
Erstellen Sie eine Datei `privacy.md` in diesem Verzeichnis mit Ihrer Datenschutzerklärung.

## So funktioniert es

- **Automatische Erkennung**: Der Footer zeigt automatisch Links für vorhandene Dokumente an
- **Markdown-Unterstützung**: Vollständige Markdown-Syntax wird unterstützt (Überschriften, Listen, Links usw.)
- **Dynamisches Laden**: Dokumente werden bei Bedarf geladen, wenn Benutzer auf die Links klicken
- **Kein Server erforderlich**: Funktioniert mit statischem Hosting, da Markdown-Dateien clientseitig abgerufen werden

## Dateiformat

Beide Dateien sollten im Markdown-Format (.md) vorliegen und können enthalten:

- Überschriften (`# ## ###`)
- Fett- und Kursivschrift (`**fett** *kursiv*`)
- Listen (nummeriert und mit Aufzählungszeichen)
- Links `[Text](URL)`
- Zeilenumbrüche und Absätze

## Beispielstruktur

```
public/legal/
├── README.md (diese Datei)
├── imprint.md (Ihr Impressum - manuell hinzufügen)
└── privacy.md (Ihre Datenschutzerklärung - manuell hinzufügen)
```

## Hinweis

Die Dateien `imprint.md` und `privacy.md` werden von Git ignoriert (siehe `.gitignore`), sodass sie lokal hinzugefügt werden können, ohne ins Repository übernommen zu werden.