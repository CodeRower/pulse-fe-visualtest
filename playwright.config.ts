import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    screenshot: "on",
    viewport: { width: 1440, height: 900 },
    video: "retain-on-failure",
  },
  globalTimeout: 60 * 60 * 1000,
  expect: {
    timeout: 10 * 1000,
  },
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'setup',
      testMatch: /auth.setup\.ts/,
    },
    {
      name: "chromium",
      // dependencies: ['setup'],
      use: {
        ...devices["Desktop Chrome"],
        launchOptions: {
          args: [
            // Configure text rendering so there's no difference between headless and headed (when debugging).
            "--font-render-hinting=none",
            "--disable-skia-runtime-opts",
            "--disable-system-font-check",
            "--disable-font-subpixel-positioning",
            "--disable-lcd-text",
            // "--disable-remote-fonts",
          ],
        },
      },
    },
    {
      name: "chromium-ipad-landscape",
      // dependencies: ['setup'],
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 768, height: 1024 },
        launchOptions: {
          args: [
            // Configure text rendering so there's no difference between headless and headed (when debugging).
            "--font-render-hinting=none",
            "--disable-skia-runtime-opts",
            "--disable-system-font-check",
            "--disable-font-subpixel-positioning",
            "--disable-lcd-text",
            // "--disable-remote-fonts",
          ],
        },
      },
    },
    {
      name: "chromium-ipad-portrait",
      // dependencies: ['setup'],
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1024, height: 768 },
        launchOptions: {
          args: [
            // Configure text rendering so there's no difference between headless and headed (when debugging).
            "--font-render-hinting=none",
            "--disable-skia-runtime-opts",
            "--disable-system-font-check",
            "--disable-font-subpixel-positioning",
            "--disable-lcd-text",
            // "--disable-remote-fonts",
          ],
        },
      },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    {
      name: "MobileChrome",
      use: { ...devices["Pixel 5"] },
    },
    // {
    //   name: "Mobile Safari",
    //   use: { ...devices["iPhone 12"] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
