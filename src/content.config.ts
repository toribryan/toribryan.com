import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      excerpt: z.string(),
      category: z.string().optional(),
      company: z.string().optional(),
      // Shown instead of `company` in the category-page module card for
      // internal explorations that aren't scoped to a company relationship.
      audience: z.string().optional(),
      role: z.string().optional(),
      team: z.string().optional(),
      // Short project-type label shown as the third fact on the category-page
      // module card (e.g. "Product Surface", "New Product Suite").
      type: z.string().optional(),
      timeline: z.string().optional(),
      stack: z.string().optional(),
      problem: z.string().optional(),
      task: z.string().optional(),
      process: z.string().optional(),
      outcome: z.string().optional(),
      // False for modules shown on a category page that don't have their own
      // case study page yet — hides the "Read full case study" CTA, swaps the
      // module's 4th tab from Outcome to Team, and excludes the entry from
      // [slug].astro's static paths.
      caseStudy: z.boolean().default(true),
      // Explicit sort position for the tabbed Product Design module list.
      // Entries without one sort after all ordered entries, in collection order.
      order: z.number().optional(),
      // Number of gray placeholder slides to show in the category-page module
      // carousel when there's no real heroSrc/gallery imagery yet (1 = a
      // static image with no carousel controls).
      placeholderImages: z.number().min(1).max(6).optional(),
      cardSize: z.enum(['Feature', 'Large', 'Wide', 'Tall', 'Small']).default('Wide'),
      thumbnail: image().optional(),
      hero: image().optional(),
      // Plain public/ URL, used instead of `hero` for assets that shouldn't go
      // through Astro's Sharp-based optimization (e.g. complex Figma-exported
      // SVGs with masks/patterns that Sharp/librsvg silently rasterizes blank).
      // A z.union([image(), z.string()]) on `hero` doesn't work for this: the
      // image() branch eagerly resolves any string as a project asset import
      // before Zod can fall through to the string branch, so it 404s instead.
      heroSrc: z.string().optional(),
      // Additional public/ image URLs for the category-page module carousel,
      // shown alongside heroSrc. Same rationale as heroSrc — plain strings,
      // no Sharp processing.
      gallery: z.array(z.string()).optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { work };
