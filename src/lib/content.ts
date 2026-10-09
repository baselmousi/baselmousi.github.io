// Shared helpers for reading files in content/.
// Rules enforced here for every loader:
//   - HTML comments never reach the site.
//   - Any value containing TODO is treated as missing.
import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';

export const CONTENT_DIR = path.resolve(process.cwd(), 'content');

export function readContent(file: string): string {
  return stripComments(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8'));
}

export function stripComments(text: string): string {
  return text.replace(/<!--[\s\S]*?-->/g, '');
}

export function isTodo(value: string | undefined): boolean {
  return value !== undefined && /\bTODO\b/i.test(value);
}

/** Value if present and not a TODO, otherwise undefined. */
export function clean(value: string | undefined): string | undefined {
  const v = value?.trim();
  return v && !isTodo(v) ? v : undefined;
}

export function inlineMarkdown(text: string): string {
  return marked.parseInline(text, { async: false });
}

export function blockMarkdown(text: string): string {
  return marked.parse(text, { async: false });
}

export function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Splits markdown into sections keyed by heading text at the given level (e.g. '##'). */
export function splitSections(text: string, marker: string): { heading: string; body: string }[] {
  const re = new RegExp(`^${marker} (.+)$`, 'gm');
  const sections: { heading: string; body: string }[] = [];
  const matches = [...text.matchAll(re)];
  matches.forEach((m, i) => {
    const start = m.index! + m[0].length;
    const end = i + 1 < matches.length ? matches[i + 1].index! : text.length;
    sections.push({ heading: m[1].trim(), body: text.slice(start, end) });
  });
  return sections;
}

/** Parses `- **key:** value` lines into a map with lowercase keys. */
export function parseFields(body: string): Record<string, string> {
  const fields: Record<string, string> = {};
  for (const m of body.matchAll(/^- \*\*([^*]+?):\*\*[ \t]*(.*)$/gm)) {
    fields[m[1].trim().toLowerCase()] = m[2].trim();
  }
  return fields;
}

export function splitList(value: string | undefined): string[] {
  return (value ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s && !isTodo(s));
}

const warned = new Set<string>();
/** Build-time notice for missing or skipped content. Printed in the terminal, never on the site. */
export function warn(message: string) {
  if (warned.has(message)) return;
  warned.add(message);
  console.warn(`[content] ${message}`);
}

export class ContentError extends Error {
  constructor(message: string) {
    super(`[content] ${message}`);
  }
}
