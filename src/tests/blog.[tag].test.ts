import { expect, test } from '@playwright/test';

import { exists } from '@/utils/_all';

let target = '';

test.beforeEach(async ({ page }) => {
    await page.goto('/blog');

    const elements = await page
        .locator('main>section')
        .first()
        .getByRole('link')
        .all();

    if (!elements[0]) return;
    const text = await elements[0].textContent();
    if (typeof text === 'string') target = text.toLowerCase();
    await elements[0].click();
});

test('page', async ({ page }) => {
    if (!target) return;
    await expect(page).toHaveTitle(`${target} | Blog`);
    await exists(page, 'navigation');
    await expect(page.locator('main>section')).toHaveCount(1);
    await exists(page, 'contentinfo');
});

test('section 1', async ({ page }) => {
    if (!target) return;
    await exists(page, 'heading', target);

    const elements = await page
        .locator('main>section')
        .first()
        .getByRole('link')
        .all();

    expect(elements.length).toBeGreaterThan(0);
});
