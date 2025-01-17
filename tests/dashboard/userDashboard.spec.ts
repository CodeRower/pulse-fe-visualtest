import { test, expect } from "playwright/test";

import { delay } from "../../utilities/utils";
import { StandardPageObject } from "../../base/StandardPageObject";
import { testUser } from "../../utilities/appConstants";

const pageUrl = "https://pulse-frontend.web.app";
test.use({ storageState: "playwright/.auth/user.json" });

// test("User Dashboard", async ({ page }) => {
//   await page.goto(pageUrl);

//   await delay(5000);

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveScreenshot({ fullPage: true });
// });

test("Validate Standard Tests", async ({ browser }, workerInfo) => {
  const userContext = await browser.newContext({
    storageState: "playwright/.auth/user.json",
  });
  const userPage = await userContext.newPage();
  await userPage.goto(pageUrl);
  await delay(5000);
  const standardPage = new StandardPageObject(userPage, workerInfo);
  await standardPage.executeStandardTests();
});

