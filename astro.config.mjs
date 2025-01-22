import compression from 'astro-compressor';
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import netlify from '@astrojs/netlify';
import pwa from '@vite-pwa/astro';
import react from '@astrojs/react';
import robots from 'astro-robots-txt';
import sentry from '@sentry/astro';
import sitemap from '@astrojs/sitemap';
import ssl from '@vitejs/plugin-basic-ssl';

const env = loadEnv('production', process.cwd(), '');

const astro = defineConfig({
    adapter: netlify({ cacheOnDemandPages: true }),
    integrations: [
        ssl({}),
        react({ include: ['**/*.tsx'] }),
        sentry({
            dsn: env.SENTRY_DSN,
            sourceMapsUploadOptions: {
                authToken: env.SENTRY_AUTH_TOKEN,
                project: 'astro',
                telemetry: false,
            },
        }),
        robots({}),
        sitemap({ lastmod: new Date }),
        pwa({ manifest: { theme_color: 'white' } }),
        compression({}),
    ],
    output: 'server',
    site: 'https://k-astro.netlify.app',
});

export default astro;
