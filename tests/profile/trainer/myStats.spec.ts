import { test, expect } from "@playwright/test";
import { testUser } from "../../../utilities/appConstants";
import { delay } from "../../../utilities/utils";
import { StandardPageObject } from "../../../base/StandardPageObject";


const pageUrl = "https://pulse-frontend.web.app/my-stats";

test("Skills and Experience Page", async ({ page }) => {
  await page.goto("https://pulse-frontend.web.app/auth/signin");

  await page.getByPlaceholder("Email").fill(testUser.email);
  await page.getByPlaceholder("Password").fill(testUser.password);
  await page.getByRole("button", { name: " Log in with email" }).click();
  await delay(2000);
  await page.goto(pageUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("Validate Standard Tests", async ({ page }, workerInfo) => {
  const standardPage = new StandardPageObject(page, workerInfo);
  await page.goto(pageUrl);
  await standardPage.executeStandardTests();
});
