<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';

	type Props = {
		data: {
			href: string;
			/** The app's logo (brand CDN). */
			logo: string;
			name: string;
			kind: string;
			tagline: string;
			/** The verb at the bottom of the card ("Ver o app"). */
			action: string;
			/** Accessible name of the link ("Ver Acerola Reader"). */
			label: string;
		};
	};

	let { data }: Props = $props();
</script>

<!-- Clickable card (acerola-design): the whole card is the link and shows the action at rest. -->
<a href={data.href} aria-label={data.label} class="ac-card ac-card--link">
	<span class="ac-icon-tile"><img src={data.logo} alt="" class="size-7" /></span>
	<span class="grid gap-1">
		<span class="text-xs font-semibold text-muted-foreground">{data.kind}</span>
		<span class="text-2xl font-black tracking-tight">{data.name}</span>
	</span>
	<span class="text-pretty text-muted-foreground">{data.tagline}</span>
	<span class="ac-card__action">
		{data.action}
		<span class="ac-card__go"><ArrowRight size={18} /></span>
	</span>
</a>
