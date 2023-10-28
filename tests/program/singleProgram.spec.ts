import { test, expect } from "@playwright/test";
import { StandardPageObject } from "../../base/StandardPageObject";
import { delay } from "../../utilities/utils";
const pageUrl =
  "https://pulse-frontend.web.app/program-detail/65326f07074ed87f4d13bb09";

test("Single Program Page", async ({ page, browser }) => {
  const userContext = await browser.newContext({
    storageState: "playwright/.auth/user.json",
  });
  const userPage = await userContext.newPage();
  await userPage.goto(pageUrl);
  await delay(2000);
  await expect(page).toHaveScreenshot({ fullPage: true });

  // Expect a title "to contain" a substring.
  await expect(userPage).toHaveScreenshot({ fullPage: true });
});

test("Validate Standard Tests", async ({ browser }, workerInfo) => {
  const userContext = await browser.newContext({
    storageState: "playwright/.auth/user.json",
  });
  const userPage = await userContext.newPage();
  await userPage.goto(pageUrl);
  await delay(2000);

  const standardPage = new StandardPageObject(userPage, workerInfo);
  await standardPage.executeStandardTests();
});
