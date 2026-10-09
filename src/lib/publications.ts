import { parse } from '@retorquere/bibtex-parser';
import { clean, ContentError, readContent, warn } from './content';

/** The site owner, as written in publications.bib. Rendered in bold. */
const ME = { lastName: 'Mousi', firstName: 'Basel' };

/** Custom fields used by the website; removed from the copyable BibTeX. */
const SITE_FIELDS = ['abbr', 'selected', 'pdf', 'code', 'dataset', 'video', 'arxiv', 'equal_contribution'];

/** Link buttons, in display order. */
export const LINK_KINDS = [
  { field: 'pdf', label: 'PDF' },
  { field: 'arxiv', label: 'arXiv' },
  { field: 'code', label: 'Code' },
  { field: 'dataset', label: 'Dataset' },
  { field: 'video', label: 'Video' },
] as const;

export interface Author {
  name: string;
  isMe: boolean;
  equal: boolean;
}

export interface Publication {
  key: string;
  title: string;
  authors: Author[];
  year: number;
  venue?: string;
  abbr?: string;
  url?: string;
  selected: boolean;
  links: { label: string; href: string }[];
  bibtex: string;
}

interface Creator {
  firstName?: string;
  lastName?: string;
  name?: string;
}

const normaliseName = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase();

function creatorKey(c: Creator): string {
  return normaliseName(c.name ?? `${c.lastName ?? ''}, ${c.firstName ?? ''}`);
}

function displayName(c: Creator): string {
  if (c.name) return c.name;
  return [c.firstName, c.lastName].filter(Boolean).join(' ');
}

function cleanBibtex(raw: string): string {
  const lines = raw
    .split('\n')
    .filter((l) => !/^\s*%/.test(l))
    .filter((l) => !new RegExp(`^\\s*(${SITE_FIELDS.join('|')})\\s*=`, 'i').test(l));
  // Removing the last field can leave a trailing comma before the closing brace.
  const text = lines.join('\n').replace(/,(\s*)\}\s*$/, '$1}');
  // Re-align "field = value" to the longest remaining field name.
  const width = Math.max(...lines.map((l) => l.match(/^\s*(\w+)\s*=/)?.[1].length ?? 0));
  return text.replace(/^\s*(\w+)\s*=\s*/gm, (_m, f: string) => `  ${f.padEnd(width)} = `);
}

let cache: Publication[] | undefined;

/** All publications, newest year first; within a year, the order of the .bib file. */
export function getPublications(): Publication[] {
  if (cache && !import.meta.env.DEV) return cache;

  // BibTeX has no comment syntax inside entries, so drop % lines before parsing.
  const source = readContent('publications.bib')
    .split('\n')
    .filter((l) => !/^\s*%/.test(l))
    .join('\n');
  const result = parse(source, { sentenceCase: false });
  if (result.errors.length) {
    throw new ContentError(`publications.bib: ${result.errors.map((e: { error: string }) => e.error).join('; ')}`);
  }

  const pubs = result.entries.map((entry): Publication => {
    const f = entry.fields as Record<string, unknown>;
    const str = (name: string) => clean(typeof f[name] === 'string' ? (f[name] as string) : undefined);

    const equal = new Set(
      (str('equal_contribution') ?? '').split(/\s+and\s+/).filter(Boolean).map(normaliseName),
    );
    const authors = ((f.author as Creator[] | undefined) ?? []).map((c) => ({
      name: displayName(c),
      isMe: c.lastName === ME.lastName && c.firstName === ME.firstName,
      equal: equal.has(creatorKey(c)),
    }));

    const year = Number(str('year'));
    if (!year) warn(`publications.bib: ${entry.key} has no year`);

    return {
      key: entry.key,
      title: str('title') ?? entry.key,
      authors,
      year,
      venue:
        str('booktitle') ??
        str('journal') ??
        (str('archiveprefix')?.toLowerCase() === 'arxiv' && str('eprint') ? `arXiv:${str('eprint')}` : undefined),
      abbr: str('abbr'),
      url: str('url'),
      selected: str('selected')?.toLowerCase() === 'true',
      links: LINK_KINDS.flatMap(({ field, label }) => {
        const href = str(field);
        return href ? [{ label, href }] : [];
      }),
      bibtex: cleanBibtex(entry.input),
    };
  });

  // Stable sort by year, newest first.
  cache = pubs
    .map((p, i) => ({ p, i }))
    .sort((a, b) => b.p.year - a.p.year || a.i - b.i)
    .map(({ p }) => p);
  return cache;
}

export function getPublication(key: string): Publication | undefined {
  return getPublications().find((p) => p.key === key);
}

export function groupByYear(pubs: Publication[]): { year: number; pubs: Publication[] }[] {
  const groups: { year: number; pubs: Publication[] }[] = [];
  for (const p of pubs) {
    const last = groups.at(-1);
    if (last && last.year === p.year) last.pubs.push(p);
    else groups.push({ year: p.year, pubs: [p] });
  }
  return groups;
}
