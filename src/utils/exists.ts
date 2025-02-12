import { type Page, expect } from '@playwright/test';

async function exists(page: Page, role: Role, name = ''): Promise<void> {
    await expect(page.getByRole(role, { name })).toBeVisible();
}

export default exists;
