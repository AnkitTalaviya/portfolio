// Renders every known route to static HTML after `vite build`, so crawlers and
// JavaScript-disabled visitors get the full page instead of an empty <div id="root">.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const clientDir = join(projectRoot, 'dist');
const serverEntry = join(projectRoot, 'dist-ssr', 'entry-server.js');

const { canonicalUrl, renderRoute, routeMeta } = await import(pathToFileURL(serverEntry).href);

const template = await readFile(join(clientDir, 'index.html'), 'utf8');

const escapeAttribute = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function replaceBetween(html, pattern, value, label) {
  if (!pattern.test(html)) {
    throw new Error(`prerender: could not find ${label} in dist/index.html`);
  }

  return html.replace(pattern, (_match, prefix, suffix) => `${prefix}${value}${suffix}`);
}

function withHead(html, { title, description, canonical }) {
  let next = replaceBetween(html, /(<title>)[\s\S]*?(<\/title>)/, escapeAttribute(title), '<title>');

  const attributes = [
    [/(<meta name="description" content=")[^"]*(")/, description, 'meta description'],
    [/(<link rel="canonical" href=")[^"]*(")/, canonical, 'canonical link'],
    [/(<meta property="og:title" content=")[^"]*(")/, title, 'og:title'],
    [/(<meta property="og:description" content=")[^"]*(")/, description, 'og:description'],
    [/(<meta property="og:url" content=")[^"]*(")/, canonical, 'og:url'],
    [/(<meta name="twitter:title" content=")[^"]*(")/, title, 'twitter:title'],
    [/(<meta name="twitter:description" content=")[^"]*(")/, description, 'twitter:description'],
  ];

  for (const [pattern, value, label] of attributes) {
    next = replaceBetween(next, pattern, escapeAttribute(value), label);
  }

  return next;
}

const rootPattern = /(<div id="root">)(<\/div>)/;

if (!rootPattern.test(template)) {
  throw new Error('prerender: dist/index.html has no empty <div id="root"> to fill');
}

for (const route of routeMeta) {
  const appHtml = renderRoute(route.path);
  const canonical = canonicalUrl(route.outDir);

  const page = withHead(template, {
    title: route.title,
    description: route.description,
    canonical,
  }).replace(rootPattern, (_match, open, close) => `${open}${appHtml}${close}`);

  const outFile = join(clientDir, route.outDir, 'index.html');
  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, page, 'utf8');

  console.log(`prerendered ${route.path} -> ${join(route.outDir, 'index.html')}`);
}

console.log(`prerender: wrote ${routeMeta.length} pages`);
