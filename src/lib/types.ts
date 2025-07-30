export interface SilbenteppichConfig {
  silbenstruktur: 'offen' | 'geschlossen';
  seitenausrichtung: 'hoch' | 'quer';
  schreibweise: 'klein' | 'gross' | 'gemischt';
  startbuchstabe: string;
  umlaute: boolean;
  vokalReihenfolge: 'standard' | 'zufall';
  zeilenReihenfolge: 'alphabetisch' | 'zufall';
  schriftart: 'geist' | 'andika';
}

export interface SilbenteppichZeile {
  konsonant: string;
  silben: string[];
}

export interface SilbenteppichData {
  zeilen: SilbenteppichZeile[];
  config: SilbenteppichConfig;
}