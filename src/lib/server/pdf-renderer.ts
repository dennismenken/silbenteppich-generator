import { generateSilbenteppich, validateConfig, ZEILEN_QUERFORMAT, ZEILEN_HOCHFORMAT } from '$lib/silbenteppich';
import type { SilbenteppichConfig, SilbenteppichData } from '$lib/types';
// Vite inlines this as a string at build time
import pdfCss from '$lib/server/pdf.css?raw';

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

function getSilbenstrukturLabel(config: SilbenteppichConfig): string {
	switch (config.silbenstruktur) {
		case 'offen':
			return 'Offene Silben';
		case 'geschlossen':
			return `Geschlossene Silben (Stopper: ${config.endkonsonant})`;
		case 'vokal-konsonant':
			return 'VK-Silben (Vokal-Konsonant)';
		default:
			return '';
	}
}

function getStartbuchstabeLabel(config: SilbenteppichConfig): string {
	return config.startbuchstabe
		? `Ab ${config.startbuchstabe.toUpperCase()}`
		: 'Zufaellig';
}

function buildGridHtml(data: SilbenteppichData): string {
	const config = data.config;
	const isLandscape = config.seitenausrichtung === 'quer';
	const isCluster = config.konsonantModus === 'cluster';
	const maxZeilen = isLandscape ? ZEILEN_QUERFORMAT : ZEILEN_HOCHFORMAT;

	const gridClasses = [
		'print-grid',
		isLandscape ? 'landscape' : '',
		config.umlaute ? 'mit-umlaute' : '',
		config.silbenstruktur === 'geschlossen' ? 'geschlossen' : '',
		isCluster ? 'cluster-mode' : ''
	].filter(Boolean).join(' ');

	const rows = data.zeilen.slice(0, maxZeilen).map(zeile => {
		const rowClasses = ['print-row', isCluster ? 'cluster-mode' : ''].filter(Boolean).join(' ');

		const silbenHtml = zeile.silben
			.map(silbe => `<div class="print-silbe">${silbe}</div>`)
			.join('\n        ');

		return `
      <div class="${rowClasses}">
        <div class="print-konsonant">${zeile.konsonant}</div>
        <div class="print-silben-container">
        ${silbenHtml}
        </div>
      </div>`;
	}).join('\n');

	return `<div class="${gridClasses}">${rows}\n  </div>`;
}

export function buildPdfHtml(config: SilbenteppichConfig, baseUrl: string): string {
	const validatedConfig = validateConfig(config);
	const data = generateSilbenteppich(validatedConfig);
	const isLandscape = validatedConfig.seitenausrichtung === 'quer';
	const isCluster = validatedConfig.konsonantModus === 'cluster';

	const fontClass = validatedConfig.schriftart === 'andika' ? 'font-andika' : 'font-geist';

	const silbenstrukturLabel = getSilbenstrukturLabel(validatedConfig);
	const startbuchstabeLabel = getStartbuchstabeLabel(validatedConfig);

	const configInfoParts = [
		silbenstrukturLabel,
		startbuchstabeLabel,
		isLandscape ? 'Querformat' : 'Hochformat',
		validatedConfig.schriftart === 'geist' ? 'Geist' : 'Andika'
	];
	if (isCluster) configInfoParts.push('Cluster');
	const configInfo = configInfoParts.join(' | ');

	const gridHtml = buildGridHtml(data);

	return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <style>
    @font-face {
      font-family: 'Geist';
      src: url('${baseUrl}/fonts/Geist-Regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: 'Geist';
      src: url('${baseUrl}/fonts/Geist-Bold.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
    }
    @font-face {
      font-family: 'Andika';
      src: url('${baseUrl}/fonts/Andika-Regular.woff2') format('woff2');
      font-weight: 400;
      font-style: normal;
    }
    @font-face {
      font-family: 'Andika';
      src: url('${baseUrl}/fonts/Andika-Bold.woff2') format('woff2');
      font-weight: 700;
      font-style: normal;
    }

    ${pdfCss}
  </style>
</head>
<body class="${fontClass}">
  <div class="print-header">
    <h1>Silbenteppich</h1>
    <div class="config-info">${configInfo}</div>
  </div>
  ${gridHtml}
</body>
</html>`;
}
