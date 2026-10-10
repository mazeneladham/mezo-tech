import { languages, type Lang } from '../i18n/ui';

export function formatDate(date: Date, lang: Lang, opts: Intl.DateTimeFormatOptions = {}): string {
  return new Intl.DateTimeFormat(languages[lang].locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
    ...opts,
  }).format(date);
}

export function formatMonthYear(date: Date, lang: Lang): string {
  return formatDate(date, lang, { day: undefined });
}

export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

/** Accepts only http(s) URLs. Anything else (empty, placeholder, javascript:) is treated as "not set". */
export function safeHttpUrl(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  try {
    const u = new URL(value.trim());
    return u.protocol === 'http:' || u.protocol === 'https:' ? u.href : undefined;
  } catch {
    return undefined;
  }
}
