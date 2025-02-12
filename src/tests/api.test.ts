import { expect, test } from '@playwright/test';

import { exists } from '@/utils/_all';

test.beforeEach(async ({ page }) => {
    await page.goto('/api');
});

test('page', async ({ page }) => {
    await expect(page).toHaveTitle('API');
    await exists(page, 'navigation');
    await expect(page.locator('css=main>section')).toHaveCount(1);
    await exists(page, 'contentinfo');
});

test('section 1', async ({ page }) => {
    await exists(page, 'heading', 'routes');
    await exists(page, 'link', 'text');
    await exists(page, 'link', 'json');
    await exists(page, 'link', 'html');
    await exists(page, 'link', 'image');
    await exists(page, 'link', 'audio');
    await exists(page, 'link', 'video');
});
