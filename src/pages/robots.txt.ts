import type { APIRoute } from 'astro';
import { absoluteUrl, withBase } from '../utils/url';

export const GET: APIRoute = () =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl(withBase('/sitemap.xml'))}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
