import type { Lang } from '../i18n/ui';

/** '' for root deployments, '/REPOSITORY' for project sites. Comes from astro.config.mjs `base`. */
export const BASE: string = import.meta.env.BASE_URL.replace(/\/+$/, '');

/** Origin of the public site (astro.config.mjs `site`). */
export const SITE: string = (import.meta.env.SITE ?? 'http://localhost:4321').replace(/\/+$/, '');

/** Prefix a root-relative path (e.g. "/images/x.png") with the base path. */
export function withBase(path: string): string {
  if (/^([a-z][a-z0-9+.-]*:)?\/\//i.test(path) || path.startsWith('#') || path.startsWith('mailto:')) {
    return path;
  }
  return BASE + (path.startsWith('/') ? path : `/${path}`);
}

/** URL path of a page in a given language. localePath('ar', '/blog/') -> /ar/blog/ (plus base). */
export function localePath(lang: Lang, path: string = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  const full = lang === 'ar' ? (p === '/' ? '/ar/' : `/ar${p}`) : p;
  return withBase(full);
}

/** Absolute URL (origin + base + path). Input must already include the base (use localePath/withBase). */
export function absoluteUrl(pathWithBase: string): string {
  return new URL(pathWithBase, `${SITE}/`).href;
}

/** True when a configured link is real (not empty and not a [PLACEHOLDER_...] marker). */
export function isConfigured(value: string | undefined | null): value is string {
  if (!value) return false;
  const v = value.trim();
  return v.length > 0 && !/^\[?PLACEHOLDER/i.test(v) && !v.includes('PLACEHOLDER_');
}
