/**
 * Resume content — edit this file; the layout (src/pages/[...lang]/resume.astro)
 * stays untouched.
 *
 * Nothing here is invented. Sections that are empty render a neutral
 * "To be added" note, so add your real details when you are ready:
 *
 *   education: [{ title: {en,ar}, place: {en,ar}, period: '2022 – 2026', details?: {en,ar} }]
 *   experience / certifications use the same shape.
 *
 * The PDF download button appears automatically once the file at
 * `site.cv.file` (public/files/mezo-tech-cv.pdf) exists.
 */
import type { Lang } from '../i18n/ui';

export interface ResumeEntry {
  title: Record<Lang, string>;
  place?: Record<Lang, string>;
  period?: string;
  details?: Record<Lang, string>;
}

export const resume = {
  summary: {
    en: "I'm a developing software engineer and technology enthusiast, learning by building small, practical projects and writing about what I discover.",
    ar: 'أنا مهندس برمجيات في طور التكوين ومهتم بالتقنية، أتعلّم ببناء مشاريع عملية صغيرة وأكتب عمّا أكتشفه.',
  } satisfies Record<Lang, string>,

  // Add your real entries to these lists when you are ready.
  education: [] as ResumeEntry[],
  experience: [] as ResumeEntry[],
  certifications: [] as ResumeEntry[],

  /** Spoken/written languages. Adjust to match reality. */
  languages: [
    { en: 'Arabic', ar: 'العربية' },
    { en: 'English', ar: 'الإنجليزية' },
  ] satisfies Record<Lang, string>[],
};
