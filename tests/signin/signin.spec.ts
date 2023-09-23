import { test, expect } from "@playwright/test";
import { StandardPageObject } from "../../base/StandardPageObject";

const pageUrl = "https://pulse-frontend.web.app/auth/signin";

test("Signin Page", async ({ page }) => {
  await page.goto(pageUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("Validate Standard Tests", async ({ page }) => {
  const standardPage = new StandardPageObject(page);
  await page.goto(pageUrl);
  await standardPage.executeStandardTests();
});
