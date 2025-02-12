import { expect, test } from '@playwright/test';

import { exists } from '@/utils/_all';

test.beforeEach(async ({ page }) => {
    await page.goto('/geo');
});

test('page', async ({ page }) => {
    await expect(page).toHaveTitle('Geo');
    await expect(page.locator('css=main>section')).toHaveCount(1);
    await exists(page, 'link', 'home');
});
