import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import type { SilbenteppichConfig } from '$lib/types';
import { validateConfig } from '$lib/silbenteppich';
import { buildPdfHtml } from '$lib/server/pdf-renderer';
import { getBrowser, acquireSlot, releaseSlot } from '$lib/server/playwright-pool';

export const POST: RequestHandler = async ({ request, url }) => {
	let config: SilbenteppichConfig;

	try {
		config = await request.json();
	} catch {
		return json({ error: 'Invalid JSON' }, { status: 400 });
	}

	try {
		config = validateConfig(config);
	} catch {
		return json({ error: 'Invalid configuration' }, { status: 400 });
	}

	const isLandscape = config.seitenausrichtung === 'quer';

	// Use localhost for font URLs (works in containers too)
	const port = url.port || (url.protocol === 'https:' ? '443' : '3000');
	const baseUrl = `http://localhost:${port}`;

	const html = buildPdfHtml(config, baseUrl);

	await acquireSlot();
	try {
		const browser = await getBrowser();
		const page = await browser.newPage();

		try {
			// Set viewport to match A4 at 96dpi minus margins
			const viewport = isLandscape
				? { width: 1032, height: 703 }
				: { width: 703, height: 1032 };
			await page.setViewportSize(viewport);

			await page.setContent(html, { waitUntil: 'networkidle' });
			await page.emulateMedia({ media: 'print' });

			// Wait for fonts to load
			await page.evaluate(() => document.fonts.ready);

			const pdfBuffer = await page.pdf({
				format: 'A4',
				landscape: isLandscape,
				margin: {
					top: '12mm',
					right: '12mm',
					bottom: '12mm',
					left: '12mm'
				},
				printBackground: true
			});

			return new Response(new Uint8Array(pdfBuffer), {
				status: 200,
				headers: {
					'Content-Type': 'application/pdf',
					'Content-Disposition': `attachment; filename="silbenteppich-${config.silbenstruktur}-${config.seitenausrichtung}.pdf"`
				}
			});
		} finally {
			await page.close();
		}
	} catch (err) {
		console.error('PDF generation failed:', err);
		return json(
			{ error: 'PDF generation failed' },
			{ status: 500 }
		);
	} finally {
		releaseSlot();
	}
};
