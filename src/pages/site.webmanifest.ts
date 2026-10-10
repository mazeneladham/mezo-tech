import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { withBase } from '../utils/url';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: site.name,
      short_name: site.name,
      description: site.description.en,
      start_url: withBase('/'),
      scope: withBase('/'),
      display: 'browser',
      background_color: '#0B1120',
      theme_color: '#0B1120',
      icons: [
        { src: withBase('/icon-192.png'), sizes: '192x192', type: 'image/png' },
        { src: withBase('/icon-512.png'), sizes: '512x512', type: 'image/png' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } },
  );
