<script lang="ts">
	import ArrowUpRight from '@lucide/svelte/icons/arrow-up-right';

	type Props = {
		data: { href: string; title: string; text: string };
		/** primary: the page's single main action (bg-primary). */
		ui?: { primary?: boolean };
	};

	let { data, ui = {} }: Props = $props();
</script>

<!-- An external link (another Acerola site, GitHub, a store): opens in a new tab. -->
<a
	href={data.href}
	target="_blank"
	rel="noopener noreferrer"
	class="group flex flex-col gap-3 rounded-card p-5 shadow-lift transition-transform duration-300 ease-brand hover:-translate-y-0.5 {ui.primary
		? 'bg-primary text-primary-foreground'
		: 'bg-card'}"
>
	<span class="flex items-start justify-between gap-3">
		<span class="text-lg font-black tracking-tight">{data.title}</span>
		<span
			class="grid size-10 shrink-0 place-items-center rounded-full {ui.primary
				? 'bg-foreground text-background'
				: 'bg-surface'}"
		>
			<ArrowUpRight size={18} />
		</span>
	</span>
	<span class="text-sm {ui.primary ? '' : 'text-muted-foreground'}">{data.text}</span>
</a>
