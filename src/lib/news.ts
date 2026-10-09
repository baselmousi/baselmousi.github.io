import { inlineMarkdown, isTodo, readContent, warn } from './content';

export interface NewsItem {
  /** Display label, normalised to "Mon YYYY". */
  date: string;
  /** Machine-readable "YYYY-MM" for <time datetime>. */
  datetime: string;
  html: string;
}

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
const LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getNews(): NewsItem[] {
  const items: (NewsItem & { sortKey: number })[] = [];
  for (const m of readContent('news.md').matchAll(/^- \*\*(.+?)\*\*:\s*(.+)$/gm)) {
    const [, rawDate, text] = m;
    if (isTodo(rawDate) || isTodo(text)) {
      warn(`news.md: skipped TODO item "${m[0]}"`);
      continue;
    }
    const d = rawDate.trim().match(/^([A-Za-z]+)\.?\s+(\d{4})$/);
    const month = d ? MONTHS.indexOf(d[1].slice(0, 3).toLowerCase()) : -1;
    if (!d || month < 0) {
      warn(`news.md: could not read date "${rawDate}", skipped`);
      continue;
    }
    const year = Number(d[2]);
    items.push({
      date: `${LABELS[month]} ${year}`,
      datetime: `${year}-${String(month + 1).padStart(2, '0')}`,
      html: inlineMarkdown(text.trim()),
      sortKey: year * 12 + month,
    });
  }
  // Newest first; items in the same month keep their order from the file.
  return items
    .map((item, i) => ({ item, i }))
    .sort((a, b) => b.item.sortKey - a.item.sortKey || a.i - b.i)
    .map(({ item: { sortKey, ...rest } }) => rest);
}
