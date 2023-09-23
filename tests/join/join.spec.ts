import { test, expect } from "@playwright/test";
import { primaryButtonStyles } from "../../utilities/stylesConstants";
import { logStyle } from "../../utilities/logger";
import { StandardPageObject } from "../../base/StandardPageObject";

test("Join Page", async ({ page }) => {
  await page.goto("https://pulse-frontend.web.app/join");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("Validate Primary Buttons", async ({ page }) => {
  const standardPage = new StandardPageObject(page);
  await page.goto("https://pulse-frontend.web.app/join");
  await standardPage.executeStandardTests();
});
