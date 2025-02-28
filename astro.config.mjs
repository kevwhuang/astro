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
import tailwind from '@tailwindcss/vite';

const env = loadEnv('production', process.cwd(), '');

const redirects = {
    '/home': '/',
    '/posts': '/blog',
};

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

const integrations = [
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
];

const astro = defineConfig({
    adapter: netlify({
        cacheOnDemandPages: false,
        edgeMiddleware: true,
        imageCDN: false,
    }),
    base: '.',
    build: {
        assets: '_assets',
        assetsPrefix: '',
        client: '_client',
        concurrency: 1,
        format: 'directory',
        inlineStylesheets: 'auto',
        redirects: true,
        server: '_server',
    },
    cacheDir: '.astro',
    compressHTML: true,
    devToolbar: { enabled: false },
    env: { schema: {}, validateSecrets: true },
    experimental: {
        clientPrerender: true,
        contentIntellisense: true,
        responsiveImages: true,
        serializeConfig: true,
        svg: true,
    },
    i18n: {
        defaultLocale: 'en',
        fallback: { es: 'en' },
        locales: ['en', 'es'],
        routing: {
            fallbackType: 'rewrite',
            prefixDefaultLocale: false,
            redirectToDefaultLocale: true,
        },
    },
    image: {
        experimentalLayout: 'responsive',
        experimentalObjectFit: 'cover',
        experimentalObjectPosition: 'center',
    },
    integrations,
    markdown: {
        gfm: true,
        rehypePlugins: [],
        remarkPlugins: [],
        remarkRehype: {},
        shikiConfig: { theme: 'dark-plus' },
        smartypants: true,
        syntaxHighlight: 'shiki',
    },
    outDir: 'dist',
    output: 'static',
    prefetch: { defaultStrategy: 'hover', prefetchAll: true },
    publicDir: 'public',
    redirects,
    root: '.',
    scopedStyleStrategy: 'attribute',
    security: { checkOrigin: true },
    server: {
        headers: {},
        host: true,
        open: false,
        port: 4321,
    },
    site: 'https://k-astro.netlify.app',
    srcDir: 'src',
    trailingSlash: 'ignore',
    vite: { plugins: [tailwind()] },
});

export default astro;
