// https://playwright.dev/docs/auth
import { test as setup, expect } from '@playwright/test';
import { testUser } from '../utilities/appConstants';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("https://pulse-frontend.web.app/auth/signin");

  await page.getByPlaceholder("Email").fill(testUser.email);
  await page.getByPlaceholder("Password").fill(testUser.password);
  await page.getByRole("button", { name: " Log in with E-mail" }).click();
  await page.waitForURL('https://pulse-frontend.web.app/');

  // End of authentication steps.
  await page.context().storageState({ path: authFile });
});