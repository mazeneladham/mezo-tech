/**
 * Post-build validation: run `npm run build && npm run validate`.
 * Checks dist/ for broken local links/assets, drafts leaking, hreflang to missing pages,
 * sitemap/RSS sanity and placeholder leaks. Exits non-zero on any failure.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
if (!existsSync(dist)) { console.error('dist/ not found — run "npm run build" first.'); process.exit(1); }

const trimmed = (process.env.BASE_PATH || '/').replace(/^\/+|\/+$/g, '');
const base = trimmed ? `/${trimmed}` : '';
const site = (process.env.SITE_URL || 'https://USERNAME.github.io').replace(/\/+$/, '').toLowerCase();

const walk = (d) => readdirSync(d).flatMap((f) => { const p = path.join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const files = walk(dist);
const html = files.filter((f) => f.endsWith('.html'));
const errors = [];
const fail = (m) => errors.push(m);

const exists = (urlPath) => {
  let p = decodeURI(urlPath.split('#')[0].split('?')[0]);
  if (base && (p === base || p.startsWith(base + '/'))) p = p.slice(base.length) || '/';
  else if (base) return 'outside-base';
  const full = path.join(dist, p);
  return existsSync(full) && (statSync(full).isFile() || existsSync(path.join(full, 'index.html')));
};

for (const f of html) {
  const rel = path.relative(dist, f);
  const src = readFileSync(f, 'utf8');
  for (const m of src.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const u = m[1];
    if (/^(https?:|mailto:|tel:|data:|#|\/\/)/.test(u)) continue;
    if (u.startsWith('/')) {
      const r = exists(u);
      if (r === 'outside-base') fail(`${rel}: root-relative URL outside base: ${u}`);
      else if (!r) fail(`${rel}: broken local link ${u}`);
    }
  }
  // hreflang targets must exist
  for (const m of src.matchAll(/hreflang="[^"]+" href="([^"]+)"/g)) {
    try { const u = new URL(m[1]); if (u.origin.toLowerCase() === site && exists(u.pathname) !== true) fail(`${rel}: hreflang target missing ${m[1]}`); } catch {}
  }
  if (!/<html lang="(en|ar)" dir="(ltr|rtl)"/.test(src)) fail(`${rel}: missing lang/dir on <html>`);
  if (/PLACEHOLDER_/.test(src) && !rel.startsWith('404')) fail(`${rel}: unconfigured placeholder leaked into the page`);
  const lang = /<html lang="(\w+)"/.exec(src)?.[1];
  const dir = /<html lang="\w+" dir="(\w+)"/.exec(src)?.[1];
  if ((lang === 'ar') !== (dir === 'rtl')) fail(`${rel}: lang/dir mismatch (${lang}/${dir})`);
}

// Drafts must not be built
for (const f of html) {
  if (/draft-article-template/.test(f)) fail(`draft page built: ${f}`);
}
for (const f of ['sitemap.xml', 'ar/search-index.json', 'search-index.json', 'rss.xml', 'ar/rss.xml']) {
  const p = path.join(dist, f);
  if (!existsSync(p)) { fail(`missing ${f}`); continue; }
  if (/draft-article-template|DRAFT/i.test(readFileSync(p, 'utf8'))) fail(`draft referenced in ${f}`);
}
for (const f of ['robots.txt', 'site.webmanifest', '404.html', 'favicon.ico']) if (!existsSync(path.join(dist, f))) fail(`missing ${f}`);

// sitemap URLs must map to built pages
const sm = existsSync(path.join(dist, 'sitemap.xml')) ? readFileSync(path.join(dist, 'sitemap.xml'), 'utf8') : '';
for (const m of sm.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const u = new URL(m[1]);
  if (exists(u.pathname) !== true) fail(`sitemap lists a URL that was not built: ${m[1]}`);
  if (!m[1].toLowerCase().startsWith(site)) fail(`sitemap URL not on configured site: ${m[1]}`);
}

console.log(`Checked ${html.length} HTML files.`);
if (errors.length) { console.error(`\n${errors.length} problem(s):\n- ` + errors.slice(0, 60).join('\n- ')); process.exit(1); }
console.log('Validation passed.');
