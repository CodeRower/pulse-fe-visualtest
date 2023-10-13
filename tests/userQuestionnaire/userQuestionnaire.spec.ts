import { test, expect, chromium } from "@playwright/test";
import { StandardPageObject } from "../../base/StandardPageObject";
import { testUser } from "../../utilities/appConstants";

const pageUrl = "https://pulse-frontend.web.app/location";

test("Location Page", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin");
  await page.getByPlaceholder("Email").fill("rashida.akter@coderower.com");
  await page.getByPlaceholder("Password").fill("Rashida@1");
  await page.getByRole("button", { name: " Log in with email" }).click();
  await page.goto("http://localhost:3000/location");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot({ fullPage: true });
});

// test("Validate Standard Tests", async ({ page }, workerInfo) => {
//   const standardPage = new StandardPageObject(page, workerInfo);
//   await page.goto(pageUrl);
//   await standardPage.executeStandardTests();
// });
