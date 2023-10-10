// https://playwright.dev/docs/pom
// https://playwright.dev/docs/locators

import { test, expect, type Locator, type Page, WorkerInfo } from "@playwright/test";
import {
  lightButtonStyles,
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
    await this.validateStandardControls("input[type='text'].form-control", textInputFormControlStyles[this.deviceName] ,"TextFormFieldsControls", "Style Validation");
    await this.validateStandardControls(".btn-primary ", primaryButtonStyles[this.deviceName] ,"PrimaryButtons", "Style Validation");
    await this.validateStandardControls(".bg-light ", lightButtonStyles[this.deviceName] ,"LightButtons", "Style Validation");
    await this.validateStandardControls(".btnFilled ", lightButtonStyles[this.deviceName] ,"LightButtons", "Style Validation");

  }

  private async validateStandardControls(selector, styleMapping, controlTitle, controlDescription ) {
    const deviceSpecificStyles = styleMapping;
    const controlUnderValidation = await this.page.locator(
      selector
    );
    const count = await controlUnderValidation.count();
    // console.log(`validateTextFormFieldsControls FOUND: ${count}`);
    test
      .info()
      .annotations.push({
        type: `FOUND: ${count} ${controlTitle}`,
        description: `${controlDescription}`,
      });

    if (controlUnderValidation && count > 0) {
      for (let i = 0; i < count; ++i) {
        const nameOfElement = await controlUnderValidation
          .nth(i)
          .getAttribute("name");
        console.log(`VALIDATING: ${nameOfElement}`);

        const computedStyle = await controlUnderValidation
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
}
