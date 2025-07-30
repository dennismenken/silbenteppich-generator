import { existsSync, writeFileSync } from 'fs';
import { join } from 'path';

const legalFiles = {
  imprint: 'public/legal/imprint.md',
  privacy: 'public/legal/privacy.md'
};

const availability = {};

for (const [key, path] of Object.entries(legalFiles)) {
  availability[key] = existsSync(path);
  console.log(`${key}: ${availability[key] ? 'Found' : 'Missing'} - ${path}`);
}

// Schreibe das Ergebnis in eine JSON-Datei
const outputPath = 'src/lib/legal-availability.json';
writeFileSync(outputPath, JSON.stringify(availability, null, 2));

console.log(`Legal files availability written to ${outputPath}`);
console.log('Result:', availability);