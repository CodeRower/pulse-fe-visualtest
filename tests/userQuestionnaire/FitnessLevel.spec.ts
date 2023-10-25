import { test, expect, chromium } from "@playwright/test";
import { StandardPageObject } from "../../base/StandardPageObject";
import { delay } from "../../utilities/utils";
const pageUrl = "https://pulse-frontend.web.app/fitnessLevel";

test("FitnessLevel Page", async ({ page, browser }) => {
  const userContext = await browser.newContext({
    storageState: "playwright/.auth/user.json",
  });
  const userPage = await userContext.newPage();
  await userPage.goto(pageUrl);
  await delay(2000);

  // Expect a title "to contain" a substring.
  await expect(userPage).toHaveScreenshot({ fullPage: true });
});

test("Validate Standard Tests", async ({  browser }, workerInfo) => {
  const userContext = await browser.newContext({
    storageState: "playwright/.auth/user.json",
  });
  const userPage = await userContext.newPage();
  await userPage.goto(pageUrl);
  await delay(2000);
  

  const standardPage = new StandardPageObject(userPage, workerInfo);
  await standardPage.executeStandardTests();
});
