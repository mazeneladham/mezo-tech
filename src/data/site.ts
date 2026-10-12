/**
 * ============================================================
 *  MEZO TECH — central site configuration
 * ============================================================
 *  This is the ONE place to edit your profile, social links,
 *  tagline, photo path and CV path.
 *
 *  Social links: replace each [PLACEHOLDER_...] value with your
 *  real URL/email. Anything that still contains "PLACEHOLDER"
 *  (or is an empty string) is hidden automatically — no broken
 *  or fake links are ever rendered.
 */
import type { Lang } from '../i18n/ui';

export const site = {
  /** Brand name — never translated. */
  name: 'MEZO TECH',

  /** Used as the author name in article structured data. Replace with your real name if you want it shown. */
  authorName: 'MEZO TECH',

  /** Brand tagline, per language. */
  tagline: {
    en: 'Turning curiosity into technology.',
    ar: 'نحوّل الفضول إلى تكنولوجيا.',
  } satisfies Record<Lang, string>,

  /** Supporting message, per language. */
  supporting: {
    en: 'Learning, building, and sharing the journey.',
    ar: 'نتعلّم، نبني، ونشارك الرحلة.',
  } satisfies Record<Lang, string>,

  /** Default meta description, per language. */
  description: {
    en: 'MEZO TECH is a personal technology brand documenting a journey through software engineering, programming, AI and hands-on projects.',
    ar: 'MEZO TECH علامة تقنية شخصية توثّق رحلة التعلّم في هندسة البرمجيات والبرمجة والذكاء الاصطناعي والمشاريع العملية.',
  } satisfies Record<Lang, string>,

  /**
   * Profile photograph. Put your file at public/images/profile/mezo-profile.webp
   * (or change the path here). If the file is missing, a neutral placeholder
   * with the MEZO TECH symbol is shown instead.
   */
  profile: {
    photo: '/images/profile/mezo-profile.webp',
    /** Intrinsic size of YOUR photo file; used to avoid layout shift. */
    width: 800,
    height: 1000,
    alt: {
      en: 'Portrait photograph of the author',
      ar: 'صورة شخصية لصاحب الموقع',
    } satisfies Record<Lang, string>,
  },

  /** Optional CV file. If the file does not exist, the download button is hidden. */
  cv: {
    file: '/files/mezo-tech-cv.pdf',
  },

  /** Default social sharing image (1200x630). Replace the file or change the path. */
  defaultOgImage: '/images/og/default.png',

  /** Social profiles and contact. Replace the placeholders; unconfigured entries are hidden. */
  social: {
    github: 'https://github.com/mazeneladham',
    linkedin: 'https://www.linkedin.com/in/mazen-aladeham/',
    instagram: 'https://www.instagram.com/mezo_tech55/',
    email: 'mezo.tech.io@gmail.com',
  },
} as const;

export type SocialKey = keyof typeof site.social;
