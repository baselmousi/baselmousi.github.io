import { blockMarkdown, isTodo, readContent, splitSections, warn } from './content';

export interface Bio {
  tagline: string;
  /** Homepage bio as HTML paragraphs. */
  html: string;
  interests: string[];
}

export function getBio(): Bio {
  const sections = splitSections(readContent('bio.md'), '##');
  const find = (prefix: string) =>
    sections.find((s) => s.heading.toLowerCase().startsWith(prefix))?.body.trim() ?? '';

  // Drop any paragraph that still contains a TODO.
  const paragraphs = (text: string) =>
    text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter((p) => p && !isTodo(p));

  const tagline = paragraphs(find('tagline')).join(' ');
  if (!tagline) warn('bio.md: no tagline found');

  const bioText = paragraphs(find('homepage bio')).join('\n\n');
  if (!bioText) warn('bio.md: no homepage bio found');

  const interests = find('research interests')
    .split('\n')
    .map((l) => l.replace(/^[-*]\s+/, '').trim())
    .filter((l) => l && !isTodo(l));

  return { tagline, html: blockMarkdown(bioText), interests };
}
