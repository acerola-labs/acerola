import { describe, expect, it } from 'vitest';
import { APP_IDS } from '#lib/data/app-ids.ts';
import { GET } from './+server';

const SITE = 'https://acerola.app';

const bodyAt = async (path: string) => {
	const event = { url: new URL(`${SITE}${path}`) } as unknown as Parameters<typeof GET>[0];
	const response = await GET(event);
	return { type: response.headers.get('Content-Type'), body: await response.text() };
};

const locs = (body: string) => [...body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

describe('GET /sitemap.xml', () => {
	it('is an index of one sitemap per locale', async () => {
		const { type, body } = await bodyAt('/sitemap.xml');

		expect(type).toBe('application/xml');
		expect(body).toContain('<sitemapindex');
		expect(locs(body)).toEqual([`${SITE}/pt-br/sitemap.xml`, `${SITE}/en/sitemap.xml`]);
	});

	it('lists the home and every app under the locale prefix', async () => {
		const { body } = await bodyAt('/en/sitemap.xml');

		expect(locs(body)).toEqual([`${SITE}/en/`, ...APP_IDS.map((app) => `${SITE}/en/${app}/`)]);
	});

	it('links every page to both locales and to the path with no prefix', async () => {
		const { body } = await bodyAt('/pt-br/sitemap.xml');

		expect(body).toContain(`hreflang="en" href="${SITE}/en/reader/"`);
		expect(body).toContain(`hreflang="pt-br" href="${SITE}/pt-br/reader/"`);
		expect(body).toContain(`hreflang="x-default" href="${SITE}/reader/"`);
	});
});
