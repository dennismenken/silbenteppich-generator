import { closeBrowser } from '$lib/server/playwright-pool';

async function shutdown() {
	console.log('Shutting down Playwright browser...');
	await closeBrowser();
	process.exit(0);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
