import { existsSync } from 'node:fs';
import path from 'node:path';
import { withBase } from './url';

/**
 * Optional assets live in /public. These helpers check at BUILD time whether
 * a file really exists, so a missing photo, cover image or CV never produces
 * a broken <img> or a dead download link.
 */
const publicDir = path.resolve(process.cwd(), 'public');

export function publicFileExists(publicPath: string | undefined | null): boolean {
  if (!publicPath) return false;
  const rel = publicPath.replace(/^\/+/, '');
  if (rel.includes('..')) return false;
  return existsSync(path.join(publicDir, rel));
}

/** Returns the base-aware URL of a public file, or undefined if it does not exist. */
export function optionalAsset(publicPath: string | undefined | null): string | undefined {
  return publicFileExists(publicPath) ? withBase(publicPath as string) : undefined;
}
