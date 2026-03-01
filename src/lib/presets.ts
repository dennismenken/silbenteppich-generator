import type { SilbenteppichConfig } from './types';

export interface Preset {
  name: string;
  beschreibung: string;
  phase: string;
  config: Partial<SilbenteppichConfig>;
}

export const PRESETS: Preset[] = [
  {
    name: 'Einstieg: Offene Silben (m, l)',
    beschreibung: 'Erste Lesewochen mit den Konsonanten m und l',
    phase: 'Woche 1-4',
    config: {
      silbenstruktur: 'offen',
      konsonantModus: 'einzel',
      startbuchstabe: 'm',
      umlaute: false,
      seitenausrichtung: 'quer',
      schriftart: 'andika'
    }
  },
  {
    name: 'Offene Silben erweitert (t, r, s, w)',
    beschreibung: 'Weitere Konsonanten fuer offene Silben',
    phase: 'Woche 5-10',
    config: {
      silbenstruktur: 'offen',
      konsonantModus: 'einzel',
      startbuchstabe: 'w',
      umlaute: false,
      seitenausrichtung: 'quer',
      schriftart: 'andika'
    }
  },
  {
    name: 'Geschlossene Silben: Stopper m',
    beschreibung: 'Erste geschlossene Silben mit Endkonsonant m',
    phase: 'Ab Woche 11',
    config: {
      silbenstruktur: 'geschlossen',
      endkonsonant: 'm',
      konsonantModus: 'einzel',
      umlaute: false,
      seitenausrichtung: 'quer',
      schriftart: 'andika'
    }
  },
  {
    name: 'Geschlossene Silben: Stopper l',
    beschreibung: 'Geschlossene Silben mit Endkonsonant l',
    phase: 'Ab Woche 11',
    config: {
      silbenstruktur: 'geschlossen',
      endkonsonant: 'l',
      konsonantModus: 'einzel',
      umlaute: false,
      seitenausrichtung: 'quer',
      schriftart: 'andika'
    }
  },
  {
    name: 'Geschlossene Silben: Stopper n',
    beschreibung: 'Geschlossene Silben mit Endkonsonant n',
    phase: 'Ab Woche 11',
    config: {
      silbenstruktur: 'geschlossen',
      endkonsonant: 'n',
      konsonantModus: 'einzel',
      umlaute: false,
      seitenausrichtung: 'quer',
      schriftart: 'andika'
    }
  },
  {
    name: 'Geschlossene Silben: Stopper t',
    beschreibung: 'Geschlossene Silben mit Endkonsonant t',
    phase: 'Ab Woche 12',
    config: {
      silbenstruktur: 'geschlossen',
      endkonsonant: 't',
      konsonantModus: 'einzel',
      umlaute: false,
      seitenausrichtung: 'quer',
      schriftart: 'andika'
    }
  },
  {
    name: 'VK-Silben Einstieg',
    beschreibung: 'Vokal-Konsonant-Silben wie am, em, im',
    phase: 'Ab Woche 11',
    config: {
      silbenstruktur: 'vokal-konsonant',
      konsonantModus: 'einzel',
      startbuchstabe: 'n',
      umlaute: false,
      seitenausrichtung: 'quer',
      schriftart: 'andika'
    }
  },
  {
    name: 'Konsonantenverbindungen offen',
    beschreibung: 'Offene Silben mit Konsonantenverbindungen (bl, kr, tr...)',
    phase: 'Fortgeschritten',
    config: {
      silbenstruktur: 'offen',
      konsonantModus: 'cluster',
      startbuchstabe: '',
      umlaute: false,
      seitenausrichtung: 'quer',
      schriftart: 'andika'
    }
  },
  {
    name: 'Konsonantenverbindungen geschlossen',
    beschreibung: 'Geschlossene Silben mit Konsonantenverbindungen',
    phase: 'Fortgeschritten',
    config: {
      silbenstruktur: 'geschlossen',
      endkonsonant: 'm',
      konsonantModus: 'cluster',
      startbuchstabe: '',
      umlaute: false,
      seitenausrichtung: 'quer',
      schriftart: 'andika'
    }
  },
  {
    name: 'Mit Umlauten (offen)',
    beschreibung: 'Offene Silben inklusive ae, oe, ue',
    phase: 'Fortgeschritten',
    config: {
      silbenstruktur: 'offen',
      konsonantModus: 'einzel',
      umlaute: true,
      seitenausrichtung: 'quer',
      schriftart: 'andika'
    }
  },
  {
    name: 'Doppelkonsonanten (mm, ll, nn...)',
    beschreibung: 'Geschlossene Silben mit Doppelkonsonanten als Stopper',
    phase: 'Fortgeschritten',
    config: {
      silbenstruktur: 'geschlossen',
      endkonsonant: 'mm',
      konsonantModus: 'einzel',
      umlaute: false,
      seitenausrichtung: 'quer',
      schriftart: 'andika'
    }
  }
];
