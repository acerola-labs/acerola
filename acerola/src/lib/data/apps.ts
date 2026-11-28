import Bell from '@lucide/svelte/icons/bell';
import Code from '@lucide/svelte/icons/code';
import Database from '@lucide/svelte/icons/database';
import Globe from '@lucide/svelte/icons/globe';
import LayoutGrid from '@lucide/svelte/icons/layout-grid';
import Library from '@lucide/svelte/icons/library';
import ListChecks from '@lucide/svelte/icons/list-checks';
import Network from '@lucide/svelte/icons/network';
import Package from '@lucide/svelte/icons/package';
import Palette from '@lucide/svelte/icons/palette';
import RefreshCw from '@lucide/svelte/icons/refresh-cw';
import ScanEye from '@lucide/svelte/icons/scan-eye';
import type { Component } from 'svelte';
import AndroidLogo from '#lib/assets/icons/android.svg?component';
import GithubLogo from '#lib/assets/icons/github.svg?component';
import MicrosoftStoreLogo from '#lib/assets/icons/microsoft-store.svg?component';
import { m } from '#lib/paraglide/messages.js';
import type { Locale } from '#lib/paraglide/runtime.js';
import { brandUrl } from '#lib/utils/brand.util.ts';
import type { AppId } from './app-ids.ts';

export { APP_IDS, type AppId } from './app-ids.ts';

/**
 * A message with no parameters: called at render time it follows the page's locale; llms.txt
 * passes the locale of the file it writes.
 */
export type Message = (inputs?: Record<string, never>, options?: { locale?: Locale }) => string;

/**
 * The logo of where a link goes: a third-party mark as a .svg file (src/lib/assets/icons,
 * imported with ?component) or an Acerola logo from the brand CDN. Never recolored.
 */
export type Logo = { component: Component } | { src: string };

export type AppLink = {
	/** Stable key, also the anchor of the link card. */
	id: string;
	href: string;
	logo: Logo;
	title: Message;
	text: Message;
	/** The verb at the bottom of the card ("Baixar o APK"). */
	action: Message;
};

export type AppFeature = { icon: Component; text: Message };

export type App = {
	id: AppId;
	/** The app's own logo, from the brand CDN. */
	logo: string;
	name: Message;
	kind: Message;
	tagline: Message;
	lead: Message;
	/** Told apart by the icon, all in the same tone: a list item has no meaning of its own. */
	features: AppFeature[];
	/** Where people get it: downloads or the site itself. The first one is the main action. */
	get: AppLink[];
	/** Docs and code. */
	more: AppLink[];
};

const GITHUB = 'https://github.com/acerola-labs';

const LOGO = {
	reader: brandUrl('/logo/acerola-logo-foreground.svg'),
	sync: brandUrl('/logo/acerola-logo-sync.svg'),
	brand: brandUrl('/logo/acerola-logo-foreground.svg')
};

const docs = (href: string, logo: string): AppLink => ({
	id: 'docs',
	href,
	logo: { src: logo },
	title: m['app.links.docs.title'],
	text: m['app.links.docs.text'],
	action: m['app.links.docs.action']
});
const github = (repo: string): AppLink => ({
	id: 'github',
	href: `${GITHUB}/${repo}`,
	logo: { component: GithubLogo },
	title: m['app.links.github.title'],
	text: m['app.links.github.text'],
	action: m['app.links.github.action']
});
const releases = (repo: string): AppLink => ({
	id: 'releases',
	href: `${GITHUB}/${repo}/releases`,
	logo: { component: GithubLogo },
	title: m['app.links.releases.title'],
	text: m['app.links.releases.text'],
	action: m['app.links.releases.action']
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
		logo: LOGO.reader,
		name: m['apps.reader.name'],
		kind: m['apps.reader.kind'],
		tagline: m['apps.reader.tagline'],
		lead: m['apps.reader.lead'],
		features: [
			{ icon: Library, text: m['apps.reader.features.library'] },
			{ icon: RefreshCw, text: m['apps.reader.features.sync'] },
			{ icon: Network, text: m['apps.reader.features.relay'] },
			{ icon: Code, text: m['apps.reader.features.open'] }
		],
		get: [
			{
				id: 'apk',
				href: 'https://docs.reader.acerola.app/api/apk-latest',
				logo: { component: AndroidLogo },
				title: m['app.links.apk.title'],
				text: m['app.links.apk.text'],
				action: m['app.links.apk.action']
			},
			{
				id: 'store',
				href: 'https://apps.microsoft.com/store/detail/9N9SL3P7F8GC?cid=DevShareMCLPCS',
				logo: { component: MicrosoftStoreLogo },
				title: m['app.links.store.title'],
				text: m['app.links.store.text'],
				action: m['app.links.store.action']
			},
			releases('acerola-reader')
		],
		more: [docs('https://docs.reader.acerola.app', LOGO.reader), github('acerola-reader')]
	},
	{
		id: 'sync',
		logo: LOGO.sync,
		name: m['apps.sync.name'],
		kind: m['apps.sync.kind'],
		tagline: m['apps.sync.tagline'],
		lead: m['apps.sync.lead'],
		features: [
			{ icon: ScanEye, text: m['apps.sync.features.tracking'] },
			{ icon: Globe, text: m['apps.sync.features.sites'] },
			{ icon: Database, text: m['apps.sync.features.mirror'] },
			{ icon: Bell, text: m['apps.sync.features.notify'] }
		],
		get: [
			{
				// The extension ships in the GitHub Releases (Chrome and Firefox zips).
				id: 'extension',
				href: `${GITHUB}/acerola-sync/releases`,
				logo: { component: GithubLogo },
				title: m['app.links.extension.title'],
				text: m['app.links.extension.text'],
				action: m['app.links.extension.action']
			}
		],
		// No docs site yet: the docs live in the repository.
		more: [docs(`${GITHUB}/acerola-sync#readme`, LOGO.sync), github('acerola-sync')]
	},
	{
		id: 'brand',
		logo: LOGO.brand,
		name: m['apps.brand.name'],
		kind: m['apps.brand.kind'],
		tagline: m['apps.brand.tagline'],
		lead: m['apps.brand.lead'],
		features: [
			{ icon: Palette, text: m['apps.brand.features.tokens'] },
			{ icon: LayoutGrid, text: m['apps.brand.features.components'] },
			{ icon: ListChecks, text: m['apps.brand.features.standard'] },
			{ icon: Package, text: m['apps.brand.features.kit'] }
		],
		get: [
			{
				id: 'site',
				href: 'https://brand.acerola.app/',
				logo: { src: LOGO.brand },
				title: m['app.links.site.title'],
				text: m['app.links.site.text'],
				action: m['app.links.site.action']
			},
			{
				id: 'kit',
				href: 'https://brand.acerola.app/#downloads',
				logo: { src: LOGO.brand },
				title: m['app.links.kit.title'],
				text: m['app.links.kit.text'],
				action: m['app.links.kit.action']
			}
		],
		more: [docs(`${GITHUB}/acerola-brand/tree/main/docs`, LOGO.brand), github('acerola-brand')]
	}
];

export const GITHUB_URL = GITHUB;

export function getApp(id: string): App | undefined {
	return APPS.find((app) => app.id === id);
}
