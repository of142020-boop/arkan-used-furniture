import fs from 'node:fs';
import path from 'node:path';

const bp = JSON.parse(
  fs.readFileSync('F:/مواقعي/111111111111/Keyword_Studio/outputs/used-furniture-egypt/content-plan-blueprint.json', 'utf8'),
);

const norm = (s) =>
  String(s || '')
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/تكيف/g, 'تكييف')
    .replace(/بوتجاز/g, 'بوتاجاز')
    .replace(/ميكرويف/g, 'ميكروويف')
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

const report = [];
for (const p of bp.pages) {
  const file = p.url === '/' ? 'dist/index.html' : path.join('dist', p.url.slice(1), 'index.html');
  const html = fs.readFileSync(file, 'utf8');
  const mainHtml = html.match(/<main>([\s\S]*?)<\/main>/)?.[1] || '';
  const textOnly = mainHtml
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  const words = textOnly.split(' ').filter(Boolean).length;
  const h2Count = (mainHtml.match(/<h2[\s>]/g) || []).length;
  const title = html.match(/<title>(.*?)<\/title>/)?.[1] || '';
  const desc = html.match(/<meta name="description" content="(.*?)"/)?.[1] || '';
  const normFull = ' ' + norm(title + ' ' + desc + ' ' + textOnly) + ' ';
  const top10 = (p.topKeywords || []).slice(0, 10);
  const found = top10.filter((k) => normFull.includes(' ' + norm(k.keyword) + ' '));
  const missing = top10
    .filter((k) => !normFull.includes(' ' + norm(k.keyword) + ' '))
    .map((k) => `${k.keyword}(${k.volume})`);
  const imgsMissingDims = [...mainHtml.matchAll(/<img(?![^>]*width=)[^>]*>/g)].length;
  report.push({
    url: p.url,
    words,
    h2: h2Count,
    titleLen: title.length,
    descLen: desc.length,
    top10Hit: `${found.length}/${top10.length}`,
    missingDims: imgsMissingDims,
    missingSample: missing.slice(0, 3).join(' | '),
  });
}

for (const r of report) {
  console.log(
    `${r.url.padEnd(44)} | W:${String(r.words).padStart(4)} | H2:${r.h2} | T:${String(r.titleLen).padStart(2)} | D:${String(r.descLen).padStart(3)} | KW:${r.top10Hit.padEnd(5)} | Missing: ${r.missingSample}`,
  );
}
const avgWords = Math.round(report.reduce((s, r) => s + r.words, 0) / report.length);
const thinPages = report.filter((r) => r.words < 450 && !['/contact', '/about', '/how-it-works'].includes(r.url));
console.log('\nAVG WORDS:', avgWords, '| THIN CONTENT PAGES (<450w):', thinPages.length);
