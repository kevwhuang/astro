import rss, { pagesGlobToRssItems } from '@astrojs/rss';

async function GET(): Promise<Response> {
    return rss({
        customData: '<language>en-us</language>',
        description: 'Welcome to my first Astro website.',
        items: await pagesGlobToRssItems(import.meta.glob('./**/*.md')),
        site: (await import('astro.config.mjs')).default.site!,
        stylesheet: '/pretty-feed-v3.xsl',
        title: 'Astro',
        trailingSlash: false,
    });
}

export { GET };
