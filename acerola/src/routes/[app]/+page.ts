import { error } from '@sveltejs/kit';
import { APP_IDS } from '#lib/data/app-ids.ts';
import type { EntryGenerator, PageLoad } from './$types';

// One page per app, prerendered (vite.config.ts also lists them under each locale prefix).
export const entries: EntryGenerator = () => APP_IDS.map((app) => ({ app }));

export const load: PageLoad = ({ params }) => {
	if (!(APP_IDS as readonly string[]).includes(params.app)) error(404, 'App not found');
	return { id: params.app };
};
