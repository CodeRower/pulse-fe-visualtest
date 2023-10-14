import { test, expect } from "@playwright/test";
import { primaryButtonStyles } from "../../utilities/stylesConstants";
import { logStyle } from "../../utilities/logger";
import { StandardPageObject } from "../../base/StandardPageObject";

test("Typography Page", async ({ page }) => {
  await page.goto("https://pulse-frontend.web.app/typography");
 
  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot({ fullPage: true });
});


test("Validate Standard Tests", async ({ page }, workerInfo) => {
  const standardPage = new StandardPageObject(page, workerInfo);
  await page.goto("https://pulse-frontend.web.app/typography");
  await standardPage.executeStandardTests();
});

test('Button Varients ', async ({ page }) => {
  await page.goto('https://pulse-frontend.web.app/typography');
  await page.getByRole('button', { name: 'Large Filled Button' }).click();
  await page.getByRole('button', { name: 'Large Light Button', exact: true }).click();
  await page.getByRole('button', { name: 'Large Outlined Button', exact: true }).click();
  await page.getByRole('button', { name: 'Medium Filled Button' }).click();
  await page.getByRole('button', { name: 'Medium Light Button', exact: true }).click();
  await page.getByRole('button', { name: 'Medium Outlined Button', exact: true }).click();
  await page.getByRole('button', { name: 'Small Filled Button' }).click();
  await page.getByRole('button', { name: 'Small Light Button', exact: true }).click();
  await page.getByRole('button', { name: 'Small Outlined Button', exact: true }).click();
  await expect(page).toHaveScreenshot({ fullPage: true });
});