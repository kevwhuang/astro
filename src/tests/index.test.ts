import { expect, test } from '@playwright/test';

import { exists } from '@/utils/_all';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('page', async ({ page }) => {
    await expect(page).toHaveTitle('Astro');
    await exists(page, 'navigation');
    await exists(page, 'contentinfo');
    await expect(page.locator('css=main>section')).toHaveCount(1);
});

test('section 1', async ({ page }) => {
    await exists(page, 'heading', 'hello astro');
});
