import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
    const data = (await getCollection('posts'))
        .sort((a: Post, b: Post) => a.id.localeCompare(b.id))
        .map((e: Post) => `${e.id}: ${e.digest}`)
        .join`\n`;

    return new Response(data);
};
