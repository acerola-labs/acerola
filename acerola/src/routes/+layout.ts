// 100% static site: everything is prerendered at build time and served by Caddy.
export const prerender = true;
// /pt-br/reader becomes pt-br/reader/index.html: opens on any static server, no URL rewriting.
export const trailingSlash = 'always';
