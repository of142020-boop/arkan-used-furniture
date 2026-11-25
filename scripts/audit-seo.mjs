import fs from 'node:fs';
import path from 'node:path';

const dist = 'dist';
const htmlFiles = [];
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name.endsWith('.html')) htmlFiles.push(p);
  }
}
walk(dist);

const titles = new Set();
const descs = new Set();
const issues = [];
let totalSchemas = 0;
let totalInternalLinks = 0;

const validRoutes = new Set(
  htmlFiles.map((f) => {
    const rel = path.relative(dist, f).replace(/\\/g, '/');
    return rel === 'index.html' ? '/' : '/' + rel.replace(/\/index\.html$/, '');
  }),
);

for (const f of htmlFiles) {
  const html = fs.readFileSync(f, 'utf8');
  const route = path.relative(dist, f).replace(/\\/g, '/');
  if (!html.includes('lang="ar"') || !html.includes('dir="rtl"')) issues.push(`${route}: missing rtl/ar`);
  const t = html.match(/<title>(.*?)<\/title>/)?.[1];
  const d = html.match(/<meta name="description" content="(.*?)"/)?.[1];
  const h1s = [...html.matchAll(/<h1[^>]*>/g)];
  const canon = html.match(/<link rel="canonical" href="(.*?)"/)?.[1];
  if (!t) issues.push(`${route}: missing title`);
  else if (titles.has(t)) issues.push(`${route}: duplicate title`);
  else titles.add(t);
  if (!d) issues.push(`${route}: missing description`);
  else if (descs.has(d)) issues.push(`${route}: duplicate description`);
  else descs.add(d);
  if (h1s.length !== 1) issues.push(`${route}: h1 count=${h1s.length}`);
  if (!canon) issues.push(`${route}: missing canonical`);

  const ld = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
  if (!ld.length) issues.push(`${route}: no JSON-LD`);
  for (const m of ld) {
    try {
      JSON.parse(m[1]);
      totalSchemas++;
    } catch {
      issues.push(`${route}: invalid JSON-LD`);
    }
  }

  for (const m of html.matchAll(/href="(\/[^"]*)"/g)) {
    const href = m[1].split('#')[0].split('?')[0];
    if (href.startsWith('/_astro') || href === '/favicon.svg') continue;
    totalInternalLinks++;
    if (!validRoutes.has(href)) issues.push(`${route}: broken internal link -> ${href}`);
  }

  for (const m of html.matchAll(/src="(\/images\/[^"]+)"/g)) {
    const imgPath = path.join(dist, m[1].slice(1));
    if (!fs.existsSync(imgPath)) issues.push(`${route}: missing image -> ${m[1]}`);
  }
}

const sitemap = fs.existsSync('dist/sitemap-0.xml') ? fs.readFileSync('dist/sitemap-0.xml', 'utf8') : '';
const sitemapUrls = (sitemap.match(/<loc>/g) || []).length;

console.log(
  JSON.stringify(
    {
      pagesAudited: htmlFiles.length,
      uniqueTitles: titles.size,
      uniqueDescriptions: descs.size,
      validJsonLdBlocks: totalSchemas,
      internalLinksChecked: totalInternalLinks,
      sitemapUrls,
      robotsExists: fs.existsSync('dist/robots.txt'),
      issuesCount: issues.length,
      issues,
    },
    null,
    2,
  ),
);

if (issues.length > 0) process.exit(1);
