// https://playwright.dev/docs/pom
// https://playwright.dev/docs/locators

import { expect, type Locator, type Page } from "@playwright/test";

import { StandardPageObject } from "./StandardPageObject";

export class UserPageObject extends StandardPageObject {
  readonly page: Page;
}
