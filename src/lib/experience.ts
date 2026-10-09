import { clean, ContentError, inlineMarkdown, parseFields, readContent, splitList, splitSections, warn } from './content';
import { findProjectByTitle, type Project } from './projects';

export interface ExperienceEntry {
  title: string;
  org?: string;
  period?: string;
  /** Inline HTML. */
  summary?: string;
  /** Inline HTML. */
  details?: string;
  projects: Project[];
}

export interface ExperienceSection {
  heading: string;
  entries: ExperienceEntry[];
}

/** Resolves a comma-separated list of project titles; titles may themselves contain commas. */
function resolveProjects(value: string | undefined, entry: string): Project[] {
  const projects: Project[] = [];
  let pending = '';
  for (const part of splitList(value)) {
    pending = pending ? `${pending}, ${part}` : part;
    const project = findProjectByTitle(pending);
    if (project) {
      projects.push(project);
      pending = '';
    }
  }
  if (pending) throw new ContentError(`experience.md: "${entry}" lists project "${pending}", which is not in projects.md`);
  return projects;
}

export function getExperience(): ExperienceSection[] {
  return splitSections(readContent('experience.md'), '##').map(({ heading, body }) => ({
    heading,
    entries: splitSections(body, '###').map(({ heading: title, body: entryBody }) => {
      const f = parseFields(entryBody);
      const summary = clean(f.summary);
      const details = clean(f.details);
      if (!clean(f.org)) warn(`experience.md: "${title}" has no org`);
      return {
        title,
        org: clean(f.org),
        period: clean(f.period),
        summary: summary && inlineMarkdown(summary),
        details: details && inlineMarkdown(details),
        projects: resolveProjects(f.projects, title),
      };
    }),
  }));
}
