// https://playwright.dev/docs/pom
// https://playwright.dev/docs/locators

import { test, expect, type Locator, type Page, WorkerInfo } from "@playwright/test";
import {
  primaryButtonStyles,
  textInputFormControlStyles,
} from "../utilities/stylesConstants";

export class StandardPageObject {
  readonly page: Page;
  readonly workerInfo: WorkerInfo
  readonly deviceName: string

  constructor(page: Page, workerInfo: WorkerInfo) {
    this.page = page;
    this.workerInfo = workerInfo;
    this.deviceName = this.workerInfo.project.name;
  }

  async executeStandardTests() {
    await this.validateTextFormFieldsControls();
    await this.validatePrimaryButtons();
  }

  private async validateTextFormFieldsControls() {
    const deviceSpecificStyles = textInputFormControlStyles[this.deviceName];
    const textInputFormControl = await this.page.locator(
      "input[type='text'].form-control"
    );
    const count = await textInputFormControl.count();
    // console.log(`validateTextFormFieldsControls FOUND: ${count}`);
    test
      .info()
      .annotations.push({
        type: `FOUND: ${count} TextFormFieldsControls`,
        description: "validateTextFormFieldsControls",
      });

    if (textInputFormControl && count > 0) {
      for (let i = 0; i < count; ++i) {
        const nameOfElement = await textInputFormControl
          .nth(i)
          .getAttribute("name");
        console.log(`VALIDATING: ${nameOfElement}`);
        // test
        //   .info()
        //   .annotations.push({
        //     type: `VALIDATING: ${nameOfElement}`,
        //     description: "validateTextFormFieldsControls",
        //   });

        const computedStyle = await textInputFormControl
          .nth(i)
          .evaluate((element) => window.getComputedStyle(element));

        for (let style in deviceSpecificStyles) {
          console.log(`${style} : ${computedStyle[style]}`);
          await expect(computedStyle[style]).toBe(
            deviceSpecificStyles[style]
          );
        }
      }
    }
  }

  private async validatePrimaryButtons() {
    const deviceSpecificStyles = primaryButtonStyles[this.deviceName];
    
    const primaryButtons = await this.page.locator(".btn-success");

    const count = await primaryButtons.count();
    // console.log(`validatePrimaryButtons FOUND: ${count}`);
    test
      .info()
      .annotations.push({
        type: `FOUND: ${count} PrimaryButtons`,
        description: "validatePrimaryButtons",
      });

    if (primaryButtons && count > 0) {
      for (let i = 0; i < count; ++i) {
        const nameOfElement = await primaryButtons.nth(i).textContent();
        console.log(`VALIDATING: ${nameOfElement}`);
        // test
        //   .info()
        //   .annotations.push({
        //     type: `VALIDATING: ${nameOfElement}`,
        //     description: "validatePrimaryButtons",
        //   });

        const computedStyle = await primaryButtons
          .nth(i)
          .evaluate((element) => window.getComputedStyle(element));

        for (let pBtnStyle in deviceSpecificStyles) {
          // console.log(`${pBtnStyle} : ${computedStyle[pBtnStyle]}`);
          await expect(computedStyle[pBtnStyle]).toBe(
            deviceSpecificStyles[pBtnStyle]
          );
          // await expect(btn).toHaveCSS(pBtnStyle, primaryButtonStyles[pBtnStyle]);
        }
      }
    }
  }
}
