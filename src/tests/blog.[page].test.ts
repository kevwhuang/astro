import { expect, test } from '@playwright/test';

import { exists } from '@/utils/_all';

let target = false;

test.beforeEach(async ({ page }) => {
    await page.goto('/blog');

    const elements = await page
        .locator('css=main>section')
        .last()
        .getByRole('link')
        .all();

    if (!elements[0]) return;
    target = true;
    await page.goto('/blog/1');
});

test('page', async ({ page }) => {
    if (!target) return;
    await expect(page).toHaveTitle('Page 1 | Blog');
    await exists(page, 'navigation');
    await expect(page.locator('css=main>section')).toHaveCount(1);
    await exists(page, 'contentinfo');
});

test('section 1', async ({ page }) => {
    await exists(page, 'heading', 'page 1');

    const elements = await page
        .locator('css=main>section')
        .first()
        .getByRole('link')
        .all();

    expect(elements.length).toBeGreaterThan(0);
    await expect(page.locator('css=main>section>div>a')).toHaveCount(4);
});
