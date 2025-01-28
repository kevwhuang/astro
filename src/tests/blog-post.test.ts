import { expect, test } from '@playwright/test';

import exists from '@/utils/exists';

let target = false;

test.beforeEach(async ({ page }) => {
    await page.goto('/blog');

    const elements = await page
        .locator('css=main>section')
        .locator('nth=1')
        .getByRole('link')
        .all();

    if (!elements[0]) return;
    target = true;
    await elements[0].click();
});

test('page', async ({ page }) => {
    if (!target) return;
    await expect(page).toHaveTitle(/./u);
    await exists(page, 'navigation');
    await expect(page.locator('css=main>section')).toHaveCount(1);
});

test('section 1', async ({ page }) => {
    if (!target) return;
    const text = await page.locator('css=main>section').first().textContent();
    expect(text).toBeTruthy();
});
