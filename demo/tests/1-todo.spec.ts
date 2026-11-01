import { test, expect } from '@playwright/test';

// DEMO 1 — user-facing locators + auto-waiting + web-first assertions
test('user can add and complete a todo', async ({ page }) => {
  await page.goto('/todomvc');

  const input = page.getByPlaceholder('What needs to be done?');
  await input.fill('Prepare Playwright talk');
  await input.press('Enter');
  await input.fill('Rehearse the demo');
  await input.press('Enter');

  // No sleep(): expect() retries until it is true
  await expect(page.getByTestId('todo-item')).toHaveCount(2);

  await page.getByTestId('todo-item').first().getByRole('checkbox').check();
  await expect(page.getByText('1 item left')).toBeVisible();

  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByTestId('todo-item')).toHaveText(['Prepare Playwright talk']);
});
