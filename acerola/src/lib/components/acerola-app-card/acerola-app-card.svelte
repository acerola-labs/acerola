<script lang="ts">
	import ArrowRight from '@lucide/svelte/icons/arrow-right';
	import type { Component } from 'svelte';

	type Props = {
		data: {
			href: string;
			icon: Component;
			name: string;
			kind: string;
			tagline: string;
			/** Accessible name of the link ("Ver Acerola Reader"). */
			action: string;
		};
	};

	let { data }: Props = $props();
</script>

<a
	href={data.href}
	aria-label={data.action}
	class="group flex flex-col gap-5 rounded-card bg-card p-5 shadow-lift transition-transform duration-300 ease-brand hover:-translate-y-1"
>
	<span class="flex items-start justify-between gap-3">
		<span class="grid size-12 place-items-center rounded-inner bg-primary-soft text-primary">
			<data.icon size={24} />
		</span>
		<span
			class="grid size-10 place-items-center rounded-full bg-surface transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
		>
			<ArrowRight size={18} />
		</span>
	</span>
	<span class="grid gap-1">
		<span class="text-xs font-semibold text-muted-foreground">{data.kind}</span>
		<span class="text-2xl font-black tracking-tight">{data.name}</span>
	</span>
	<span class="text-pretty text-muted-foreground">{data.tagline}</span>
</a>
