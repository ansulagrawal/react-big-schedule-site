// After `vite build` and `vite build --ssr`: write one static HTML file per route (content + per-route head), the sitemap and robots.txt.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const { render, routes } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);
const { SITE, HOME } = await import(pathToFileURL(path.resolve('dist-ssr/seo.js')).href).catch(() => ({ SITE: 'https://react-big-schedule.ansulagrawal.com', HOME: null }));
const template = fs.readFileSync('dist/index.html', 'utf8');
const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

for (const route of routes) {
  const { html, meta } = render(route);
  let out = template
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${esc(meta.description)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, `$1${meta.url}`)
    .replace(/(<meta property="og:title" content=")[^"]*/, `$1${esc(meta.title)}`)
    .replace(/(<meta property="og:description" content=")[^"]*/, `$1${esc(meta.description)}`)
    .replace(/(<meta property="og:url" content=")[^"]*/, `$1${meta.url}`)
    .replace(/(<meta name="twitter:title" content=")[^"]*/, `$1${esc(meta.title)}`)
    .replace(/(<meta name="twitter:description" content=")[^"]*/, `$1${esc(meta.description)}`);
  const file = route === '/' ? 'dist/index.html' : `dist${route}/index.html`;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, out);
}

const site = SITE ?? 'https://react-big-schedule.ansulagrawal.com';
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
    .map(r => `  <url><loc>${site}${r === '/' ? '/' : r}</loc><lastmod>${today}</lastmod></url>`)
    .join('\n')}\n</urlset>\n`,
);
console.log(`prerendered ${routes.length} routes + sitemap`);
