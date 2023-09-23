import { test, expect } from "playwright/test";

const pageUrl = "https://pulse-frontend.web.app";
test.use({ storageState: "playwright/.auth/user.json" });

test("User Dashboard", async ({ page }) => {
  await page.goto(pageUrl);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveScreenshot({ fullPage: true });
});

// import { test, expect } from "playwright/test";

// const pageUrl = "https://pulse-frontend.web.app";

// test("User Dashboard", async ({ browser }) => {
//   const userContext = await browser.newContext({
//     storageState: "playwright/.auth/user.json",
//   });
//   const userPage = await userContext.newPage();

//   await userPage.goto(pageUrl);

//   // Expect a title "to contain" a substring.
//   await expect(userPage).toHaveScreenshot({ fullPage: true });
// });
