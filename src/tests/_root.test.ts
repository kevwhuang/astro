import { expect, test } from '@playwright/test';

import { exists, nonexists } from '@/utils/_all';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('navbar', async ({ page }) => {
    await exists(page, 'navigation');
    await expect(page.locator('css=div.c-hamburger')).toBeHidden();
    await exists(page, 'link', 'home');
    await exists(page, 'link', 'blog');
    await exists(page, 'link', 'react');
    await exists(page, 'link', 'server');
    await exists(page, 'link', 'geo');
    await page.setViewportSize({ height: 720, width: 480 });
    await expect(page.locator('css=div.c-hamburger')).toBeVisible();
    await nonexists(page, 'link', 'home');
    await nonexists(page, 'link', 'blog');
    await nonexists(page, 'link', 'react');
    await nonexists(page, 'link', 'server');
    await nonexists(page, 'link', 'geo');
    await page.locator('css=div.c-hamburger').click();
    await exists(page, 'link', 'home');
    await exists(page, 'link', 'blog');
    await exists(page, 'link', 'react');
    await exists(page, 'link', 'server');
    await exists(page, 'link', 'geo');
});

test('footer', async ({ page }) => {
    await exists(page, 'contentinfo');
    await exists(page, 'link', 'github');
    await exists(page, 'link', 'youtube');
    await exists(page, 'link', 'twitter');
    await expect(page.locator('css=footer>svg')).toBeVisible();
});
