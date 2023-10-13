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
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("lockedUser@mail.com");
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
test("password rules verification", async ({ page }) => {
  await page.goto(pageUrl);
  await page.getByPlaceholder("First Name").click();
  await page.getByPlaceholder("First Name").fill("test");
  await page.getByPlaceholder("First Name").press("Tab");
  await page.getByPlaceholder("Last Name").fill("Demo");
  await page.getByPlaceholder("Last Name").press("Tab");
  await page.getByPlaceholder("Email").fill("test.demo@gmail.com");
  await page.getByPlaceholder("Email").press("Tab");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("rashida");
  await page.getByRole("button", { name: " Sign up with email" }).click();
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("123456");
  await page.getByRole("button", { name: " Sign up with email" }).click();
  await page.getByRole("button", { name: "" }).click();
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("rashida1");
  await page.getByRole("button", { name: " Sign up with email" }).click();
  await page.getByRole("button", { name: "" }).click();
  await page.getByText("8 - 16 Character").click();
  await page.getByPlaceholder("Password").click();
  await page.getByRole("button", { name: "" }).click();
  await page.getByText("At least One Number").click();
  await page.getByRole("button", { name: "" }).click();
  await page.getByText("No Spaces").click();
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("Rashida1");
  await page.getByRole("button", { name: "" }).click();
  await page.getByText("At least One Captial Letter").click();
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("Rashida@1");
  await page.getByPlaceholder("Password").click();
  await page.getByRole("button", { name: "" }).click();
  await page
    .getByLabel("Yes, I want to receive news, updates and all pulse discounts.")
    .check();
  await page.getByRole("button", { name: " Sign up with email" }).click();

  await expect(page).toHaveScreenshot({ fullPage: true });
});
