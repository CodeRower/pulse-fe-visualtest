import { test, expect } from "@playwright/test";
import { StandardPageObject } from "../../base/StandardPageObject";
import { testUser } from "../../utilities/appConstants";

const pageUrl = "https://pulse-frontend.web.app/plan";
test.only("Plan Page", async ({ page }) => {
  await page.goto("https://pulse-frontend.web.app/auth/signin");

  await page.getByPlaceholder("Email").fill(testUser.email);
  await page.getByPlaceholder("Password").fill(testUser.password);
  await page.getByRole("button", { name: " Log in with E-mail" }).click();
  await page.goto("https://pulse-frontend.web.app/plan");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("Validate Standard Tests", async ({ page }) => {
  const standardPage = new StandardPageObject(page);
  await page.goto(pageUrl);
  await standardPage.executeStandardTests();
});
