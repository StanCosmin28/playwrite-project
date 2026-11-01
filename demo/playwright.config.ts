import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://demo.playwright.dev',
    trace: 'on', // pentru demo: trace la fiecare test, ca să-l poți deschide live
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // Decomentează pentru demo cross-browser (necesită: npx playwright install firefox webkit)
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    // { name: 'mobile', use: { ...devices['iPhone 15 Pro'] } },
  ],
});
