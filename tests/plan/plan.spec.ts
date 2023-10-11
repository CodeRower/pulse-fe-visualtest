import { test, expect, chromium } from "@playwright/test";
import { StandardPageObject } from "../../base/StandardPageObject";
import { testUser } from "../../utilities/appConstants";

const pageUrl = "http://localhost:3000/plan";

test("Plan Page", async ({ page }) => {
  await page.goto("http://localhost:3000/auth/signin");
  
  await page.getByPlaceholder("Email").fill(testUser.email);
  await page.getByPlaceholder("Password").fill(testUser.password);
  await page.getByRole("button", { name: " Log in with email" }).click();
  await page.goto("http://localhost:3000/plan");
  await page.getByLabel("Select option").selectOption("eur");
  await page.getByLabel("Select option").selectOption("usd");
  await page.getByLabel("Select option").selectOption("inr");
  await page.getByRole("button", { name: "Get Started" }).first().click();
  const price = await page.getByRole("heading", { name: "$119 per Month" });
  await expect(price.innerText()).toContain("$119 per Month");
  await page.getByRole("button", { name: "Get Started" }).nth(1).click();
  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("Validate Standard Tests", async ({ page }, workerInfo) => {
  const standardPage = new StandardPageObject(page, workerInfo);
  await page.goto(pageUrl);
  await standardPage.executeStandardTests();
});
