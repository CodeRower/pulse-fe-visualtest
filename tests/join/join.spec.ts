import { test, expect } from '@playwright/test';

test('Join Page', async ({ page }) => {
  await page.goto('https://pulse-frontend.web.app/join');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot({ fullPage: true });
});

