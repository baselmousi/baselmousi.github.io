import { clean, readContent, warn } from './content';

export type IconName = 'github' | 'linkedin' | 'scholar' | 'email' | 'link';

export interface ProfileLink {
  label: string;
  href: string;
  /** Text shown next to the icon where there is room (e.g. the email address). */
  display: string;
  icon: IconName;
}

const KNOWN: Record<string, { label: string; icon: IconName }> = {
  github: { label: 'GitHub', icon: 'github' },
  linkedin: { label: 'LinkedIn', icon: 'linkedin' },
  googlescholar: { label: 'Google Scholar', icon: 'scholar' },
  scholar: { label: 'Google Scholar', icon: 'scholar' },
  email: { label: 'Email', icon: 'email' },
};

export function getLinks(): ProfileLink[] {
  const links: ProfileLink[] = [];
  for (const line of readContent('links.md').split('\n')) {
    const m = line.match(/^\s*([^:]+?)\s*:\s*(.+)$/);
    if (!m) continue;
    const key = m[1].toLowerCase().replace(/[^a-z]/g, '');
    const value = clean(m[2]);
    if (!value) {
      warn(`links.md: "${m[1]}" has no value, skipped`);
      continue;
    }
    const known = KNOWN[key] ?? { label: m[1].trim(), icon: 'link' as const };
    const isEmail = known.icon === 'email';
    links.push({
      ...known,
      href: isEmail ? `mailto:${value}` : value,
      display: isEmail ? value : known.label,
    });
  }
  return links;
}

export function getEmail(): string | undefined {
  return getLinks().find((l) => l.icon === 'email')?.display;
}
