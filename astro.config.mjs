import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

const astro = defineConfig({
    adapter: netlify({
        cacheOnDemandPages: true,
    }),
    integrations: [
        react({ include: ['**/*.tsx'] }),
        sitemap({ lastmod: new Date }),
    ],
    output: 'server',
    site: 'https://k-astro.netlify.app',
});

export default astro;
