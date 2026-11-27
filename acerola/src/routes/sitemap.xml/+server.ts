import { APP_IDS } from '#lib/data/app-ids.ts';
import { extractLocaleFromUrl, localizeHref, locales } from '#lib/paraglide/runtime.js';
import type { RequestHandler } from './$types';

/** Every page: the home and one per app. */
const PAGES = ['/', ...APP_IDS.map((app) => `/${app}/`)];

export const prerender = true;
export const trailingSlash = 'never';

const xml = (body: string) =>
	new Response(`<?xml version="1.0" encoding="UTF-8"?>\n${body}`, {
		headers: { 'Content-Type': 'application/xml' }
	});

/**
 * /sitemap.xml is the index of the per-locale sitemaps (/pt-br/sitemap.xml, /en/sitemap.xml);
 * each one lists the pages in its locale, with hreflang links to the other locales and
 * x-default on the path with no prefix (it follows the visitor's acerola-locale cookie).
 */
export const GET: RequestHandler = ({ url }) => {
	const locale = extractLocaleFromUrl(url);

	if (!locale) {
		const maps = locales
			.map(
				(l) =>
					`\t<sitemap><loc>${__SITE_URL__}${localizeHref('/sitemap.xml', { locale: l })}</loc></sitemap>`
			)
			.join('\n');
		return xml(
			`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${maps}\n</sitemapindex>\n`
		);
	}

	const urls = PAGES.map((path) => {
		const alternates = [
			...locales.map(
				(l) =>
					`\t\t<xhtml:link rel="alternate" hreflang="${l}" href="${__SITE_URL__}${localizeHref(path, { locale: l })}" />`
			),
			`\t\t<xhtml:link rel="alternate" hreflang="x-default" href="${__SITE_URL__}${path}" />`
		].join('\n');
		return `\t<url>\n\t\t<loc>${__SITE_URL__}${localizeHref(path, { locale })}</loc>\n${alternates}\n\t</url>`;
	}).join('\n');
	return xml(
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}\n</urlset>\n`
	);
};
