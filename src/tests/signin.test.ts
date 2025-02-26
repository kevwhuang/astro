import 'dotenv/config';
import { expect, test } from '@playwright/test';

import { exists } from '@/utils/_all';

test.beforeEach(async ({ page }) => {
    await page.goto('/signin');
});

test('page', async ({ page }) => {
    await expect(page).toHaveTitle('Sign In');
    await exists(page, 'navigation');
    await expect(page.locator('main>section')).toHaveCount(1);
    await exists(page, 'contentinfo');
});

test('section 1', async ({ page }) => {
    await expect(page.getByLabel('email')).toBeVisible();
    await exists(page, 'textbox', 'email');
    await expect(page.getByLabel('password')).toBeVisible();
    await exists(page, 'textbox', 'password');
    await exists(page, 'button', 'sign in');
    await exists(page, 'button', 'register');
});

test('button: sign in', async ({ context, page }) => {
    await page.getByRole('textbox', { name: 'email' }).fill(process.env.PLAYWRIGHT_EMAIL!);
    await page.getByRole('textbox', { name: 'password' }).fill('12345678');
    await page.getByRole('button', { name: 'sign in' }).click();
    await expect(page.getByText('email and password')).toBeVisible();
    await page.getByRole('textbox', { name: 'password' }).fill(process.env.PLAYWRIGHT_PASSWORD!);
    await page.getByRole('button', { name: 'sign in' }).click();
    await expect(page.getByText('you are now signed in')).toBeVisible();
    await page.waitForURL('/dashboard');
    expect((await context.cookies()).filter(e => e.name === 'sb-access-token')).toHaveLength(1);
    expect((await context.cookies()).filter(e => e.name === 'sb-refresh-token')).toHaveLength(1);
    await page.goto('/signin');
    await page.waitForURL('/dashboard');
});

test('button: register', async ({ page }) => {
    await page.getByRole('textbox', { name: 'email' }).fill(process.env.PLAYWRIGHT_EMAIL!);
    await page.getByRole('textbox', { name: 'password' }).fill('12345678');
    await page.getByRole('button', { name: 'register' }).click();
    await expect(page.getByText('password must contain')).toBeVisible();
    await page.getByRole('textbox', { name: 'password' }).fill('1234qwer');
    await page.getByRole('button', { name: 'register' }).click();
    await expect(page.getByText('thank you for registering')).toBeVisible();
});
