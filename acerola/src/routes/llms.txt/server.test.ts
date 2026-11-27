import { describe, expect, it } from 'vitest';
import { APPS } from '#lib/data/apps.ts';
import { GET } from './+server';

const SITE = 'https://acerola.app';

const textAt = async (path: string) => {
	const event = { url: new URL(`${SITE}${path}`) } as unknown as Parameters<typeof GET>[0];
	return (await GET(event)).text();
};

describe('GET /llms.txt', () => {
	it('is an index of the per-locale files', async () => {
		const body = await textAt('/llms.txt');

		expect(body).toContain(`(${SITE}/pt-br/llms.txt)`);
		expect(body).toContain(`(${SITE}/en/llms.txt)`);
	});

	it('describes every app in its locale, with its page and links', async () => {
		const body = await textAt('/en/llms.txt');

		for (const app of APPS) {
			expect(body).toContain(`[${app.name({}, { locale: 'en' })}](${SITE}/en/${app.id}/)`);
			for (const link of [...app.get, ...app.more]) expect(body).toContain(`(${link.href})`);
		}
	});

	it('writes each file in its own locale', async () => {
		expect(await textAt('/pt-br/llms.txt')).toContain(APPS[0].lead({}, { locale: 'pt-br' }));
		expect(await textAt('/en/llms.txt')).toContain(APPS[0].lead({}, { locale: 'en' }));
	});
});
