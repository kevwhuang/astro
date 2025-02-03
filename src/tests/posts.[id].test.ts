import { expect, test } from '@playwright/test';

import { exists, nonexists } from '@/utils/_all';

test.beforeEach(async ({ page }) => {
    await page.goto('/posts/01');
});

test('page', async ({ page }) => {
    await expect(page).toHaveTitle(/./u);
    await exists(page, 'navigation');
    await expect(page.locator('css=main>section')).toHaveCount(1);
    await nonexists(page, 'contentinfo');
});

test('section 1', async ({ page }) => {
    const text = await page.locator('css=main>section').first().textContent();
    expect(text).toBeTruthy();
    await expect(page.locator('css=main>section>img')).toBeVisible();
});
