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
  headingH1Styles,
  headingH2Styles,
  headingH3Styles,
  headingH4Styles,
  paragraphPStyles,
  headingH6Styles,
  emptyInputStyles,
  filledInputStyles,
  errorInputStyles,
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
    await this.validateStandardControls(".inputEmpty", emptyInputStyles[this.deviceName] ,"Empty Input Field", "Style Validation");
    await this.validateStandardControls(".inputFilled", filledInputStyles[this.deviceName] ,"Filled Input Field", "Style Validation");
    await this.validateStandardControls(".inputError", errorInputStyles[this.deviceName] ,"Error Input Field", "Style Validation");
    // await this.validateStandardControls(".btn-primary ", primaryButtonStyles[this.deviceName] ,"PrimaryButtons", "Style Validation");
    // await this.validateStandardControls(".bg-light", lightButtonStyles[this.deviceName] ,"LightButtons", "Style Validation");
    await this.validateStandardControls(".btnFilled.btn-lrg.rounded-pill", filledLargeButtonStyles[this.deviceName] ,"Filled Large Buttons", "Style Validation");
    await this.validateStandardControls(".btnFilled.btn-mdm.rounded-pill", filledMediumButtonStyles[this.deviceName] ,"Filled Medium Buttons", "Style Validation");
    await this.validateStandardControls(".btnFilled.btn-sml.rounded-pill", filledSmallButtonStyles[this.deviceName] ,"Filled Small Buttons", "Style Validation");
    await this.validateStandardControls(".btnLight.btn-lrg.rounded-pill", lightLargeButtonStyles[this.deviceName] ,"Light Large Buttons", "Style Validation");
    await this.validateStandardControls(".btnLight.btn-mdm.rounded-pill", lightMediumButtonStyles[this.deviceName] ,"Light Medium Buttons", "Style Validation");
    await this.validateStandardControls(".btnLight.btn-sml.rounded-pill", lightSmallButtonStyles[this.deviceName] ,"Light Small Buttons", "Style Validation");
    await this.validateStandardControls(".btnOutlined.btn-lrg.rounded-pill", outLinedLargeButtonStyles[this.deviceName] ,"OutLined Large Buttons", "Style Validation");
    await this.validateStandardControls(".btnOutlined.btn-mdm.rounded-pill", outLinedMediumButtonStyles[this.deviceName] ,"OutLined Medium Buttons", "Style Validation");
    await this.validateStandardControls(".btnOutlined.btn-sml.rounded-pill", outLinedSmallButtonStyles[this.deviceName] ,"OutLined Small Buttons", "Style Validation");
    await this.validateStandardControls("h1", headingH1Styles[this.deviceName] ,"Heading H1", "Style Validation");
    await this.validateStandardControls("h2",headingH2Styles[this.deviceName] ,"Heading H2", "Style Validation");
    await this.validateStandardControls("h3",headingH3Styles[this.deviceName] ,"Heading H3", "Style Validation");
    await this.validateStandardControls("h4",headingH4Styles[this.deviceName] ,"Heading H4", "Style Validation");
    await this.validateStandardControls("p",paragraphPStyles[this.deviceName] ,"Paragraph P", "Style Validation");
    await this.validateStandardControls("h6",headingH6Styles[this.deviceName] ,"Heading H6", "Style Validation");   
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



