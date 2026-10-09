// @ts-check
import { defineConfig } from 'astro/config';
import path from 'node:path';

const contentDir = path.resolve('content');

// Pages read content/ with fs at build time, which Vite does not track.
// In dev, reload the browser whenever a content file changes.
function watchContent() {
  return {
    name: 'watch-content',
    /** @param {import('vite').ViteDevServer} server */
    configureServer(server) {
      server.watcher.add(contentDir);
      server.watcher.on('all', (_event, file) => {
        if (file.startsWith(contentDir)) server.ws.send({ type: 'full-reload' });
      });
    },
  };
}

export default defineConfig({
  site: 'https://baselmousi.github.io',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  vite: { plugins: [watchContent()] },
});
