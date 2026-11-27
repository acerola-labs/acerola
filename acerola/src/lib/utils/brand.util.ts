/**
 * The brand files (fonts, icon, mascot) come from the brand CDN: the hub ships none of them.
 * Only the Tailwind tokens live in the repository (src/lib/theme), since Tailwind needs them at
 * build time.
 */
export const BRAND_CDN_URL = 'https://cdn.acerola.app/brand';

/** Address of a brand file on the CDN, e.g. brandUrl('/mascot/acerola-mascot.svg'). */
export function brandUrl(path: `/${string}`): string {
	return `${BRAND_CDN_URL}${path}`;
}
