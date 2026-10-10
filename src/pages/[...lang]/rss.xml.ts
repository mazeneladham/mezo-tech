import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getPosts } from '../../utils/content';
import { langStaticPaths } from '../../utils/routes';
import { site } from '../../data/site';
import { categoryLabel } from '../../data/taxonomy';
import { absoluteUrl, localePath } from '../../utils/url';
import type { Lang } from '../../i18n/ui';

export function getStaticPaths() {
  return langStaticPaths();
}

/** Language-specific RSS feed: /rss.xml (English) and /ar/rss.xml (Arabic). Published posts only. */
export const GET: APIRoute = async (context) => {
  const lang = (context.props as { lang: Lang }).lang;
  const posts = await getPosts(lang);
  return rss({
    title: `${site.name} — ${lang === 'ar' ? 'المدوّنة' : 'Blog'}`,
    description: site.description[lang],
    site: absoluteUrl(localePath(lang, '/blog/')),
    customData: `<language>${lang}</language>`,
    items: posts.map((p) => ({
      title: p.data.title,
      description: p.data.description,
      link: p.path,
      pubDate: p.data.pubDate,
      categories: [categoryLabel(lang, p.data.category), ...p.data.tags],
    })),
  });
};
