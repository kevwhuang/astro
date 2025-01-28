import { expect, test } from '@playwright/test';

import exists from '@/utils/exists';

test.beforeEach(async ({ page }) => {
    await page.goto('/404');
});

test('page', async ({ page }) => {
    await expect(page).toHaveTitle('404');
    await exists(page, 'navigation');
    await exists(page, 'contentinfo');
    await expect(page.locator('css=main>section')).toHaveCount(1);
});

test('section 1', async ({ page }) => {
    await exists(page, 'heading', '404');
});
