import compression from 'astro-compressor';
import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import robots from 'astro-robots-txt';
import sentry from '@sentry/astro';
import sitemap from '@astrojs/sitemap';

const astro = defineConfig({
    adapter: netlify({ cacheOnDemandPages: true }),
    integrations: [
        react({ include: ['**/*.tsx'] }),
        sentry({
            dsn: process.env.SENTRY_DSN,
            sourceMapsUploadOptions: { authToken: process.env.SENTRY_AUTH_TOKEN },
        }),
        robots({}),
        sitemap({ lastmod: new Date }),
        compression({}),
    ],
    output: 'server',
    site: 'https://k-astro.netlify.app',
});

export default astro;
