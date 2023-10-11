import { test, expect } from "@playwright/test";
import { StandardPageObject } from "../../base/StandardPageObject";

const pageUrl = "https://pulse-frontend.web.app/auth/signup"

test("input Page", async ({ page }) => {
    await page.goto(pageUrl);
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
  
  
  test("Validate Standard Tests", async ({ page }, workerInfo) => {
    const standardPage = new StandardPageObject(page, workerInfo);
    await page.goto("https://pulse-frontend.web.app/join"); 
    await standardPage.executeStandardTests();
  });

