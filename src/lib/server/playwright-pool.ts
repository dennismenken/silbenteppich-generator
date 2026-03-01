import type { Browser } from 'playwright-chromium';

let browser: Browser | null = null;
let browserPromise: Promise<Browser> | null = null;
let activeJobs = 0;
const MAX_CONCURRENT = 3;

async function launchBrowser(): Promise<Browser> {
	const { chromium } = await import('playwright-chromium');
	const instance = await chromium.launch({
		args: [
			'--no-sandbox',
			'--disable-setuid-sandbox',
			'--disable-dev-shm-usage',
			'--font-render-hinting=none'
		]
	});

	instance.on('disconnected', () => {
		browser = null;
		browserPromise = null;
	});

	return instance;
}

export async function getBrowser(): Promise<Browser> {
	if (browser && browser.isConnected()) {
		return browser;
	}

	if (browserPromise) {
		return browserPromise;
	}

	browserPromise = launchBrowser().then((b) => {
		browser = b;
		browserPromise = null;
		return b;
	}).catch((err) => {
		browserPromise = null;
		throw err;
	});

	return browserPromise;
}

export async function acquireSlot(): Promise<void> {
	while (activeJobs >= MAX_CONCURRENT) {
		await new Promise((resolve) => setTimeout(resolve, 100));
	}
	activeJobs++;
}

export function releaseSlot(): void {
	activeJobs = Math.max(0, activeJobs - 1);
}

export async function closeBrowser(): Promise<void> {
	if (browser) {
		await browser.close().catch(() => {});
		browser = null;
		browserPromise = null;
	}
}
