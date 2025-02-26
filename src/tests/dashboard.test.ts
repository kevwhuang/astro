import 'dotenv/config';
import { expect, test } from '@playwright/test';

import { exists } from '@/utils/_all';

test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('textbox', { name: 'email' }).fill(process.env.PLAYWRIGHT_EMAIL!);
    await page.getByRole('textbox', { name: 'password' }).fill(process.env.PLAYWRIGHT_PASSWORD!);
    await page.getByRole('button', { name: 'sign in' }).click();
});

test('page', async ({ page }) => {
    await expect(page).toHaveTitle('Dashboard');
    await exists(page, 'navigation');
    await expect(page.locator('main>section')).toHaveCount(1);
    await exists(page, 'contentinfo');
});

test('section 1', async ({ page }) => {
    await expect(page.getByLabel('email')).toBeVisible();
    await exists(page, 'textbox', 'email');
    await expect(page.getByLabel('new password')).toBeVisible();
    await exists(page, 'textbox', 'password');
    await exists(page, 'button', 'save');
});

test('button: save', async ({ page }) => {
    await page.getByRole('textbox', { name: 'password' }).fill('11111111');
    await page.getByRole('button', { name: 'save' }).click();
    await expect(page.getByText('password must contain')).toBeVisible();
    await page.getByRole('textbox', { name: 'password' }).fill('1234qwer');
    await page.getByRole('button', { name: 'save' }).click();
    await expect(page.getByText('password has been updated')).toBeVisible();
    await page.getByRole('button', { name: 'save' }).click();
    await expect(page.getByText('different password')).toBeVisible();
    await page.getByRole('textbox', { name: 'password' }).fill(process.env.PLAYWRIGHT_PASSWORD!);
    await page.getByRole('button', { name: 'save' }).click();
    await expect(page.getByText('password has been updated')).toBeVisible();
});
