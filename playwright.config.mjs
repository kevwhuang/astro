import { defineConfig, devices } from '@playwright/test';

const playwright = defineConfig({
    fullyParallel: true,
    globalTimeout: 600000,
    outputDir: '.playwright',
    projects: [
        { name: 'Chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'Firefox', use: { ...devices['Desktop Firefox'] } },
    ],
    reporter: [
        ['html', { open: 'never', outputFolder: '.playwright' }],
        ['list'],
    ],
    retries: 3,
    testDir: 'src/tests',
    testMatch: '*.{test,spec}.ts',
    timeout: 60000,
    use: {
        baseURL: 'https://localhost:5000',
        headless: true,
        ignoreHTTPSErrors: true,
        locale: 'en-us',
        permissions: ['geolocation', 'notifications'],
    },
    webServer: {
        command: 'bun start',
        ignoreHTTPSErrors: true,
        reuseExistingServer: true,
        timeout: 120000,
        url: 'https://localhost:5000',
    },
});

export default playwright;
