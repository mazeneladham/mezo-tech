import { site } from '../data/site';
import { isConfigured } from './url';
import { safeHttpUrl } from './format';

export interface SocialLink {
  key: 'github' | 'linkedin' | 'instagram' | 'email';
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'instagram' | 'mail';
  external: boolean;
  /** Visible text for email addresses. */
  text?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns only the social links that are really configured in src/data/site.ts. */
export function getSocialLinks(): SocialLink[] {
  const out: SocialLink[] = [];
  const s = site.social;

  const github = isConfigured(s.github) ? safeHttpUrl(s.github) : undefined;
  if (github) out.push({ key: 'github', label: 'GitHub', href: github, icon: 'github', external: true });

  const linkedin = isConfigured(s.linkedin) ? safeHttpUrl(s.linkedin) : undefined;
  if (linkedin) out.push({ key: 'linkedin', label: 'LinkedIn', href: linkedin, icon: 'linkedin', external: true });

  const instagram = isConfigured(s.instagram) ? safeHttpUrl(s.instagram) : undefined;
  if (instagram) out.push({ key: 'instagram', label: 'Instagram', href: instagram, icon: 'instagram', external: true });

  if (isConfigured(s.email) && emailPattern.test(s.email.trim())) {
    out.push({
      key: 'email',
      label: 'Email',
      href: `mailto:${s.email.trim()}`,
      icon: 'mail',
      external: false,
      text: s.email.trim(),
    });
  }
  return out;
}
