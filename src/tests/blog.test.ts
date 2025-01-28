import { expect, test } from '@playwright/test';

import { exists } from '@/utils/_all';

test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
});

test('page', async ({ page }) => {
    await expect(page).toHaveTitle('Blog');
    await exists(page, 'navigation');
    await exists(page, 'contentinfo');
    await expect(page.locator('css=main>section')).toHaveCount(2);
});

test('section 1', async ({ page }) => {
    await exists(page, 'heading', 'tags');
});

test('section 2', async ({ page }) => {
    await exists(page, 'heading', 'posts');
});
