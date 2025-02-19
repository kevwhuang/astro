import { expect, test } from '@playwright/test';

import { exists } from '@/utils/_all';

test.beforeEach(async ({ page }) => {
    await page.goto('/test');
});

test('page', async ({ page }) => {
    await expect(page).toHaveTitle('Test');
    await exists(page, 'navigation');
    await expect(page.locator('main>section')).toHaveCount(1);
    await exists(page, 'contentinfo');
});
