import { test, expect } from "@playwright/test";
import { StandardPageObject } from "../../base/StandardPageObject";
const pageUrl = "https://pulse-frontend.web.app/auth/signup";

test("Signup Page", async ({ page }) => {
  await page.goto(pageUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("Validate Standard Tests", async ({ page }, workerInfo) => {
  const standardPage = new StandardPageObject(page, workerInfo);
  await page.goto(pageUrl);
  await standardPage.executeStandardTests();
});

test("test invalid email", async ({ page }) => {
  await page.goto(pageUrl);
  await page.getByPlaceholder("First Name").click();
  await page.getByPlaceholder("First Name").fill("ishaan");
  await page.getByPlaceholder("Last Name").click();
  await page.getByPlaceholder("Last Name").fill("puniani");
  await page.locator("form").click();
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("test@");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("123456");
  await page.getByRole("button", { name: " Sign Up with E-mail" }).click();

  await expect(page).toHaveScreenshot({ fullPage: true });
});
