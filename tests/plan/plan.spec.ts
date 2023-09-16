import { test, expect } from '@playwright/test';

test('Plan Page', async ({ page }) => {
  await page.goto('https://pulse-frontend.web.app/plan');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot();
});

