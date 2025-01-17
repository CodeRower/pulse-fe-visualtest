import { test, expect } from "@playwright/test";
import { StandardPageObject } from "../../base/StandardPageObject";
const pageUrl = "https://pulse-frontend.web.app/auth/signin";

test("Signin Page", async ({ page }) => {
  await page.goto(pageUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("Validate Standard Tests", async ({ page }, workerInfo) => {
  const standardPage = new StandardPageObject(page, workerInfo);
  await page.goto(pageUrl);
  await standardPage.executeStandardTests();
});

test("User Account Locked", async ({ page }) => {
  await page.goto(pageUrl);
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("lockedUser@mail.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("invalid");
  await page.getByRole("button", { name: " Log in with email" }).click();
  await page
    .getByText(
      "Your account has been locked due to multiple failed login attempts"
    )
    .click();
});

test("test invalid email in signin", async ({ page }) => {
  await page.goto(pageUrl);
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("rana@");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("1234");
  await page.getByRole("button", { name: " Log in with email" }).click();

  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("test invalid password in signin", async ({ page }) => {
  await page.goto(pageUrl);
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("rana@gmail.com");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("123");
  await page.getByRole("button", { name: " Log in with email" }).click();

  await expect(page).toHaveScreenshot({ fullPage: true });
});


