import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/signout');
});

test('page', async ({ context, page }) => {
    await page.waitForURL('/');
    expect(await context.cookies()).toHaveLength(0);
});
