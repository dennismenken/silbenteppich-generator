import type { SilbenteppichConfig, SilbenteppichZeile, SilbenteppichData } from './types';

const STANDARD_VOKALE = ['a', 'e', 'i', 'o', 'u'];
const UMLAUTE = ['ä', 'ö', 'ü'];

// Bereinigte Konsonantenliste: 'c' entfernt (im Deutschen als Einzelkonsonant irrelevant),
// 'ch' und 'sch' hinzugefuegt (zentrale deutsche Konsonanten)
export const STANDARD_KONSONANTEN = ['b', 'ch', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'r', 's', 'sch', 't', 'v', 'w', 'z'];

// Konsonantenverbindungen (Cluster) als Starter
export const KONSONANTEN_CLUSTER = [
  'bl', 'br', 'dr', 'fl', 'fr', 'gl', 'gr',
  'kl', 'kr', 'pl', 'pr', 'tr', 'zw',
  'sp', 'spr', 'st', 'str',
  'schl', 'schm', 'schn', 'schr', 'schw'
];

// Endkonsonanten (Stopper), sortiert nach didaktischer Progression
export const STOPPER_TIER_1 = ['m', 'l', 'n'];
export const STOPPER_TIER_2 = ['t', 'd', 's'];
export const STOPPER_TIER_3 = ['r', 'p', 'f', 'w'];
export const STOPPER_VERBINDUNGEN = ['ck', 'ng', 'nk', 'tz'];
export const STOPPER_DOPPEL = ['mm', 'll', 'nn', 'ss', 'tt', 'ff', 'pp', 'rr'];

// Anzahl der Zeilen pro Seitenformat
export const ZEILEN_QUERFORMAT = 6;
export const ZEILEN_HOCHFORMAT = 9;

export const DEFAULT_CONFIG: SilbenteppichConfig = {
  silbenstruktur: 'offen',
  seitenausrichtung: 'quer',
  schreibweise: 'klein',
  startbuchstabe: 'l',
  endkonsonant: 'm',
  konsonantModus: 'einzel',
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
  endkonsonant: string,
  schreibweise: SilbenteppichConfig['schreibweise']
): string[] {
  const silben: string[] = [];

  for (const vokal of vokale) {
    let silbe: string;

    if (silbenstruktur === 'offen') {
      // Offene Silben: la, le, li, lo, lu
      silbe = konsonant + vokal;
    } else if (silbenstruktur === 'vokal-konsonant') {
      // VK-Silben: am, em, im, om, um
      silbe = vokal + konsonant;
    } else {
      // Geschlossene Silben: lam, lem, lim, lom, lum
      silbe = konsonant + vokal + endkonsonant;
    }

    silben.push(formatText(silbe, schreibweise));
  }

  return silben;
}

function getKonsonantenMitRekursion(
  startbuchstabe: string,
  seitenausrichtung: string,
  zeilenReihenfolge: string,
  konsonantenliste: string[]
): string[] {
  // Zielanzahl Zeilen je nach Format
  const zielZeilen = seitenausrichtung === 'quer' ? ZEILEN_QUERFORMAT : ZEILEN_HOCHFORMAT;

  // Wenn kein Startbuchstabe ausgewählt wurde, wähle zufällige Konsonanten
  if (!startbuchstabe) {
    const result: string[] = [];
    const verfügbareKonsonanten = [...konsonantenliste];

    for (let i = 0; i < zielZeilen; i++) {
      const randomIndex = Math.floor(Math.random() * verfügbareKonsonanten.length);
      result.push(verfügbareKonsonanten[randomIndex]);
      // Entferne den ausgewählten Konsonanten, um Duplikate zu vermeiden
      verfügbareKonsonanten.splice(randomIndex, 1);
    }

    // Bei alphabetischer Reihenfolge sortieren wir die zufällig ausgewählten Konsonanten
    if (zeilenReihenfolge === 'alphabetisch') {
      result.sort();
    }

    return result;
  }

  // Bisherige Logik für den Fall mit Startbuchstabe
  const endIndex = konsonantenliste.indexOf(startbuchstabe.toLowerCase());

  // Wenn Startbuchstabe nicht gefunden, verwende 'l' als Standard (oder ersten Eintrag)
  const fallbackIndex = konsonantenliste.indexOf('l');
  const gültigerEndIndex = endIndex === -1
    ? (fallbackIndex === -1 ? 0 : fallbackIndex)
    : endIndex;

  // Berechne den Startindex: gehe zielZeilen-1 Schritte zurück vom Endbuchstaben
  let startIndex = gültigerEndIndex - (zielZeilen - 1);

  // Wenn der Startindex negativ wäre, verschiebe ihn zyklisch
  if (startIndex < 0) {
    startIndex = konsonantenliste.length + startIndex;
  }

  // Sammle die Konsonanten
  const result: string[] = [];
  let currentIndex = startIndex;

  for (let i = 0; i < zielZeilen; i++) {
    result.push(konsonantenliste[currentIndex % konsonantenliste.length]);
    currentIndex++;
  }

  return result;
}

export function generateSilbenteppich(config: SilbenteppichConfig): SilbenteppichData {
  const vokale = config.umlaute
    ? [...STANDARD_VOKALE, ...UMLAUTE]
    : [...STANDARD_VOKALE];

  // Wähle die Konsonantenliste basierend auf dem Modus
  const konsonantenliste = config.konsonantModus === 'cluster'
    ? KONSONANTEN_CLUSTER
    : STANDARD_KONSONANTEN;

  // Verwende die Funktion mit Rekursion und der passenden Konsonantenliste
  const konsonanten = getKonsonantenMitRekursion(
    config.startbuchstabe,
    config.seitenausrichtung,
    config.zeilenReihenfolge,
    konsonantenliste
  );

  const zeilen: SilbenteppichZeile[] = konsonanten.map(konsonant => {
    const aktuelleVokale = config.vokalReihenfolge === 'zufall'
      ? shuffleArray(vokale)
      : vokale;

    const silben = generateSilbenForKonsonant(
      konsonant,
      aktuelleVokale,
      config.silbenstruktur,
      config.endkonsonant,
      config.schreibweise
    );

    return {
      konsonant: formatText(konsonant, config.schreibweise),
      silben
    };
  });

  // Bei "Kein Startbuchstabe" wurde die Reihenfolge bereits in getKonsonantenMitRekursion behandelt
  const sortierteZeilen = !config.startbuchstabe
    ? zeilen
    : (config.zeilenReihenfolge === 'zufall'
      ? shuffleArray(zeilen)
      : zeilen);

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
