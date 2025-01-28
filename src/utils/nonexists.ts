import { type Page, expect } from '@playwright/test';

type Role = 'button' | 'contentinfo' | 'heading' | 'img' | 'link' | 'navigation' | 'textbox';

async function nonexists(page: Page, role: Role, name = ''): Promise<void> {
    await expect(page.getByRole(role, { name })).toBeHidden();
}

export default nonexists;
