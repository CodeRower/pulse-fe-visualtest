import { test, expect, chromium } from "@playwright/test";
import { StandardPageObject } from "../../base/StandardPageObject";
import { testUser } from "../../utilities/appConstants";
import { delay } from "../../utilities/utils";
const pageUrl = "https://pulse-frontend.web.app/trainer-profile/1";

test("Trainer Profile Page", async ({ page }) => {
  await page.goto("https://pulse-frontend.web.app/auth/signin");
  await page.getByPlaceholder("Email").fill(testUser.email);
  await page.getByPlaceholder("Password").fill(testUser.password);
  await page.getByRole("button", { name: " Log in with email" }).click();

  await page.goto(pageUrl);
  await delay(2000);
  await expect(page).toHaveScreenshot({ fullPage: true });
});

// test("Validate Standard Tests", async ({ page }, workerInfo) => {
//   const standardPage = new StandardPageObject(page, workerInfo);
//   await page.goto(pageUrl);
//   await standardPage.executeStandardTests();
// });
