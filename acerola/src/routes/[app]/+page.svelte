<script lang="ts">
	import ArrowLeft from '@lucide/svelte/icons/arrow-left';
	import { resolve } from '$app/paths';
	import AcerolaLinkCard from '#lib/components/acerola-link-card/acerola-link-card.svelte';
	import AcerolaSection from '#lib/components/acerola-section/acerola-section.svelte';
	import { getApp } from '#lib/data/apps.ts';
	import { m } from '#lib/paraglide/messages.js';
	import { localizeHref } from '#lib/paraglide/runtime.js';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	// load() already answered 404 for an unknown id.
	const app = $derived(getApp(data.id)!);
</script>

<svelte:head>
	<title>{app.name()} · Acerola</title>
	<meta name="description" content={app.tagline()} />
</svelte:head>

<section class="mx-auto max-w-6xl px-4 pt-10 pb-4 sm:px-6" aria-labelledby="app-title">
	<a
		class="ac-link inline-flex items-center gap-1.5 text-sm"
		href="{localizeHref(resolve('/'))}#apps"
	>
		<ArrowLeft size={16} />{m['app.back']()}
	</a>

	<div class="mt-8 flex flex-wrap items-start gap-5">
		<span class="grid size-16 shrink-0 place-items-center rounded-tile bg-surface">
			<img src={app.logo} alt="" class="size-10" />
		</span>
		<div class="grid min-w-0 flex-1 gap-1">
			<p class="m-0 text-xs font-semibold text-muted-foreground">{app.kind()}</p>
			<h1 id="app-title" class="m-0 text-[44px] leading-none font-black tracking-tighter">
				{app.name()}
			</h1>
			<p class="mt-3 mb-0 max-w-2xl text-pretty text-muted-foreground">{app.lead()}</p>
		</div>
	</div>
</section>

<AcerolaSection data={{ id: 'get', eyebrow: app.kind(), title: m['app.get']() }}>
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		{#each app.get as link, i (link.id)}
			<AcerolaLinkCard
				data={{
					href: link.href,
					logo: link.logo,
					title: link.title(),
					text: link.text(),
					action: link.action()
				}}
				ui={{ primary: i === 0 }}
			/>
		{/each}
	</div>
</AcerolaSection>

<AcerolaSection data={{ id: 'features', eyebrow: app.name(), title: m['app.features']() }}>
	<ul class="m-0 grid list-none gap-3 p-0 md:grid-cols-2">
		{#each app.features as feature, i (i)}
			<li class="ac-card flex items-start gap-3">
				<!-- Told apart by the icon, all in the app's tone (acerola-design, "Ícone em bloco"). -->
				<span class="ac-icon-tile ac-icon-tile--primary"><feature.icon size={20} /></span>
				<span class="self-center text-pretty">{feature.text()}</span>
			</li>
		{/each}
	</ul>
</AcerolaSection>

<AcerolaSection data={{ id: 'more', eyebrow: app.name(), title: m['app.more']() }}>
	<div class="grid gap-4 sm:grid-cols-2">
		{#each app.more as link (link.id)}
			<AcerolaLinkCard
				data={{
					href: link.href,
					logo: link.logo,
					title: link.title(),
					text: link.text(),
					action: link.action()
				}}
			/>
		{/each}
	</div>
</AcerolaSection>
