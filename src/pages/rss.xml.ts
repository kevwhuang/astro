import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

const GET: APIRoute = async () => {
    const posts = (await getCollection('posts'))
        .sort((a: Post, b: Post) => a.id.localeCompare(b.id));

    const items = posts.map((e: Post) => ({
        description: e.data.description,
        link: `/posts/${e.id}`,
        pubDate: e.data.pubDate,
        title: e.data.title,
    }));

    return rss({
        customData: '<language>en-us</language>',
        description: 'Welcome to my first Astro website.',
        items,
        site: (await import('astro.config.mjs')).default.site!,
        stylesheet: '/pretty-feed-v3.xsl',
        title: 'Astro',
    });
};

export { GET };
