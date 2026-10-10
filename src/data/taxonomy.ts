/**
 * Categories and tag labels.
 *
 * Categories: add a new line to `categories`. The key (e.g. "programming")
 * is the stable identifier you put in frontmatter (`category: programming`),
 * the same in every language. `en` / `ar` are the display names.
 *
 * Tags: tags are free text in frontmatter (use the same spelling in both
 * languages, e.g. `Git`). To show a translated name in Arabic, add an entry
 * to `tagLabelsAr`; tags without an entry are shown as written.
 */
import type { Lang } from '../i18n/ui';

export const categories = {
  programming: { en: 'Programming', ar: 'البرمجة' },
  'software-engineering': { en: 'Software Engineering', ar: 'هندسة البرمجيات' },
  'artificial-intelligence': { en: 'Artificial Intelligence', ar: 'الذكاء الاصطناعي' },
  'embedded-systems': { en: 'Embedded Systems', ar: 'الأنظمة المدمجة' },
  electronics: { en: 'Electronics', ar: 'الإلكترونيات' },
  'web-development': { en: 'Web Development', ar: 'تطوير الويب' },
  'software-development': { en: 'Software Development', ar: 'تطوير البرمجيات' },
  experiments: { en: 'Experiments', ar: 'تجارب' },
  projects: { en: 'Projects', ar: 'المشاريع' },
  'learning-notes': { en: 'Learning Notes', ar: 'ملاحظات تعلّم' },
} as const satisfies Record<string, Record<Lang, string>>;

export type CategoryId = keyof typeof categories;
export const categoryIds = Object.keys(categories) as [CategoryId, ...CategoryId[]];

export function categoryLabel(lang: Lang, id: string): string {
  return (categories as Record<string, Record<Lang, string>>)[id]?.[lang] ?? id;
}

export const tagLabelsAr: Record<string, string> = {
  Programming: 'البرمجة',
  Memory: 'الذاكرة',
  Algorithms: 'الخوارزميات',
  'Data Structures': 'هياكل البيانات',
  AI: 'الذكاء الاصطناعي',
  Microcontrollers: 'المتحكمات الدقيقة',
  Debugging: 'تصحيح الأخطاء',
  'Version Control': 'التحكم في الإصدارات',
  Beginners: 'للمبتدئين',
  'Web Development': 'تطوير الويب',
  Portfolio: 'ملف أعمال',
  CLI: 'سطر الأوامر',
};

export function tagLabel(lang: Lang, tag: string): string {
  return lang === 'ar' ? (tagLabelsAr[tag] ?? tag) : tag;
}

/** Stable identifier for a tag used in filters and URLs. */
export function tagId(tag: string): string {
  return tag.trim().toLowerCase().replace(/\s+/g, '-');
}
