export interface SilbenteppichConfig {
  silbenstruktur: 'offen' | 'geschlossen' | 'vokal-konsonant';
  seitenausrichtung: 'hoch' | 'quer';
  schreibweise: 'klein' | 'gross' | 'gemischt';
  startbuchstabe: string;
  endkonsonant: string;
  konsonantModus: 'einzel' | 'cluster';
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