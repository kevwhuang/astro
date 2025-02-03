import { expect, test } from '@playwright/test';

import { exists } from '@/utils/_all';

test.beforeEach(async ({ page }) => {
    await page.goto('/404');
});

test('page', async ({ page }) => {
    await expect(page).toHaveTitle('404');
    await exists(page, 'navigation');
    await expect(page.locator('css=main>section')).toHaveCount(1);
    await exists(page, 'contentinfo');
});

test('section 1', async ({ page }) => {
    await exists(page, 'heading', '404');
});
