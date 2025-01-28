import { expect, test } from '@playwright/test';

import { exists } from '@/utils/_all';

test.beforeEach(async ({ page }) => {
    await page.goto('/react');
});

test('page', async ({ page }) => {
    await expect(page).toHaveTitle('React');
    await exists(page, 'navigation');
    await exists(page, 'contentinfo');
    await expect(page.locator('css=main>astro-island>section')).toHaveCount(1);
});

test('section 1', async ({ browserName, page }) => {
    if (browserName === 'chromium') {
        await expect(page.getByTestId('fidget-spinner-svg')).toBeVisible();
    }

    await page.getByRole('button').click();
    await expect(page.getByText('check url')).toBeVisible();
    await page.getByRole('textbox').fill('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    await page.getByRole('button').click();
    await expect(page.getByText('processing')).toBeVisible();
    await expect(page.getByText('success')).toBeVisible();
});
