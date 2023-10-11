import { test, expect, chromium } from "@playwright/test";
import { StandardPageObject } from "../../base/StandardPageObject";
import { testUser } from "../../utilities/appConstants";

const pageUrl = "https://pulse-frontend.web.app/plan";

test('Plan', async ({ page }) => {
  const browser = await chromium.launch()
const redirect = await browser.newPage()
  await page.goto('https://pulse-frontend.web.app/');
  await page.goto('https://pulse-frontend.web.app/join');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(' rana.mahato@coderower.com');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('RanaMahato@1234');
  await page.getByRole('button', { name: ' Log in with email' }).click();
 await redirect.goto("https://pulse-frontend.web.app/plan")
 await page.getByLabel("Select option").selectOption("eur");
 await page.getByLabel("Select option").selectOption("usd");
 await page.getByLabel("Select option").selectOption("inr");
 await page.getByRole("button", { name: "Get Started" }).first().click();
 const price = await page.getByRole("heading", { name: "$119 per Month" });
 await expect(price.innerText()).toContain("$119 per Month");
 await page.getByRole("button", { name: "Get Started" }).nth(1).click();
  await expect(page).toHaveScreenshot({ fullPage: true });
});

test("Validate Standard Tests", async ({ page }, workerInfo) => {
  const standardPage = new StandardPageObject(page, workerInfo);
  await page.goto(pageUrl);
  await standardPage.executeStandardTests();
});
