import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';

function serveDemoDirectoryIndexes(): Plugin {
  const publicRoot = resolve(__dirname, 'public');

  return {
    name: 'serve-demo-directory-indexes',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0];

        if (!url || req.method !== 'GET' || !url.startsWith('/demos/') || extname(url)) {
          next();
          return;
        }

        const relativeDemoPath = url.endsWith('/') ? `${url.slice(1)}index.html` : `${url.slice(1)}/index.html`;
        const filePath = resolve(publicRoot, relativeDemoPath);

        if (!filePath.startsWith(publicRoot)) {
          next();
          return;
        }

        try {
          const html = await readFile(filePath, 'utf8');
          const transformedHtml = await server.transformIndexHtml(url, html);

          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(transformedHtml);
        } catch {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), serveDemoDirectoryIndexes()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        projects: resolve(__dirname, 'projects.html'),
        crudWorkspace: resolve(__dirname, 'crud-workspace.html'),
      },
    },
  },
});
