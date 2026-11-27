import BookOpen from '@lucide/svelte/icons/book-open';
import Palette from '@lucide/svelte/icons/palette';
import RefreshCw from '@lucide/svelte/icons/refresh-cw';
import type { Component } from 'svelte';
import { m } from '#lib/paraglide/messages.js';
import type { Locale } from '#lib/paraglide/runtime.js';
import type { AppId } from './app-ids.ts';

export { APP_IDS, type AppId } from './app-ids.ts';

/**
 * A message with no parameters: called at render time it follows the page's locale; llms.txt
 * passes the locale of the file it writes.
 */
export type Message = (inputs?: Record<string, never>, options?: { locale?: Locale }) => string;

export type AppLink = {
	/** Stable key, also the anchor of the link card. */
	id: string;
	href: string;
	title: Message;
	text: Message;
};

export type App = {
	id: AppId;
	icon: Component;
	name: Message;
	kind: Message;
	tagline: Message;
	lead: Message;
	features: Message[];
	/** Where people get it: downloads or the site itself. The first one is the main action. */
	get: AppLink[];
	/** Docs and code. */
	more: AppLink[];
};

const GITHUB = 'https://github.com/acerola-labs';

const docs = (href: string): AppLink => ({
	id: 'docs',
	href,
	title: m['app.links.docs.title'],
	text: m['app.links.docs.text']
});
const github = (repo: string): AppLink => ({
	id: 'github',
	href: `${GITHUB}/${repo}`,
	title: m['app.links.github.title'],
	text: m['app.links.github.text']
});
const releases = (repo: string): AppLink => ({
	id: 'releases',
	href: `${GITHUB}/${repo}/releases`,
	title: m['app.links.releases.title'],
	text: m['app.links.releases.text']
});

/**
 * Every app in the hub. Docs and downloads follow what each app already publishes (the reader's
 * docs site serves the latest APK and links the Microsoft Store); with no link of its own, the
 * GitHub repository. The other sites live on acerola.app too, so the shared cookie opens them in
 * the visitor's locale and theme.
 */
export const APPS: App[] = [
	{
		id: 'reader',
		icon: BookOpen,
		name: m['apps.reader.name'],
		kind: m['apps.reader.kind'],
		tagline: m['apps.reader.tagline'],
		lead: m['apps.reader.lead'],
		features: [
			m['apps.reader.features.library'],
			m['apps.reader.features.sync'],
			m['apps.reader.features.relay'],
			m['apps.reader.features.open']
		],
		get: [
			{
				id: 'apk',
				href: 'https://docs.reader.acerola.app/api/apk-latest',
				title: m['app.links.apk.title'],
				text: m['app.links.apk.text']
			},
			{
				id: 'store',
				href: 'https://apps.microsoft.com/store/detail/9N9SL3P7F8GC?cid=DevShareMCLPCS',
				title: m['app.links.store.title'],
				text: m['app.links.store.text']
			},
			releases('acerola-reader')
		],
		more: [docs('https://docs.reader.acerola.app'), github('acerola-reader')]
	},
	{
		id: 'sync',
		icon: RefreshCw,
		name: m['apps.sync.name'],
		kind: m['apps.sync.kind'],
		tagline: m['apps.sync.tagline'],
		lead: m['apps.sync.lead'],
		features: [
			m['apps.sync.features.tracking'],
			m['apps.sync.features.sites'],
			m['apps.sync.features.mirror'],
			m['apps.sync.features.notify']
		],
		get: [
			{
				id: 'extension',
				href: `${GITHUB}/acerola-sync/releases`,
				title: m['app.links.extension.title'],
				text: m['app.links.extension.text']
			}
		],
		// No docs site yet: the docs live in the repository.
		more: [docs(`${GITHUB}/acerola-sync#readme`), github('acerola-sync')]
	},
	{
		id: 'brand',
		icon: Palette,
		name: m['apps.brand.name'],
		kind: m['apps.brand.kind'],
		tagline: m['apps.brand.tagline'],
		lead: m['apps.brand.lead'],
		features: [
			m['apps.brand.features.tokens'],
			m['apps.brand.features.components'],
			m['apps.brand.features.standard'],
			m['apps.brand.features.kit']
		],
		get: [
			{
				id: 'site',
				href: 'https://brand.acerola.app/',
				title: m['app.links.site.title'],
				text: m['app.links.site.text']
			},
			{
				id: 'kit',
				href: 'https://brand.acerola.app/#downloads',
				title: m['app.links.kit.title'],
				text: m['app.links.kit.text']
			}
		],
		more: [docs(`${GITHUB}/acerola-brand/tree/main/docs`), github('acerola-brand')]
	}
];

export const GITHUB_URL = GITHUB;

export function getApp(id: string): App | undefined {
	return APPS.find((app) => app.id === id);
}
