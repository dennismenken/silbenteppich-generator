import type { SilbenteppichConfig, SilbenteppichZeile, SilbenteppichData } from './types';

const STANDARD_VOKALE = ['a', 'e', 'i', 'o', 'u'];
const UMLAUTE = ['ä', 'ö', 'ü'];
const STANDARD_KONSONANTEN = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 't', 'v', 'w', 'z'];

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

function getKonsonanten(startbuchstabe: string, seitenausrichtung: string): string[] {
  const startIndex = STANDARD_KONSONANTEN.indexOf(startbuchstabe.toLowerCase());
  const verfügbareKonsonanten = startIndex === -1 
    ? STANDARD_KONSONANTEN.slice(STANDARD_KONSONANTEN.indexOf('l'))
    : STANDARD_KONSONANTEN.slice(startIndex);
    
  // Für Querformat: weniger Zeilen, für Hochformat: mehr Zeilen  
  const maxZeilen = seitenausrichtung === 'quer' ? 8 : 15;
  return verfügbareKonsonanten.slice(0, maxZeilen);
}

export function generateSilbenteppich(config: SilbenteppichConfig): SilbenteppichData {
  const vokale = config.umlaute 
    ? [...STANDARD_VOKALE, ...UMLAUTE]
    : [...STANDARD_VOKALE];
    
  const konsonanten = getKonsonanten(config.startbuchstabe, config.seitenausrichtung);
  
  // Mindestens 5 Zeilen, aber angepasst an Format
  const minZeilen = 5;
  const relevantKonsonanten = konsonanten.slice(0, Math.max(minZeilen, konsonanten.length));
  
  const zeilen: SilbenteppichZeile[] = relevantKonsonanten.map(konsonant => {
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