import { test, expect } from "playwright/test";
import { delay } from "../../utilities/utils";
import { StandardPageObject } from "../../base/StandardPageObject";

const pageUrl = "https://pulse-frontend.web.app";

test("Trainer Dashboard", async ({ browser }) => {
  const userContext = await browser.newContext({
    storageState: "playwright/.auth/trainer.json",
  });
  const userPage = await userContext.newPage();

  await userPage.goto(pageUrl);

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