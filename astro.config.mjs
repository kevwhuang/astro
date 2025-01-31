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

const manifest = {
    background_color: '#fdf0d5',
    description: 'Welcome to my first Astro website.',
    display: 'standalone',
    icons: [
        {
            purpose: 'any',
            sizes: '192x192',
            src: '/pwa-192x192.png',
            type: 'image/png',
        }, {
            purpose: 'any',
            sizes: '512x512',
            src: '/pwa-512x512.png',
            type: 'image/png',
        }, {
            purpose: 'maskable',
            sizes: '512x512',
            src: '/pwa-maskable-512x512.png',
            type: 'image/png',
        },
    ],
    name: 'Astro',
    orientation: 'any',
    short_name: 'Astro',
    theme_color: '#fdf0d5',
};

const redirects = {
    '/home': '/',
};

const astro = defineConfig({
    adapter: netlify({ cacheOnDemandPages: true, edgeMiddleware: true }),
    experimental: { svg: true },
    integrations: [
        ssl(),
        react({ include: ['**/*.tsx'] }),
        sentry({
            dsn: env.SENTRY_DSN,
            sourceMapsUploadOptions: {
                authToken: env.SENTRY_AUTH_TOKEN,
                project: 'astro',
                telemetry: false,
            },
        }),
        robots(),
        sitemap({ lastmod: new Date }),
        pwa({
            includeAssets: ['apple-touch-icon-180x180.png', 'favicon.ico', 'favicon.svg'],
            manifest,
            registerType: 'autoUpdate',
        }),
        compression(),
    ],
    output: 'static',
    redirects,
    site: 'https://k-astro.netlify.app',
});

export default astro;
