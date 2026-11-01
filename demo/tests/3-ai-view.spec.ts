import { test, expect } from '@playwright/test';

// DEMO 3 — what an AI agent "sees": an ARIA snapshot instead of raw HTML
test('what an AI sees on a real page', async ({ page }) => {
  // A heavy, real-world page. (Backup URL if GitHub is slow: https://www.bbc.com/news)
  await page.goto('https://github.com/microsoft/playwright');

  const html = await page.content();
  // mode: 'ai' adds [ref=eN] ids an agent can use to say "click this one"
  const aria = await page.ariaSnapshot({ mode: 'ai' });

  console.log(`\nRaw HTML:      ${html.length.toLocaleString()} chars`);
  console.log(`ARIA snapshot: ${aria.length.toLocaleString()} chars`);
  console.log(`=> ~${Math.round(html.length / aria.length)}x less text for the LLM\n`);
  console.log(aria.split('\n').slice(0, 15).join('\n'), '\n...');
});

test('assert on the semantic structure', async ({ page }) => {
  await page.goto('/todomvc');
  await page.getByPlaceholder('What needs to be done?').fill('Task for the AI');
  await page.getByPlaceholder('What needs to be done?').press('Enter');

  await expect(page.getByRole('list').first()).toMatchAriaSnapshot(`
    - listitem:
      - checkbox "Toggle Todo"
      - text: Task for the AI
  `);
});
