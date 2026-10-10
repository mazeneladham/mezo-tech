/**
 * Rehype plugin: prefixes root-relative URLs in Markdown content with the
 * site's base path, so `![x](/images/blog/a.webp)` and `[About](/about/)`
 * keep working when the site is hosted under /REPOSITORY/.
 *
 * Absolute (https://...), protocol-relative (//...), hash (#...) and
 * already-prefixed URLs are left untouched.
 */
export function rehypeBase(options = {}) {
  const base = (options.base || '/').replace(/\/+$/, ''); // '' or '/repo'

  const fix = (value) => {
    if (typeof value !== 'string' || !base) return value;
    if (!value.startsWith('/') || value.startsWith('//')) return value;
    if (value === base || value.startsWith(base + '/')) return value;
    return base + value;
  };

  const walk = (node) => {
    if (node.type === 'element' && node.properties) {
      if (node.properties.src) node.properties.src = fix(node.properties.src);
      if (node.properties.href) node.properties.href = fix(node.properties.href);
    }
    if (node.children) node.children.forEach(walk);
  };

  return (tree) => walk(tree);
}
