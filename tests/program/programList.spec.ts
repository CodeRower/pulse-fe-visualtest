import { test, expect } from "@playwright/test";
import { StandardPageObject } from "../../base/StandardPageObject";
import { testUser } from "../../utilities/appConstants";
import { delay } from "../../utilities/utils";
const pageUrl = "https://pulse-frontend.web.app/program-list";

test("Program list Page", async ({ page }) => {
  await page.goto("https://pulse-frontend.web.app/auth/signin");

  await page.getByPlaceholder("Email").fill(testUser.email);
  await page.getByPlaceholder("Password").fill(testUser.password);
  await page.getByRole("button", { name: " Log in with email" }).click();
  await delay(2000);
  await page.goto(pageUrl);
  await expect(page).toHaveScreenshot({ fullPage: true });
  await page.getByRole("link", { name: "View all" }).click();
  await page.goto("https://pulse-frontend.web.app/trainer-list");
  await page.getByRole("button", { name: "Know more" }).first().click();
  // await page.goto("https://pulse-frontend.web.app/program-detail/1");
});

test("Validate Standard Tests", async ({ page }, workerInfo) => {
  const standardPage = new StandardPageObject(page, workerInfo);
  await page.goto(pageUrl);
  await standardPage.executeStandardTests();
});
