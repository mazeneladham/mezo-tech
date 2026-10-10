import { langs, type Lang } from '../i18n/ui';
import { getAllPosts, getAllProjects } from './content';
import { localePath } from './url';

/** Used by every page under src/pages/[...lang]/: one route file serves "/x/" and "/ar/x/". */
export function langStaticPaths() {
  return [
    { params: { lang: undefined }, props: { lang: 'en' as Lang } },
    { params: { lang: 'ar' }, props: { lang: 'ar' as Lang } },
  ];
}

/** Static pages that exist in both languages (also drives the sitemap). */
export const staticRoutes = ['/', '/about/', '/projects/', '/blog/', '/learning/', '/resume/', '/contact/'] as const;

export interface PublicRoute {
  /** Stable identifier shared by the language versions. */
  id: string;
  /** Paths (including base) of the language versions that really exist. */
  urls: Partial<Record<Lang, string>>;
  lastmod?: Date;
}

/** Every public, indexable page with the translations that exist. Drafts are never included. */
export async function getPublicRoutes(): Promise<PublicRoute[]> {
  const routes: PublicRoute[] = staticRoutes.map((r) => ({
    id: `page:${r}`,
    urls: Object.fromEntries(langs.map((l) => [l, localePath(l, r)])) as Record<Lang, string>,
  }));

  for (const [kind, items] of [
    ['post', await getAllPosts()],
    ['project', await getAllProjects()],
  ] as const) {
    const byKey = new Map<string, PublicRoute>();
    for (const item of items) {
      const id = `${kind}:${item.key}`;
      const route = byKey.get(id) ?? { id, urls: {} };
      route.urls[item.lang] = item.path;
      const d = item.data as { pubDate?: Date; updatedDate?: Date; endDate?: Date; startDate?: Date };
      const mod = d.updatedDate ?? d.pubDate ?? d.endDate ?? d.startDate;
      if (mod && (!route.lastmod || mod > route.lastmod)) route.lastmod = mod;
      byKey.set(id, route);
    }
    routes.push(...byKey.values());
  }
  return routes;
}
