import { describe, expect, it } from 'vitest';
import { APP_IDS, APPS, getApp } from './apps.ts';

describe('APPS', () => {
	it('has one entry per id, in the same order', () => {
		expect(APPS.map((app) => app.id)).toEqual([...APP_IDS]);
	});

	it('gives every app a way to get it, its docs and its code on GitHub', () => {
		for (const app of APPS) {
			expect(app.get.length).toBeGreaterThan(0);
			expect(app.more.map((link) => link.id)).toEqual(['docs', 'github']);
			expect(app.more[1].href).toBe(`https://github.com/acerola-labs/acerola-${app.id}`);
		}
	});

	it('gives every link an action and the logo of where it goes', () => {
		for (const app of APPS) {
			expect(app.logo.startsWith('https://cdn.acerola.app/brand/logo/')).toBe(true);
			for (const link of [...app.get, ...app.more]) {
				expect(link.action({}, { locale: 'pt-br' }).length).toBeGreaterThan(0);
				expect('component' in link.logo || link.logo.src.startsWith('https://')).toBe(true);
			}
		}
	});

	it('only links to https addresses', () => {
		for (const link of APPS.flatMap((app) => [...app.get, ...app.more])) {
			expect(link.href.startsWith('https://')).toBe(true);
		}
	});

	it('has text for every message in both locales', () => {
		for (const app of APPS) {
			for (const locale of ['pt-br', 'en'] as const) {
				for (const message of [
					app.name,
					app.kind,
					app.tagline,
					app.lead,
					...app.features.map((feature) => feature.text)
				]) {
					expect(message({}, { locale }).length).toBeGreaterThan(0);
				}
			}
		}
	});
});

describe('getApp', () => {
	it('finds an app by id and nothing for an unknown one', () => {
		expect(getApp('reader')?.id).toBe('reader');
		expect(getApp('nope')).toBeUndefined();
	});
});
