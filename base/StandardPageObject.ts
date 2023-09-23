// https://playwright.dev/docs/pom
// https://playwright.dev/docs/locators

import { expect, type Locator, type Page } from "@playwright/test";
import {
  primaryButtonStyles,
  textInputFormControlStyles,
} from "../utilities/stylesConstants";

export class StandardPageObject {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async executeStandardTests() {
    this.validateTextFormFieldsControls();
    this.validatePrimaryButtons();
  }

  private async validateTextFormFieldsControls() {
    const textInputFormControl = await this.page.locator(
      "input[type='text'].form-control"
    );
    const count = await textInputFormControl.count();
    console.log(`validateTextFormFieldsControls FOUND: ${count}`);

    if (textInputFormControl && count > 0) {
      for (let i = 0; i < count; ++i) {
        const nameOfElement = await textInputFormControl
          .nth(i)
          .getAttribute("name");
        console.log(`VALIDATING: ${nameOfElement}`);

        const computedStyle = await textInputFormControl
          .nth(i)
          .evaluate((element) => window.getComputedStyle(element));

        for (let style in textInputFormControlStyles) {
          //   console.log(`${style} : ${computedStyle[style]}`);
          await expect(computedStyle[style]).toBe(
            textInputFormControlStyles[style]
          );
        }
      }
    }
  }

  private async validatePrimaryButtons() {
    const primaryButtons = await this.page.locator(".btn-success");

    const count = await primaryButtons.count();
    console.log(`validatePrimaryButtons FOUND: ${count}`);

    if (primaryButtons && count > 0) {
      for (let i = 0; i < count; ++i) {
        const nameOfElement = await primaryButtons.nth(i).textContent();
        console.log(`VALIDATING: ${nameOfElement}`);

        const computedStyle = await primaryButtons
          .nth(i)
          .evaluate((element) => window.getComputedStyle(element));

        for (let pBtnStyle in primaryButtonStyles) {
          // console.log(`${pBtnStyle} : ${computedStyle[pBtnStyle]}`);
          await expect(computedStyle[pBtnStyle]).toBe(
            primaryButtonStyles[pBtnStyle]
          );
          // await expect(btn).toHaveCSS(pBtnStyle, primaryButtonStyles[pBtnStyle]);
        }
      }
    }
  }
}
