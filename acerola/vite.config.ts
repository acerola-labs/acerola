import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vitest/config';
import adapter from '@sveltejs/adapter-static';
import { sveltekit } from '@sveltejs/kit/vite';
import { APP_IDS } from './src/lib/data/app-ids.ts';
import { paraglide } from './paraglide.config.ts';

const LOCALES = paraglide.urlPatterns[0].localized.map(([locale]) => locale);

/** Public address of the site, for the absolute links in sitemap.xml, llms.txt and hreflang. */
const siteUrl = (process.env.SITE_URL || 'https://acerola.app').replace(/\/+$/, '');

export default defineConfig({
	define: { __SITE_URL__: JSON.stringify(siteUrl) },
	plugins: [
		tailwindcss(),
		sveltekit({
			compilerOptions: {
				// Runes across the project, except in libraries. Can go away with Svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// fallback: the server's Caddy serves 404.html for any missing address; it boots the app,
			// which renders +error.svelte with the right status.
			adapter: adapter({
				pages: 'build',
				assets: 'build',
				fallback: '404.html',
				strict: true
			}),
			// Absolute paths: the locale prefix (/pt-br/…, /en/…) needs a fixed root, and paraglide's
			// localizeHref() turns a relative path into a full URL.
			paths: { relative: false },
			prerender: {
				// Each locale under its prefix, with every app page, its sitemap and llms.txt
				// (paraglide.config.ts): the switch between locales is a button, not a link.
				entries: [
					'*',
					...LOCALES.flatMap((locale): `/${string}`[] => [
						`/${locale}/`,
						...APP_IDS.map((app): `/${string}` => `/${locale}/${app}/`),
						`/${locale}/sitemap.xml`,
						`/${locale}/llms.txt`
					])
				]
			}
		})
	],
	test: {
		include: ['src/**/*.test.ts'],
		environment: 'node'
	}
});
