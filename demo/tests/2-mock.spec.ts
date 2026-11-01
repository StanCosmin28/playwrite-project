import { test, expect } from '@playwright/test';

// DEMO 2 — intercept the API and answer it ourselves (no backend needed)
test('shows fruits from a mocked API', async ({ page }) => {
  await page.route('*/**/api/v1/fruits', async route => {
    await route.fulfill({
      json: [{ name: 'Mango', id: 1 }, { name: 'Playwright Kiwi', id: 2 }],
    });
  });

  await page.goto('/api-mocking');

  await expect(page.getByText('Mango')).toBeVisible();
  await expect(page.getByText('Playwright Kiwi')).toBeVisible();
});
