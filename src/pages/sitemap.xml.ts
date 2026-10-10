import type { APIRoute } from 'astro';
import { getPublicRoutes } from '../utils/routes';
import { absoluteUrl } from '../utils/url';
import { langs } from '../i18n/ui';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

/** One <url> per language version that really exists, each with only the alternates that exist. */
export const GET: APIRoute = async () => {
  const routes = await getPublicRoutes();
  const urls: string[] = [];
  for (const route of routes) {
    const existing = langs.filter((l) => route.urls[l]);
    const xDefault = route.urls.en ?? route.urls[existing[0]!];
    for (const l of existing) {
      const alts = existing
        .map((a) => `<xhtml:link rel="alternate" hreflang="${a}" href="${esc(absoluteUrl(route.urls[a]!))}"/>`)
        .concat(xDefault ? [`<xhtml:link rel="alternate" hreflang="x-default" href="${esc(absoluteUrl(xDefault))}"/>`] : [])
        .join('');
      const lastmod = route.lastmod ? `<lastmod>${route.lastmod.toISOString().slice(0, 10)}</lastmod>` : '';
      urls.push(`<url><loc>${esc(absoluteUrl(route.urls[l]!))}</loc>${lastmod}${alts}</url>`);
    }
  }
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
