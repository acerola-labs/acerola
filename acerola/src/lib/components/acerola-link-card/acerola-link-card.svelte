<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';
	import type { Logo } from '#lib/data/apps.ts';

	type Props = {
		data: {
			href: string;
			/** The logo of where it goes (Android, Microsoft Store, GitHub, an Acerola site). */
			logo: Logo;
			title: string;
			text: string;
			/** The verb at the bottom of the card ("Baixar o APK"). */
			action: string;
		};
		/** primary: the page's single main action (.ac-card--primary). */
		ui?: { primary?: boolean };
	};

	let { data, ui = {} }: Props = $props();
</script>

<!-- Clickable card to another site (store, GitHub, docs): opens in a new tab and shows the action. -->
<a
	href={data.href}
	target="_blank"
	rel="noopener noreferrer"
	class="ac-card ac-card--link {ui.primary ? 'ac-card--primary' : ''}"
>
	<!-- The logo keeps its own colors: neutral block (acerola-design, "Ícone em bloco"). -->
	<span class="ac-icon-tile">
		{#if 'component' in data.logo}
			<data.logo.component class="size-6" aria-hidden="true" />
		{:else}
			<img src={data.logo.src} alt="" class="size-6" />
		{/if}
	</span>
	<span class="grid gap-1">
		<span class="text-lg font-black tracking-tight">{data.title}</span>
		<span class="text-sm {ui.primary ? '' : 'text-muted-foreground'}">{data.text}</span>
	</span>
	<span class="ac-card__action">
		{data.action}
		<span class="ac-card__go"><ArrowUpRight size={18} /></span>
	</span>
</a>
