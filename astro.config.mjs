import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const astro = defineConfig({
    integrations: [sitemap({ lastmod: new Date() })],
    site: 'https://k-astro.netlify.app',
});

export default astro;
