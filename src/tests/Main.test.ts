import { expect, test } from '@playwright/test';

import { exists, nonexists } from '@/utils/_all';

const links = ['home', 'api', 'blog', 'react', 'server', 'misc'];

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('navbar', async ({ page }) => {
    await exists(page, 'navigation');
    await expect(page.locator('nav>div.c-hamburger')).toBeHidden();
    const promises1: Promise<void>[] = [];
    links.forEach(e => promises1.push(exists(page, 'link', e)));
    await Promise.all(promises1);
    await page.setViewportSize({ height: 720, width: 480 });
    await expect(page.locator('nav>div.c-hamburger')).toBeVisible();
    const promises2: Promise<void>[] = [];
    links.forEach(e => promises2.push(nonexists(page, 'link', e)));
    await Promise.all(promises2);
    await page.locator('nav>div.c-hamburger').click();
    const promises3: Promise<void>[] = [];
    links.forEach(e => promises3.push(exists(page, 'link', e)));
    await Promise.all(promises3);
});

test('footer', async ({ page }) => {
    await exists(page, 'contentinfo');
    await expect(page.locator('footer>astro-island>p')).toBeVisible();
    await exists(page, 'link', 'github');
    await exists(page, 'link', 'youtube');
    await exists(page, 'link', 'twitter');
    await expect(page.locator('footer>div>svg')).toBeVisible();
    await expect(page.getByText('0')).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.locator('footer>div>svg').click();
    await expect(page.getByText('1')).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await page.locator('footer>div>svg').click();
    await expect(page.getByText('2')).toBeVisible();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
});
