import { describe, expect, it } from 'vitest';
import { cookieDomain, readCookie } from './preference.util.ts';

describe('readCookie', () => {
	it('finds a cookie among others', () => {
		expect(readCookie('acerola-theme', 'a=1; acerola-theme=light; b=2')).toBe('light');
	});

	it('does not match a cookie whose name only ends the same', () => {
		expect(readCookie('acerola-theme', 'x-acerola-theme=light')).toBeUndefined();
	});
});

describe('cookieDomain', () => {
	it('shares the cookies across acerola.app and its subdomains', () => {
		expect(cookieDomain('acerola.app')).toBe('acerola.app');
		expect(cookieDomain('brand.acerola.app')).toBe('acerola.app');
	});

	it('keeps them on the exact host elsewhere', () => {
		expect(cookieDomain('localhost')).toBeUndefined();
		expect(cookieDomain('notacerola.app')).toBeUndefined();
	});
});
