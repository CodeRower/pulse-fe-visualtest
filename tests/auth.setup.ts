// https://playwright.dev/docs/auth
import { test as setup, expect } from '@playwright/test';
import { testUser, trainerUser } from '../utilities/appConstants';

const userAuthFile = 'playwright/.auth/user.json';
const trainerAuthFile = 'playwright/.auth/trainer.json';

setup('user authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("https://pulse-frontend.web.app/auth/signin");

  await page.getByPlaceholder("Email").fill(testUser.email);
  await page.getByPlaceholder("Password").fill(testUser.password);
  await page.getByRole("button", { name: " Log in with email" }).click();
  await page.waitForURL('https://pulse-frontend.web.app/');

  // End of authentication steps.
  await page.context().storageState({ path: userAuthFile });
});

setup('trainer authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto("https://pulse-frontend.web.app/auth/signin");

  await page.getByPlaceholder("Email").fill(trainerUser.email);
  await page.getByPlaceholder("Password").fill(trainerUser.password);
  await page.getByRole("button", { name: " Log in with email" }).click();
  await page.waitForURL('https://pulse-frontend.web.app/');

  // End of authentication steps.
  await page.context().storageState({ path: trainerAuthFile });
});