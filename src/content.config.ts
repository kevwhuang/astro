import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
    loader: glob({ base: 'src/content/posts', pattern: '**/[^_]*.md' }),
    schema: z.object({
        author: z.string(),
        categories: z.array(z.string()),
        description: z.string(),
        image: z.object({
            alt: z.string().nullable(),
            src: z.string().nullable(),
        }),
        pubDate: z.date(),
        title: z.string(),
    }),
});

const collections = {
    posts,
};

export { collections };
