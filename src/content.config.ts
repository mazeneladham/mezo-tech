/**
 * Content collections (Astro 7: src/content.config.ts + glob loader).
 *
 *  - blog      -> src/content/blog/**.md
 *  - projects  -> src/content/projects/**.md
 *  - pages     -> src/content/pages/*.md   (the About page copy)
 *
 * Every entry declares its own `language` and a stable `translationKey`.
 * Entries that share a translationKey (one `en`, one `ar`) are treated as
 * translations of each other. An entry may exist in only one language.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { categoryIds } from './data/taxonomy';

/** YAML `updatedDate:` with no value parses as null; treat that as "not set". */
const optionalDate = z.preprocess((v) => (v === null || v === '' ? undefined : v), z.coerce.date().optional());
const optionalString = z.preprocess((v) => (v === null || v === '' ? undefined : v), z.string().optional());

const slugRule = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers and hyphens only (e.g. "my-first-post").');

const base = {
  language: z.enum(['en', 'ar']),
  /** Same value in the English and Arabic versions of one piece of content. */
  translationKey: slugRule,
  /** Optional URL slug. Defaults to the file name. */
  slug: slugRule.optional(),
  draft: z.boolean().default(false),
  /** Marks template sample content; shows an "Example" badge. Remove when you replace it. */
  example: z.boolean().default(false),
};

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    ...base,
    title: z.string().min(1),
    description: z.string().min(10).max(320),
    pubDate: z.coerce.date(),
    updatedDate: optionalDate,
    category: z.enum(categoryIds),
    tags: z.array(z.string()).default([]),
    /** Path under /public, e.g. /images/blog/my-cover.webp. Optional; a missing file is ignored. */
    cover: optionalString,
    coverAlt: optionalString,
    featured: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    ...base,
    title: z.string().min(1),
    description: z.string().min(10).max(320),
    category: z.enum(categoryIds),
    technologies: z.array(z.string()).default([]),
    status: z.enum(['idea', 'in-progress', 'completed', 'paused']).optional(),
    featured: z.boolean().default(false),
    /** Lower numbers first among featured projects. */
    order: z.number().default(100),
    startDate: optionalDate,
    endDate: optionalDate,
    cover: optionalString,
    coverAlt: optionalString,
    /** Only set these when they are real; empty values render nothing. */
    github: optionalString,
    demo: optionalString,
    /** translationKeys of related blog posts / projects. */
    relatedPosts: z.array(z.string()).default([]),
    relatedProjects: z.array(z.string()).default([]),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    language: z.enum(['en', 'ar']),
    translationKey: slugRule,
    title: z.string().min(1),
    description: z.string().min(10).max(320),
  }),
});

export const collections = { blog, projects, pages };
