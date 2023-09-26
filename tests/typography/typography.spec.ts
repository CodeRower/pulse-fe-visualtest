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
