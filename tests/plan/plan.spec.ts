import { test, expect, chromium } from "@playwright/test";
import { StandardPageObject } from "../../base/StandardPageObject";
import { testUser } from "../../utilities/appConstants";

const pageUrl = "https://pulse-frontend.web.app/plan";

test("Plan Page", async ({ page }) => {
  await page.goto("https://pulse-frontend.web.app/auth/signin");
  
  await page.getByPlaceholder("Email").fill(testUser.email);
  await page.getByPlaceholder("Password").fill(testUser.password);
  await page.getByRole("button", { name: " Log in with email" }).click();
  await page.goto("https://pulse-frontend.web.app/plan");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot({ fullPage: true });
});


test('Plan', async ({ page }) => {
  const browser = await chromium.launch()
const redirect = await browser.newPage()
  await page.goto('https://pulse-frontend.web.app/');
  await page.goto('https://pulse-frontend.web.app/join');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(' rana.mahato@coderower.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('RanaMahato@1234');
  await page.getByRole('button', { name: ' Log in with email' }).click();
 await redirect.goto("https://pulse-frontend.web.app/plan")
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("Validate Standard Tests", async ({ page }, workerInfo) => {
  const standardPage = new StandardPageObject(page, workerInfo);
  await page.goto(pageUrl);
  await standardPage.executeStandardTests();
});
