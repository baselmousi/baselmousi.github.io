import type { ImageMetadata } from 'astro';
import { ContentError } from './content';

// Every image in content/images/, keyed by its path relative to content/ (e.g. "images/neurox.png").
const modules = import.meta.glob<{ default: ImageMetadata }>(
  '/content/images/*.{png,jpg,jpeg,webp,avif,gif}',
  { eager: true },
);

const images = new Map(
  Object.entries(modules).map(([file, mod]) => [file.replace(/^\/content\//, ''), mod.default]),
);

export function getContentImage(ref: string, usedBy: string): ImageMetadata {
  const image = images.get(ref.replace(/^\.?\//, ''));
  if (!image) throw new ContentError(`${usedBy}: image "${ref}" not found in content/images/`);
  return image;
}

export function headshot(): ImageMetadata {
  return getContentImage('images/headshot.png', 'site headshot');
}
