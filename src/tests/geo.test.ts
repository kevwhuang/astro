import { expect, test } from '@playwright/test';

import exists from '@/utils/exists';

test.beforeEach(async ({ page }) => {
    await page.goto('/geo');
});

test('page', async ({ page }) => {
    await expect(page).toHaveTitle('Geo');
    await expect(page.locator('css=main>section')).toHaveCount(0);
});

test('section 1', async ({ page }) => {
    await exists(page, 'link', 'home');
});
