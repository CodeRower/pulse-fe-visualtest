// import { lightButtonStyles } from './../utilities/stylesConstants';
// https://playwright.dev/docs/pom
// https://playwright.dev/docs/locators

import { WorkerInfo, expect, test, type Page } from "@playwright/test";
import {
  filledLargeButtonStyles,
  filledMediumButtonStyles,
  filledSmallButtonStyles,
  lightButtonStyles,
  lightLargeButtonStyles,
  lightMediumButtonStyles,
  lightSmallButtonStyles,
  outLinedLargeButtonStyles,
  outLinedMediumButtonStyles,
  outLinedSmallButtonStyles,
  primaryButtonStyles,
  textInputFormControlStyles
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
    await this.validateStandardControls(".bg-light", lightButtonStyles[this.deviceName] ,"LightButtons", "Style Validation");
    await this.validateStandardControls(".btnFilled.btn-lrg", filledLargeButtonStyles[this.deviceName] ,"Filled Large Buttons", "Style Validation");
    await this.validateStandardControls(".btnFilled.btn-mdm", filledMediumButtonStyles[this.deviceName] ,"Filled Medium Buttons", "Style Validation");
    await this.validateStandardControls(".btnFilled.btn-sml", filledSmallButtonStyles[this.deviceName] ,"Filled Small Buttons", "Style Validation");
    await this.validateStandardControls(".btnLight.btn-lrg", lightLargeButtonStyles[this.deviceName] ,"Light Large Buttons", "Style Validation");
    await this.validateStandardControls(".btnLight.btn-mdm", lightMediumButtonStyles[this.deviceName] ,"Light Medium Buttons", "Style Validation");
    await this.validateStandardControls(".btnLight.btn-sml", lightSmallButtonStyles[this.deviceName] ,"Light Small Buttons", "Style Validation");
    await this.validateStandardControls(".btnOutlined.btn-lrg", outLinedLargeButtonStyles[this.deviceName] ,"OutLined Large Buttons", "Style Validation");
    await this.validateStandardControls(".btnOutlined.btn-mdm", outLinedMediumButtonStyles[this.deviceName] ,"OutLined Medium Buttons", "Style Validation");
    await this.validateStandardControls(".btnOutlined.btn-sml.rounded-pill", outLinedSmallButtonStyles[this.deviceName] ,"OutLined Small Buttons", "Style Validation");
 
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
