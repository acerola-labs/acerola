<script lang="ts">
	import Languages from '@lucide/svelte/icons/languages';
	import Moon from '@lucide/svelte/icons/moon';
	import Sun from '@lucide/svelte/icons/sun';
	import { resolve } from '$app/paths';
	import { useLocale } from '#lib/hooks/use-locale/use-locale.svelte.ts';
	import { useTheme } from '#lib/hooks/use-theme/use-theme.svelte.ts';
	import { m } from '#lib/paraglide/messages.js';
	import { localizeHref } from '#lib/paraglide/runtime.js';
	import { brandUrl } from '#lib/utils/brand.util.ts';

	const theme = useTheme();
	const locale = useLocale();

	// The home page in the page's locale (/pt-br/, /en/); the sections are anchors on it.
	const home = localizeHref(resolve('/'));
	const sections = [
		{ id: 'apps', label: m['nav.apps'] },
		{ id: 'principles', label: m['nav.principles'] },
		{ id: 'ideas', label: m['nav.ideas'] }
	];
</script>

<header class="sticky top-0 z-20 bg-background/85 backdrop-blur-md">
	<div class="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
		<a href={home} class="flex items-center gap-2.5" aria-label={m['nav.home']()}>
			<img src={brandUrl('/logo/acerola-logo-foreground.svg')} alt="" class="size-9" />
			<span class="text-xl font-black tracking-tight">Acerola</span>
		</a>

		<nav
			class="ml-auto hidden items-center gap-1 rounded-full bg-surface p-1 md:flex"
			aria-label={m['nav.sections']()}
		>
			{#each sections as section (section.id)}
				<a
					href="{home}#{section.id}"
					class="rounded-full px-4 py-2 text-sm font-bold text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
				>
					{section.label()}
				</a>
			{/each}
		</nav>

		<button
			type="button"
			class="ac-btn ml-auto gap-1.5 px-3 md:ml-0"
			onclick={locale.toggle}
			aria-label={m['nav.language']()}
			title={m['nav.language']()}
		>
			<Languages size={16} />
			<span class="uppercase">{locale.current === 'en' ? 'pt' : 'en'}</span>
		</button>

		<button
			type="button"
			class="ac-btn ac-btn--icon"
			onclick={theme.toggle}
			aria-label={theme.current === 'dark' ? m['nav.theme.light']() : m['nav.theme.dark']()}
		>
			{#if theme.current === 'dark'}<Sun size={18} />{:else}<Moon size={18} />{/if}
		</button>
	</div>
</header>
