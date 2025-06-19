import {Page} from '@playwright/test'
import {yourInformationLocator} from '../locators/yourInformation.locator'
import {expect} from '../fixtures/setup'

export class YourInformationPage {
    constructor (private readonly page: Page){
        this.page = page;
    }
    async enterFirstName(firstName: string) {
       const fnField = this.page.getByTestId(yourInformationLocator.firstNameLocator);
       await fnField.fill(firstName);
       await expect(fnField).toHaveValue(firstName);
    }

    async enterLastName(lastName: string) {
        const lnField = this.page.getByTestId(yourInformationLocator.lastNameLocator);
        await lnField.fill(lastName);
        await expect(lnField).toHaveValue(lastName);
    }

    async enterZipCode(zipCode: string) {
        const zcField = this.page.getByTestId(yourInformationLocator.zipCodeLocator);
        await zcField.fill('zipCode');
        await expect(zcField).toHaveValue(zipCode);
    }

    async enterUserInformation(firstName: string,lastName: string,zipCode: string){
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterZipCode(zipCode);
    }

    async proceedToCheckoutOverviewPage() {
        await this.page.getByTestId(yourInformationLocator.continueLocator).click();
        await expect(this.page).toHaveURL('/checkout-step-two.html');
    };

}