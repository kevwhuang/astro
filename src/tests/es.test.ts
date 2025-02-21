import { expect, test } from '@playwright/test';

import { exists } from '@/utils/_all';

test.beforeEach(async ({ page }) => {
    await page.goto('/es');
});

test('page', async ({ page }) => {
    await expect(page).toHaveTitle('Astro');
    await exists(page, 'navigation');
    await expect(page.locator('main>section')).toHaveCount(1);
    await exists(page, 'contentinfo');
});

test('section 1', async ({ page }) => {
    await exists(page, 'heading', 'hola astro');
});
