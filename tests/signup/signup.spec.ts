import { test, expect } from '@playwright/test';


test('Signup Page', async ({ page }) => {
  await page.goto('https://pulse-frontend.web.app/auth/signup');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot({ fullPage: true });
});
test('test invalid email', async ({ page }) => {
  await page.goto('https://pulse-frontend.web.app/auth/signup');
  await page.getByPlaceholder('First Name').click();
  await page.getByPlaceholder('First Name').fill('ishaan');
  await page.getByPlaceholder('Last Name').click();
  await page.getByPlaceholder('Last Name').fill('puniani');
  await page.locator('form').click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('test@');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('123456');
  await page.getByRole('button', { name: ' Sign Up with E-mail' }).click();
  
  await expect(page).toHaveScreenshot({ fullPage: true });
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
