import { expect, test } from '@playwright/test';

import { exists } from '@/utils/_all';

test.beforeEach(async ({ page }) => {
    await page.goto('/rss.xml');
});

test('page', async ({ page }) => {
    await expect(page).toHaveTitle('Astro RSS Feed');
    await expect(page.locator('div>header>h1')).toHaveText(/rss feed/iu);
    await expect(page.locator('div>header>h1>svg')).toBeVisible();
    await expect(page.locator('div>header>h2')).toHaveText(/astro/iu);
    await exists(page, 'link', 'visit website');
    await expect(page.locator('div>h2')).toHaveText(/recent items/iu);
});
