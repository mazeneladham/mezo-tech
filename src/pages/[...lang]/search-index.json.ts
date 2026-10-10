import type { APIRoute } from 'astro';
import { getPosts, getProjects } from '../../utils/content';
import { langStaticPaths } from '../../utils/routes';
import { categoryLabel, tagLabel } from '../../data/taxonomy';
import { normalizeText } from '../../utils/normalize';
import type { Lang } from '../../i18n/ui';

export function getStaticPaths() {
  return langStaticPaths();
}

/**
 * Compact per-language search index: titles, descriptions, categories, tags,
 * technologies and only the OPENING (first ~400 characters) of each article body.
 * Drafts never appear (getPosts/getProjects exclude them in production builds).
 */
export const GET: APIRoute = async ({ props }) => {
  const lang = (props as { lang: Lang }).lang;
  const posts = await getPosts(lang);
  const projects = await getProjects(lang);

  const entries = [
    ...posts.map((p) => {
      const category = categoryLabel(lang, p.data.category);
      const tags = p.data.tags.map((x) => tagLabel(lang, x));
      return {
        k: 'post',
        t: p.data.title,
        u: p.path,
        d: p.data.description,
        c: category,
        g: tags,
        n: normalizeText([p.data.title, p.data.description, category, ...tags, ...p.data.tags, p.text.slice(0, 400)].join(' ')),
      };
    }),
    ...projects.map((p) => {
      const category = categoryLabel(lang, p.data.category);
      return {
        k: 'project',
        t: p.data.title,
        u: p.path,
        d: p.data.description,
        c: category,
        g: p.data.technologies,
        n: normalizeText([p.data.title, p.data.description, category, ...p.data.technologies, p.text.slice(0, 400)].join(' ')),
      };
    }),
  ];
  return new Response(JSON.stringify(entries), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
};
