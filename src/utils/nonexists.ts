import { type Page, expect } from '@playwright/test';

async function nonexists(page: Page, role: Role, name = ''): Promise<void> {
    await expect(page.getByRole(role, { name })).toBeHidden();
}

export default nonexists;
