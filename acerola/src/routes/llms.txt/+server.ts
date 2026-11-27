import { APPS, GITHUB_URL, type Message } from '#lib/data/apps.ts';
import { m } from '#lib/paraglide/messages.js';
import {
	baseLocale,
	extractLocaleFromUrl,
	localizeHref,
	locales,
	type Locale
} from '#lib/paraglide/runtime.js';
import type { RequestHandler } from './$types';

export const prerender = true;
export const trailingSlash = 'never';

const text = (body: string) =>
	new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });

const LOCALE_NAMES: Record<Locale, string> = { 'pt-br': 'Português', en: 'English' };

/**
 * /llms.txt is the index of the per-locale files (/pt-br/llms.txt, /en/llms.txt); each one
 * describes Acerola and every app in its locale, with its page, docs and code (llmstxt.org).
 * The text comes from the messages.
 */
export const GET: RequestHandler = ({ url }) => {
	const locale = extractLocaleFromUrl(url);
	const shown = locale ?? baseLocale;
	const head = [
		`# ${m['site.title']({}, { locale: shown })}`,
		'',
		`> ${m['site.description']({}, { locale: shown })}`,
		'',
		`- GitHub: ${GITHUB_URL}`,
		'- MPL-2.0',
		''
	].join('\n');

	if (!locale) {
		const files = locales
			.map(
				(l) =>
					`- [${LOCALE_NAMES[l]}](${__SITE_URL__}${localizeHref('/llms.txt', { locale: l })})`
			)
			.join('\n');
		return text(`${head}\n## ${m['llms.locales']({}, { locale: shown })}\n\n${files}\n`);
	}

	// Messages are read in this file's locale, whatever locale the request rendered in.
	const read = (message: Message) => message({}, { locale });

	const apps = APPS.map((app) => {
		const page = `${__SITE_URL__}${localizeHref(`/${app.id}/`, { locale })}`;
		const links = [...app.get, ...app.more].map(
			(link) => `  - [${read(link.title)}](${link.href}): ${read(link.text)}`
		);
		return [`- [${read(app.name)}](${page}): ${read(app.lead)}`, ...links].join('\n');
	}).join('\n');
	return text(`${head}\n## ${m['llms.apps']({}, { locale })}\n\n${apps}\n`);
};
