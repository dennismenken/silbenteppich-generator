import { existsSync, writeFileSync } from 'fs';

const legalFiles = {
  imprint: 'static/legal/imprint.md',
  privacy: 'static/legal/privacy.md'
};

const availability = {};

for (const [key, path] of Object.entries(legalFiles)) {
  availability[key] = existsSync(path);
  console.log(`${key}: ${availability[key] ? 'Found' : 'Missing'} - ${path}`);
}

const outputPath = 'src/lib/legal-availability.json';
writeFileSync(outputPath, JSON.stringify(availability, null, 2));

console.log(`Legal files availability written to ${outputPath}`);
console.log('Result:', availability);
