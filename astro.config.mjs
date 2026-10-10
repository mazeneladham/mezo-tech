// @ts-check
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import { rehypeBase } from './src/plugins/rehype-base.mjs';

/**
 * DEPLOYMENT SETTINGS
 * -------------------
 * Both values come from environment variables so the same code works for:
 *   A) a project repository  -> https://USERNAME.github.io/REPOSITORY/
 *   B) a user/org repository -> https://USERNAME.github.io/
 *
 * The GitHub Actions workflow (.github/workflows/deploy.yml) sets them
 * automatically. For local builds you can override them, e.g.:
 *   SITE_URL=https://alice.github.io BASE_PATH=/my-site npm run build
 *
 * SITE_URL  = the origin only (no path), e.g. https://USERNAME.github.io
 *             or your custom domain, e.g. https://mezotech.dev
 * BASE_PATH = '/' for user sites / custom domains, '/REPOSITORY' for project sites
 */
const SITE_URL = (process.env.SITE_URL || 'https://USERNAME.github.io').replace(/\/+$/, '');
const trimmedBase = (process.env.BASE_PATH || '/').replace(/^\/+|\/+$/g, '');
const BASE = trimmedBase ? `/${trimmedBase}` : '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE,
  output: 'static',
  trailingSlash: 'always',
  build: { format: 'directory' },
  compressHTML: true,
  markdown: {
    shikiConfig: {
      // Two themes; CSS picks one based on the active site theme.
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
      wrap: false,
    },
    // Lets authors write /images/foo.webp in Markdown without worrying about the base path.
    processor: unified({ rehypePlugins: [[rehypeBase, { base: BASE }]] }),
  },
});
