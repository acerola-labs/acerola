/** Every app in the hub, in display order: each one is a page (/pt-br/<id>/, /en/<id>/). */
export const APP_IDS = ['reader', 'sync', 'brand'] as const;

export type AppId = (typeof APP_IDS)[number];
