import { expect, test } from '@playwright/test';

import { exists } from '@/utils/_all';

test.beforeEach(async ({ page }) => {
    await page.goto('/react');
});

test('page', async ({ page }) => {
    await expect(page).toHaveTitle('React');
    await exists(page, 'navigation');
    await expect(page.locator('css=main>astro-island>section')).toHaveCount(1);
    await exists(page, 'contentinfo');
});

test('section 1', async ({ browserName, page }) => {
    if (browserName === 'chromium') {
        await expect(page.getByTestId('fidget-spinner-svg')).toBeVisible();
    }

    const url = 'https://soundcloud.com/youngbombs/love-like-we-used-to-young-bombs-remix';
    await page.getByRole('button').click();
    await expect(page.getByText('check url')).toBeVisible();
    await page.getByRole('textbox').fill(url);
    await page.getByRole('button').click();
    await expect(page.getByText('processing')).toBeVisible();
    await expect(page.getByText('success')).toBeVisible();
});
