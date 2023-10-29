import { test, expect } from "@playwright/test";
import { StandardPageObject } from "../../base/StandardPageObject";
import { delay } from "../../utilities/utils";
const pageUrl = "https://pulse-frontend.web.app/auth/signup";

test("Signup Page", async ({ page }) => {
  await page.goto(pageUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot({ fullPage: true });
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
  await page.getByRole("button", { name: " Sign Up with email" }).click();

  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("test invalid password", async ({ page }) => {
  await page.goto(pageUrl);
  // await page.locator('.col-6').click();
  await page.getByPlaceholder("First Name").click();
  await page.getByPlaceholder("First Name").fill("Rana");
  await page.getByPlaceholder("Last Name").click();
  await page.getByPlaceholder("Last Name").fill("Mahato");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("rana@gmail.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("12dew");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("rana@gmail.com");
  await page.getByRole("button", { name: " Sign Up with email" }).click();

  await expect(page).toHaveScreenshot({ fullPage: true });
});
