import { expect, test } from '@playwright/test';

import { exists } from '@/utils/_all';

test.beforeEach(async ({ page }) => {
    await page.goto('/misc');
});

test('page', async ({ page }) => {
    await expect(page).toHaveTitle('Misc');
    await exists(page, 'navigation');
    await expect(page.locator('main>section')).toHaveCount(1);
    await exists(page, 'contentinfo');
});

test('section 1', async ({ page }) => {
    await exists(page, 'heading', 'pages');
    await exists(page, 'link', 'config');
    await exists(page, 'link', 'edge');
    await expect(page.getByText(/^es$/iu)).toBeVisible();
    await exists(page, 'link', 'rss.xml');
    await exists(page, 'link', 'test');
});
