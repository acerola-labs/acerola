<script lang="ts">
	import Code from '@lucide/svelte/icons/code';
	import Lightbulb from '@lucide/svelte/icons/lightbulb';
	import Network from '@lucide/svelte/icons/network';
	import Palette from '@lucide/svelte/icons/palette';
	import Server from '@lucide/svelte/icons/server';
	import ShieldCheck from '@lucide/svelte/icons/shield-check';
	import { resolve } from '$app/paths';
	import AcerolaAppCard from '#lib/components/acerola-app-card/acerola-app-card.svelte';
	import AcerolaHero from '#lib/components/acerola-hero/acerola-hero.svelte';
	import AcerolaSection from '#lib/components/acerola-section/acerola-section.svelte';
	import { APPS, GITHUB_URL } from '#lib/data/apps.ts';
	import { m } from '#lib/paraglide/messages.js';
	import { localizeHref } from '#lib/paraglide/runtime.js';
	import { brandUrl } from '#lib/utils/brand.util.ts';

	const tape = $derived([
		[
			m['hero.tape.content.manga'](),
			m['hero.tape.content.comics'](),
			m['hero.tape.content.anime'](),
			m['hero.tape.content.chapter'](),
			m['hero.tape.content.episode'](),
			m['hero.tape.content.list']()
		],
		[
			m['hero.tape.app.selfhost'](),
			m['hero.tape.app.p2p'](),
			m['hero.tape.app.local'](),
			m['hero.tape.app.open'](),
			m['hero.tape.app.noaccount'](),
			m['hero.tape.app.platforms']()
		]
	]);

	const principles = [
		{
			id: 'selfhost',
			icon: Server,
			title: m['home.principles.selfhost.title'],
			text: m['home.principles.selfhost.text']
		},
		{
			id: 'data',
			icon: ShieldCheck,
			title: m['home.principles.data.title'],
			text: m['home.principles.data.text']
		},
		{
			id: 'p2p',
			icon: Network,
			title: m['home.principles.p2p.title'],
			text: m['home.principles.p2p.text']
		},
		{
			id: 'brand',
			icon: Palette,
			title: m['home.principles.brand.title'],
			text: m['home.principles.brand.text']
		},
		{
			id: 'open',
			icon: Code,
			title: m['home.principles.open.title'],
			text: m['home.principles.open.text']
		}
	];

	const ideas = [
		{ id: 'tmdb', title: m['home.ideas.tmdb.title'], text: m['home.ideas.tmdb.text'] },
		{ id: 'video', title: m['home.ideas.video.title'], text: m['home.ideas.video.text'] },
		{
			id: 'platforms',
			title: m['home.ideas.platforms.title'],
			text: m['home.ideas.platforms.text']
		},
		{ id: 'docs', title: m['home.ideas.docs.title'], text: m['home.ideas.docs.text'] }
	];
</script>

<svelte:head>
	<title>{m['site.title']()}</title>
</svelte:head>

<AcerolaHero
	data={{
		word: 'Acerola',
		mascot: brandUrl('/mascot/acerola-mascot.svg'),
		tape,
		next: 'apps',
		scroll: m['hero.scroll']()
	}}
	ui={{
		stickers: [
			{ text: m['hero.stickers.selfhost'](), tone: 'warning' },
			{ text: m['hero.stickers.p2p'](), tone: 'info' },
			{ text: m['hero.stickers.open'](), tone: 'success' }
		]
	}}
>
	<div class="max-w-md">
		<p class="m-0 text-2xl font-black tracking-tight">{m['hero.title']()}</p>
		<p class="mt-2 mb-0 text-pretty text-muted-foreground">{m['hero.lead']()}</p>
	</div>
	<div class="ac-row">
		<a class="ac-btn ac-btn--primary ac-btn--lg" href="#apps">{m['hero.apps']()}</a>
		<a class="ac-btn ac-btn--lg" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
			{m['hero.github']()}
		</a>
	</div>
</AcerolaHero>

<AcerolaSection
	data={{
		id: 'apps',
		eyebrow: m['home.apps.eyebrow'](),
		title: m['home.apps.title'](),
		lead: m['home.apps.lead']()
	}}
>
	<div class="grid gap-4 md:grid-cols-3">
		{#each APPS as app (app.id)}
			<AcerolaAppCard
				data={{
					href: localizeHref(resolve('/[app]', { app: app.id })),
					icon: app.icon,
					name: app.name(),
					kind: app.kind(),
					tagline: app.tagline(),
					action: m['home.apps.open']({ name: app.name() })
				}}
			/>
		{/each}
	</div>
</AcerolaSection>

<AcerolaSection
	data={{
		id: 'principles',
		eyebrow: m['home.principles.eyebrow'](),
		title: m['home.principles.title'](),
		lead: m['home.principles.lead']()
	}}
>
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each principles as item (item.id)}
			<article class="ac-card grid content-start gap-3">
				<span class="grid size-11 place-items-center rounded-inner bg-surface">
					<item.icon size={20} />
				</span>
				<h3 class="m-0 text-lg font-black tracking-tight">{item.title()}</h3>
				<p class="m-0 text-pretty text-muted-foreground">{item.text()}</p>
			</article>
		{/each}
	</div>
</AcerolaSection>

<AcerolaSection
	data={{
		id: 'ideas',
		eyebrow: m['home.ideas.eyebrow'](),
		title: m['home.ideas.title'](),
		lead: m['home.ideas.lead']()
	}}
>
	<div class="grid gap-4 md:grid-cols-2">
		{#each ideas as idea (idea.id)}
			<article class="ac-card grid content-start gap-3">
				<span class="ac-badge ac-badge--info w-fit">
					<Lightbulb size={14} />{m['nav.ideas']()}
				</span>
				<h3 class="m-0 text-lg font-black tracking-tight">{idea.title()}</h3>
				<p class="m-0 text-pretty text-muted-foreground">{idea.text()}</p>
			</article>
		{/each}
	</div>
</AcerolaSection>
