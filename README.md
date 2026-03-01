# Silbenteppich-Generator

Eine Webapplikation zur Generierung von Silbenteppichen als Lesehilfe fuer Kinder im DIN A4-Format. Inklusive serverseitiger PDF-Generierung fuer browserunabhaengig konsistente Druckergebnisse.

## Features

- **Silbenteppich-Generierung** mit umfangreichen Konfigurationsmoeglichkeiten
- **PDF-Download** ueber serverseitige Generierung via Playwright (Headless Chromium)
- **Druckoptimierte Ausgabe** im DIN A4-Format (Hoch- und Querformat)
- **12 paedagogische Presets** fuer verschiedene Lernphasen
- **Kindgerechtes Design** mit grosser Schrift und visueller Klarheit
- **Responsive Design** fuer verschiedene Bildschirmgroessen
- **Docker-Unterstuetzung** fuer einfache Bereitstellung

## Hauptfunktionen

### Silbenstruktur-Optionen
- **Offene Silben**: la, le, li, lo, lu
- **Geschlossene Silben**: lam, lem, lim, lom, lum (mit konfigurierbaren Endkonsonanten/Stoppern)
- **VK-Silben**: am, em, im, om, um (Vokal-Konsonant)

### Anpassungsmoeglichkeiten
- Seitenausrichtung (Hoch-/Querformat)
- Gross-/Kleinschreibung (klein, gross, gemischt)
- Startbuchstabe/-verbindung waehlbar
- Endkonsonanten in 5 Stufen (Tier 1-3, Verbindungen, Doppelkonsonanten)
- Konsonantenverbindungen/Cluster (bl, kr, schr, ...)
- Vokalauswahl inklusive Umlaute
- Zufaellige oder alphabetische Reihenfolge (Zeilen und Vokale)
- Schriftart (Geist oder Andika)

## Schnellstart

### Lokale Entwicklung

```bash
npm install
npm run dev
```

Die Anwendung ist dann unter http://localhost:5173 verfuegbar.

### Produktion

```bash
npm run build
npm run start
```

Der Server laeuft dann auf Port 3000.

### Docker Deployment

```bash
docker compose up -d
```

## Verfuegbare Scripts

- `npm run dev` -- Entwicklungsserver starten (Port 5173)
- `npm run build` -- Produktionsversion erstellen
- `npm run start` -- Produktionsserver starten (`node build`)
- `npm run preview` -- Produktionsversion lokal testen
- `npm run check` -- TypeScript und Svelte Checks
- `npm run typecheck` -- Nur TypeScript Check
- `npm run check-legal` -- Prueft ob rechtliche Dateien vorhanden sind

## Projektstruktur

```
src/
├── routes/
│   ├── +layout.svelte              # Layout mit Meta-Tags, OG, Structured Data
│   ├── +page.svelte                # Hauptseite (Konfiguration, Druck, PDF)
│   └── api/
│       └── generate-pdf/
│           └── +server.ts          # PDF-Generierungs-Endpoint
├── lib/
│   ├── types.ts                    # TypeScript Definitionen
│   ├── silbenteppich.ts            # Hauptlogik fuer Silbengenerierung
│   ├── presets.ts                  # 12 paedagogische Presets
│   ├── ConfigPanel.svelte          # Einstellungskomponente
│   ├── SilbenteppichView.svelte    # Anzeige (Screen + Print)
│   ├── Footer.svelte               # Footer mit rechtlichen Seiten
│   └── server/
│       ├── pdf-renderer.ts         # HTML-Aufbau fuer PDF-Rendering
│       ├── playwright-pool.ts      # Chromium-Instanz-Management
│       └── pdf.css                 # Standalone CSS fuer PDF
├── hooks.server.ts                 # Graceful Shutdown fuer Playwright
├── app.html                        # HTML-Template
├── app.css                         # Globale Styles (Tailwind + Print)
└── app.d.ts                        # TypeScript-Deklarationen

static/
├── fonts/                          # Lokal gehostete Schriften (Geist, Andika)
├── images/                         # Logo, OG-Image
├── legal/                          # Impressum, Datenschutz (Markdown)
└── ...                             # Favicons, Manifest, robots.txt
```

## Technische Details

### Tech Stack
- **Framework**: SvelteKit mit adapter-node
- **Frontend**: Svelte 5 (Runes) mit TypeScript
- **Styling**: Tailwind CSS 3 mit CSS Grid
- **PDF**: Playwright Chromium (serverseitig)
- **Build Tool**: Vite
- **Container**: Docker mit Node.js 24
- **Schriften**: Lokal gehostet (Geist, Andika)

### PDF-Generierung
- Serverseitig via Playwright Headless Chromium
- Browserunabhaengig konsistente Ergebnisse auf DIN A4
- Singleton-Browser-Instanz mit Concurrency-Limiting (max. 3 parallel)
- Fonts werden ueber den laufenden Server geladen
- Graceful Shutdown bei SIGTERM/SIGINT

### Druckfunktionalitaet
- Browser-Druck via `window.print()` weiterhin verfuegbar
- CSS @page Regeln fuer korrektes Seitenformat
- Druckspezifische Styles (versteckte Navigation/Controls)
- Unterstuetzung fuer Hoch- und Querformat

## Nutzung

1. **Preset waehlen** oder Einstellungen manuell anpassen
2. **Vorschau pruefen**: Der Silbenteppich wird in Echtzeit generiert
3. **PDF herunterladen**: Fuer konsistente Ergebnisse unabhaengig vom Browser
4. **Drucken**: Alternativ direkt ueber den Browser drucken

## Konfiguration

### Rechtliche Seiten
Markdown-Dateien im `static/legal/` Verzeichnis ablegen:
- `imprint.md` -- Wird automatisch als "Impressum" im Footer verlinkt
- `privacy.md` -- Wird automatisch als "Datenschutzerklaerung" im Footer verlinkt

Die Verfuegbarkeit wird beim Build automatisch geprueft.

## Paedagogische Hintergruende

Silbenteppiche sind bewaehrte Lesehilfen, die:
- Das phonologische Bewusstsein foerdern
- Den Uebergang vom Buchstaben zur Silbe erleichtern
- Systematisches Ueben von Lautverbindungen ermoeglichen
- Die Lesefluessigkeit verbessern

Die 12 integrierten Presets orientieren sich an einer didaktischen Progression von einfachen offenen Silben bis hin zu Konsonantenverbindungen und Doppelkonsonanten.

## Datenschutz

- Keine Benutzerregistrierung erforderlich
- Keine Speicherung von Nutzerdaten
- Lokale Verarbeitung aller Einstellungen
- Lokal gehostete Schriften (keine externen CDN-Abhaengigkeiten)
- DSGVO-konform einsetzbar
