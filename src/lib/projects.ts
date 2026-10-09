import type { ImageMetadata } from 'astro';
import {
  clean,
  ContentError,
  inlineMarkdown,
  parseFields,
  readContent,
  slugify,
  splitList,
  splitSections,
  warn,
} from './content';
import { getContentImage } from './images';
import { getPublication, type Publication } from './publications';

export type Tier = 'featured' | 'research' | 'earlier';

export interface Project {
  title: string;
  slug: string;
  tier: Tier;
  featured: boolean;
  oneLiner?: string;
  /** Description as inline HTML. */
  description?: string;
  role?: string;
  org?: string;
  period?: string;
  tags: string[];
  papers: Publication[];
  links: { label: string; href: string }[];
  image?: ImageMetadata;
}

const TIERS: Record<string, Tier> = {
  featured: 'featured',
  'research projects': 'research',
  'earlier work': 'earlier',
};

/** Parses "label: url, label: url". Entries whose URL is TODO or not a URL are skipped. */
function parseLinks(value: string | undefined, project: string) {
  if (!value) return [];
  return value
    .split(/,\s*(?=[^,:]+:\s*\S)/)
    .flatMap((part) => {
      const m = part.match(/^\s*([^:]+?)\s*:\s*(.+?)\s*$/);
      const href = clean(m?.[2]);
      if (!m || !href || !/^(https?:|mailto:)/.test(href)) {
        warn(`projects.md: "${project}" link "${part.trim()}" skipped`);
        return [];
      }
      return [{ label: m[1].charAt(0).toUpperCase() + m[1].slice(1), href }];
    });
}

export function getProjects(): Project[] {
  const projects: Project[] = [];
  for (const tierSection of splitSections(readContent('projects.md'), '##')) {
    const tier = TIERS[tierSection.heading.toLowerCase()];
    if (!tier) {
      warn(`projects.md: unknown section "## ${tierSection.heading}", skipped`);
      continue;
    }
    for (const { heading: title, body } of splitSections(tierSection.body, '###')) {
      const f = parseFields(body);
      const papers = splitList(f.papers).map((key) => {
        const pub = getPublication(key);
        if (!pub) throw new ContentError(`projects.md: "${title}" lists paper "${key}", which is not in publications.bib`);
        return pub;
      });
      const description = clean(f.description);
      const image = clean(f.image);
      projects.push({
        title,
        slug: slugify(title),
        tier,
        featured: clean(f.featured)?.toLowerCase() === 'true',
        oneLiner: clean(f.one_liner),
        description: description && inlineMarkdown(description),
        role: clean(f.role),
        org: clean(f.org),
        period: clean(f.period),
        tags: splitList(f.tags),
        papers,
        links: parseLinks(f.links, title),
        image: image ? getContentImage(image, `projects.md: "${title}"`) : undefined,
      });
    }
  }
  return projects;
}

export function findProjectByTitle(title: string): Project | undefined {
  const t = title.trim().toLowerCase();
  return getProjects().find((p) => p.title.toLowerCase() === t);
}

/** Projects each paper belongs to, keyed by BibTeX key. */
export function projectsByPaper(): Map<string, Project[]> {
  const map = new Map<string, Project[]>();
  for (const project of getProjects()) {
    for (const paper of project.papers) {
      map.set(paper.key, [...(map.get(paper.key) ?? []), project]);
    }
  }
  return map;
}
