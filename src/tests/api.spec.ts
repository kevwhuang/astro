import { expect, test } from '@playwright/test';

import { exists } from '@/utils/_all';

test.beforeEach(async ({ page }) => {
    await page.goto('/api');
});

test('text', async ({ context, page }) => {
    await page.getByRole('link', { name: 'text' }).click();
    const newPage = await context.waitForEvent('page');
    await expect(newPage).toHaveTitle('');
    await expect(newPage.locator('pre')).toHaveCount(1);
});

test('json', async ({ context, page }) => {
    await page.getByRole('link', { name: 'json' }).click();
    const newPage = await context.waitForEvent('page');
    await expect(newPage).toHaveTitle('');
    await expect(newPage.locator('pre')).toHaveCount(1);
});

test('html', async ({ context, page }) => {
    await page.getByRole('link', { name: 'html' }).click();
    const newPage = await context.waitForEvent('page');
    await expect(newPage).toHaveTitle('Edge');
    await expect(newPage.locator('main')).toHaveCount(1);
});

test('image', async ({ context, page }) => {
    await page.getByRole('link', { name: 'image' }).click();
    const newPage = await context.waitForEvent('page');
    expect(await newPage.title()).toContain('image');
    await exists(newPage, 'img');
});

test('audio', async ({ browserName, context, page }) => {
    await page.getByRole('link', { name: 'audio' }).click();

    if (browserName === 'chromium') {
        const newPage = await context.waitForEvent('page');
        await expect(newPage.locator('video')).toHaveCount(1);
    }
});

test('video', async ({ context, page }) => {
    await page.getByRole('link', { name: 'video' }).click();
    const newPage = await context.waitForEvent('page');
    await expect(newPage.locator('video')).toHaveCount(1);
});
