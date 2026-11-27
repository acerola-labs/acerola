<script lang="ts">
	import './layout.css';
	import AcerolaTopbar from '#lib/components/acerola-topbar/acerola-topbar.svelte';
	import { page } from '$app/state';
	import { m } from '#lib/paraglide/messages.js';
	import { deLocalizeHref, getLocale, localizeHref, locales } from '#lib/paraglide/runtime.js';
	import { brandUrl } from '#lib/utils/brand.util.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	/** The same page in every locale, for hreflang; the path with no prefix follows the cookie. */
	const path = $derived(deLocalizeHref(page.url.pathname));
</script>

<svelte:head>
	<!-- Brand files from the CDN: the fonts, and the foreground SVG as the only favicon. -->
	<link rel="stylesheet" href={brandUrl('/css/fonts.css')} />
	<link rel="icon" href={brandUrl('/logo/acerola-logo-foreground.svg')} type="image/svg+xml" />
	<meta name="description" content={m['site.description']()} />
	{#each locales as locale (locale)}
		<link
			rel="alternate"
			hreflang={locale}
			href="{__SITE_URL__}{localizeHref(path, { locale })}"
		/>
	{/each}
	<link rel="alternate" hreflang="x-default" href="{__SITE_URL__}{path}" />
	<meta property="og:locale" content={getLocale() === 'en' ? 'en_US' : 'pt_BR'} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content="Acerola" />
	<meta property="og:title" content={m['site.title']()} />
	<meta property="og:description" content={m['site.description']()} />
</svelte:head>

<!-- The error screen stands alone: no topbar or footer, only the error and its actions. -->
{#if !page.error}
	<AcerolaTopbar />
{/if}

<main>{@render children()}</main>

{#if !page.error}
	<footer class="mt-10 bg-mantle">
		<div
			class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:px-6"
		>
			<span class="flex items-center gap-2">
				<img src={brandUrl('/logo/acerola-logo-foreground.svg')} alt="" class="size-6" />
				<span class="font-black tracking-tight text-foreground">Acerola</span>
			</span>
			<span>{m['site.footer']()}</span>
		</div>
	</footer>
{/if}
