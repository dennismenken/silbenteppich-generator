import type { SilbenteppichConfig, SilbenteppichZeile, SilbenteppichData } from './types';

const STANDARD_VOKALE = ['a', 'e', 'i', 'o', 'u'];
const UMLAUTE = ['ä', 'ö', 'ü'];
const STANDARD_KONSONANTEN = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'z'];

// Anzahl der Zeilen pro Seitenformat
export const ZEILEN_QUERFORMAT = 6;
export const ZEILEN_HOCHFORMAT = 9;

export const DEFAULT_CONFIG: SilbenteppichConfig = {
  silbenstruktur: 'offen',
  seitenausrichtung: 'quer',
  schreibweise: 'klein',
  startbuchstabe: 'l',
  umlaute: false,
  vokalReihenfolge: 'standard',
  zeilenReihenfolge: 'alphabetisch',
  schriftart: 'geist'
};

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function formatText(text: string, schreibweise: SilbenteppichConfig['schreibweise']): string {
  switch (schreibweise) {
    case 'gross':
      return text.toUpperCase();
    case 'gemischt':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    case 'klein':
    default:
      return text.toLowerCase();
  }
}

function generateSilbenForKonsonant(
  konsonant: string, 
  vokale: string[], 
  silbenstruktur: SilbenteppichConfig['silbenstruktur'],
  schreibweise: SilbenteppichConfig['schreibweise']
): string[] {
  const silben: string[] = [];
  
  for (const vokal of vokale) {
    let silbe: string;
    
    if (silbenstruktur === 'offen') {
      // Offene Silben: la, le, li, lo, lu
      silbe = konsonant + vokal;
    } else {
      // Geschlossene Silben: lam, lem, lim, lom, lum
      // Wir fügen 'm' als Standard-Endkonsonant hinzu
      silbe = konsonant + vokal + 'm';
    }
    
    silben.push(formatText(silbe, schreibweise));
  }
  
  return silben;
}

function getKonsonantenMitRekursion(startbuchstabe: string, seitenausrichtung: string): string[] {
  const endIndex = STANDARD_KONSONANTEN.indexOf(startbuchstabe.toLowerCase());
  
  // Wenn Startbuchstabe nicht gefunden, verwende 'l' als Standard
  const gültigerEndIndex = endIndex === -1 
    ? STANDARD_KONSONANTEN.indexOf('l') 
    : endIndex;
    
  // Zielanzahl Zeilen je nach Format
  const zielZeilen = seitenausrichtung === 'quer' ? ZEILEN_QUERFORMAT : ZEILEN_HOCHFORMAT;
  
  // Berechne den Startindex: gehe zielZeilen-1 Schritte zurück vom Endbuchstaben
  let startIndex = gültigerEndIndex - (zielZeilen - 1);
  
  // Wenn der Startindex negativ wäre, verschiebe ihn zyklisch
  if (startIndex < 0) {
    startIndex = STANDARD_KONSONANTEN.length + startIndex;
  }
  
  // Sammle die Konsonanten
  const result: string[] = [];
  let currentIndex = startIndex;
  
  for (let i = 0; i < zielZeilen; i++) {
    result.push(STANDARD_KONSONANTEN[currentIndex % STANDARD_KONSONANTEN.length]);
    currentIndex++;
  }
  
  return result;
}

export function generateSilbenteppich(config: SilbenteppichConfig): SilbenteppichData {
  const vokale = config.umlaute 
    ? [...STANDARD_VOKALE, ...UMLAUTE]
    : [...STANDARD_VOKALE];
    
  // Verwende die neue Funktion mit Rekursion
  const konsonanten = getKonsonantenMitRekursion(config.startbuchstabe, config.seitenausrichtung);
  
  const zeilen: SilbenteppichZeile[] = konsonanten.map(konsonant => {
    const aktuelleVokale = config.vokalReihenfolge === 'zufall' 
      ? shuffleArray(vokale) 
      : vokale;
      
    const silben = generateSilbenForKonsonant(
      konsonant, 
      aktuelleVokale, 
      config.silbenstruktur,
      config.schreibweise
    );
    
    return {
      konsonant: formatText(konsonant, config.schreibweise),
      silben
    };
  });
  
  const sortierteZeilen = config.zeilenReihenfolge === 'zufall'
    ? shuffleArray(zeilen)
    : zeilen;
  
  return {
    zeilen: sortierteZeilen,
    config
  };
}

export function validateConfig(config: Partial<SilbenteppichConfig>): SilbenteppichConfig {
  return {
    ...DEFAULT_CONFIG,
    ...config
  };
}