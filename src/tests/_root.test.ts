import { expect, test } from '@playwright/test';

import { exists, nonexists } from '@/utils/_all';

const links = ['home', 'api', 'blog', 'react', 'server', 'config', 'edge'];

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('navbar', async ({ page }) => {
    await exists(page, 'navigation');
    await expect(page.locator('css=div.c-hamburger')).toBeHidden();
    const promises1: Promise<void>[] = [];
    links.forEach(e => promises1.push(exists(page, 'link', e)));
    await Promise.all(promises1);
    await page.setViewportSize({ height: 720, width: 480 });
    await expect(page.locator('css=div.c-hamburger')).toBeVisible();
    const promises2: Promise<void>[] = [];
    links.forEach(e => promises2.push(nonexists(page, 'link', e)));
    await Promise.all(promises2);
    await page.locator('css=div.c-hamburger').click();
    const promises3: Promise<void>[] = [];
    links.forEach(e => promises3.push(exists(page, 'link', e)));
    await Promise.all(promises3);
});

test('footer', async ({ page }) => {
    await exists(page, 'contentinfo');
    await exists(page, 'link', 'github');
    await exists(page, 'link', 'youtube');
    await exists(page, 'link', 'twitter');
    await expect(page.locator('css=footer>svg')).toBeVisible();
});
