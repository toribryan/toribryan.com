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
      audience: z.string().optional(),
      role: z.string().optional(),
      team: z.string().optional(),
      type: z.string().optional(),
      status: z.string().optional(),
      liveUrl: z.string().optional(),
      panelColor: z.string().optional(),
      timeline: z.string().optional(),
      stack: z.string().optional(),
      problem: z.string().optional(),
      task: z.string().optional(),
      process: z.string().optional(),
      outcome: z.string().optional(),
      caseStudy: z.boolean().default(true),
      order: z.number().optional(),
      placeholderImages: z.number().min(1).max(6).optional(),
      heroSrc: z.string().optional(),
      gallery: z.array(z.string()).optional(),
      cardSize: z.enum(['Feature', 'Large', 'Wide', 'Tall', 'Small']).default('Wide'),
      thumbnail: image().optional(),
      hero: image().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { work };
