import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';
import { langs } from '../i18n/ui';
import { localePath } from './url';
import { normalizeText } from './normalize';

/** Drafts are visible only in `astro dev` so you can preview them; they are never built for production. */
const includeDrafts = import.meta.env.DEV;

export interface Item<C extends 'blog' | 'projects'> {
  entry: CollectionEntry<C>;
  data: CollectionEntry<C>['data'];
  lang: Lang;
  slug: string;
  key: string;
  /** Full URL path including base and language prefix. */
  path: string;
  readingTime: number;
  /** Plain text of the Markdown body (used for the search index). */
  text: string;
}
export type Post = Item<'blog'>;
export type Project = Item<'projects'>;

export function readingTimeMinutes(markdown: string): number {
  const words = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function markdownToText(markdown: string): string {
  return markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]*)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/[*_>~|-]{1,}/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function fileSlug(id: string): string {
  const last = id.split('/').pop() ?? id;
  return last.replace(/\.md$/i, '');
}

function build<C extends 'blog' | 'projects'>(collection: C, entries: CollectionEntry<C>[]): Item<C>[] {
  const seenSlugs = new Set<string>();
  const seenKeys = new Set<string>();
  const items = entries
    .filter((e) => includeDrafts || !(e.data as { draft: boolean }).draft)
    .map((entry) => {
      const data = entry.data;
      const d = data as { language: Lang; translationKey: string; slug?: string };
      const slug = d.slug ?? fileSlug(entry.id);
      const lang = d.language;

      const slugId = `${lang}:${slug}`;
      if (seenSlugs.has(slugId)) {
        throw new Error(`[${collection}] Duplicate slug "${slug}" for language "${lang}" (entry ${entry.id}).`);
      }
      seenSlugs.add(slugId);

      const keyId = `${lang}:${d.translationKey}`;
      if (seenKeys.has(keyId)) {
        throw new Error(
          `[${collection}] Two "${lang}" entries share translationKey "${d.translationKey}" (entry ${entry.id}). ` +
            'A translationKey may appear once per language.',
        );
      }
      seenKeys.add(keyId);

      const body = entry.body ?? '';
      return {
        entry,
        data,
        lang,
        slug,
        key: d.translationKey,
        path: localePath(lang, `/${collection === 'blog' ? 'blog' : 'projects'}/${slug}/`),
        readingTime: readingTimeMinutes(body),
        text: markdownToText(body),
      } as Item<C>;
    });
  return items;
}

let postCache: Post[] | undefined;
let projectCache: Project[] | undefined;

export async function getAllPosts(): Promise<Post[]> {
  postCache ??= build('blog', await getCollection('blog'));
  return postCache;
}

export async function getAllProjects(): Promise<Project[]> {
  projectCache ??= build('projects', await getCollection('projects'));
  return projectCache;
}

/** Published posts for a language, newest first. */
export async function getPosts(lang: Lang): Promise<Post[]> {
  return (await getAllPosts())
    .filter((p) => p.lang === lang)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Published projects for a language: featured first, then by `order`, then newest. */
export async function getProjects(lang: Lang): Promise<Project[]> {
  return (await getAllProjects())
    .filter((p) => p.lang === lang)
    .sort((a, b) => {
      if (a.data.featured !== b.data.featured) return a.data.featured ? -1 : 1;
      if (a.data.order !== b.data.order) return a.data.order - b.data.order;
      const da = a.data.startDate?.valueOf() ?? 0;
      const db = b.data.startDate?.valueOf() ?? 0;
      if (da !== db) return db - da;
      return a.data.title.localeCompare(b.data.title);
    });
}

export async function getAboutPage(lang: Lang) {
  const pages = await getCollection('pages');
  return pages.find((p) => p.data.language === lang && p.data.translationKey === 'about');
}

/** Paths of every language version that really exists for a piece of content. */
export function alternatesFor<C extends 'blog' | 'projects'>(items: Item<C>[], key: string): Partial<Record<Lang, string>> {
  const out: Partial<Record<Lang, string>> = {};
  for (const l of langs) {
    const found = items.find((i) => i.lang === l && i.key === key);
    if (found) out[l] = found.path;
  }
  return out;
}

export function relatedPosts(all: Post[], current: Post, limit = 3): Post[] {
  const tags = new Set(current.data.tags.map(normalizeText));
  return all
    .filter((p) => p.lang === current.lang && p.key !== current.key)
    .map((p) => {
      const shared = p.data.tags.filter((t) => tags.has(normalizeText(t))).length;
      const score = shared * 2 + (p.data.category === current.data.category ? 2 : 0);
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || b.p.data.pubDate.valueOf() - a.p.data.pubDate.valueOf())
    .slice(0, limit)
    .map((x) => x.p);
}

/** Look up items by translationKey in one language (silently skips keys with no version in that language). */
export function pickByKeys<T extends { key: string; lang: Lang }>(all: T[], lang: Lang, keys: string[]): T[] {
  return keys
    .map((k) => all.find((i) => i.lang === lang && i.key === k))
    .filter((i): i is T => Boolean(i));
}
