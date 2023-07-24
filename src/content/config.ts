import { defineCollection, z } from 'astro:content';

export const collections = {
	projects: defineCollection({
		schema: z.object({
			title: z.string(),
			description: z.string(),
			publishDate: z.coerce.date(),
			tags: z.array(z.string()),
			img: z.string(),
			img_alt: z.string().optional(),
			children: z.array(z.object({
				title: z.string(),
			})).optional(),
			size: z.string().optional()
		}),
	}),
};

