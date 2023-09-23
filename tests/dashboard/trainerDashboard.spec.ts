import { test, expect } from "playwright/test";

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
