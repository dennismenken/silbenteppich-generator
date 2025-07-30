# Silbenteppich-Generator

Eine leichtgewichtige, kindgerechte Webapplikation zur Generierung von Silbenteppichen als Lesehilfe für Kinder im DIN A4-Format.

## Features

- **Silbenteppich-Generierung** mit verschiedenen Parametern
- **Druckoptimierte Ausgabe** im DIN A4-Format (Hoch- und Querformat)
- **Kindgerechtes Design** mit großer Schrift und visueller Klarheit
- **Interaktive Einstellungen** für verschiedene Lernmethoden
- **Responsive Design** für verschiedene Bildschirmgrößen
- **Docker-Unterstützung** für einfache Bereitstellung

## Hauptfunktionen

### Silbenstruktur-Optionen
- **Offene Silben**: la, le, li, lo, lu
- **Geschlossene Silben**: lam, lem, lim, lom, lum
- **Reduktionssilben**: Alternative Ansicht (geplant)

### Anpassungsmöglichkeiten
- Seitenausrichtung (Hoch-/Querformat)
- Groß-/Kleinschreibung
- Startbuchstabe wählbar
- Vokalauswahl inklusive Umlaute
- Zufällige oder alphabetische Reihenfolge

## Schnellstart

### Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
npm run dev
```

Die Anwendung ist dann unter http://localhost:5173 verfügbar.

### Docker Deployment

```bash
# Mit Docker Compose (empfohlen)
docker compose up -d

# Oder manuell bauen und ausführen
docker build -t silbenteppich-generator .
docker run -p 8080:80 silbenteppich-generator
```

Die Anwendung ist dann unter http://localhost:8080 verfügbar.

## Verfügbare Scripts

- `npm run dev` - Entwicklungsserver starten
- `npm run build` - Produktionsversion erstellen
- `npm run preview` - Produktionsversion lokal testen
- `npm run check` - TypeScript und Svelte Checks
- `npm run typecheck` - Nur TypeScript Check

## Projektstruktur

```
src/
├── lib/
│   ├── types.ts              # TypeScript Definitionen
│   ├── silbenteppich.ts      # Hauptlogik für Silbengenerierung
│   ├── ConfigPanel.svelte    # Einstellungskomponente
│   ├── SilbenteppichView.svelte  # Hauptanzeigekomponente
│   └── Footer.svelte         # Footer mit rechtlichen Seiten
├── App.svelte                # Hauptapplikation
└── main.ts                   # Einstiegspunkt

public/
└── legal/                    # Verzeichnis für Impressum/Datenschutz
    └── .keep                 # Git-Platzhalter
```

## Technische Details

### Tech Stack
- **Frontend**: Svelte 5 mit TypeScript
- **Build Tool**: Vite
- **Styling**: Vanilla CSS mit CSS Grid/Flexbox
- **Container**: Docker mit Nginx
- **Node.js**: Version 20+

### Druckfunktionalität
- Optimiert für DIN A4-Format
- CSS @page Regeln für korrekten Seitenumbruch
- Druckspezifische Styles (versteckte Navigation/Controls)
- Unterstützung für Hoch- und Querformat

## Nutzung

1. **Einstellungen anpassen**: Wählen Sie Silbenstruktur, Format und andere Parameter
2. **Vorschau prüfen**: Der Silbenteppich wird in Echtzeit generiert
3. **Drucken**: Klicken Sie auf "Drucken (DIN A4)" für druckoptimierten Output
4. **Alternative Ansichten**: Nutzen Sie den Button für Reduktionssilben

## Konfiguration

### Rechtliche Seiten
Erstellen Sie Markdown-Dateien im `public/legal/` Verzeichnis:
- `impressum.md` - Wird automatisch im Footer verlinkt
- `datenschutz.md` - Wird automatisch im Footer verlinkt

## Pädagogische Hintergründe

Silbenteppiche sind bewährte Lesehilfen, die:
- Das phonologische Bewusstsein fördern
- Den Übergang vom Buchstaben zur Silbe erleichtern
- Systematisches Üben von Lautverbindungen ermöglichen
- Die Leseflüssigkeit verbessern

## Datenschutz

- Keine Benutzerregistrierung erforderlich
- Keine Speicherung von Nutzerdaten
- Lokale Verarbeitung aller Einstellungen
- DSGVO-konform einsetzbar
