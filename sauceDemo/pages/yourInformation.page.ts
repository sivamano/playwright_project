import { Page } from '@playwright/test'
import { yourInformationLocator } from '../locators/yourInformation.locator'

export class YourInformationPage {
    constructor(private readonly page: Page) {
        this.page = page;
    }
    async enterFirstName(firstName: string) {
        const fnField = this.page.getByTestId(yourInformationLocator.firstNameLocator);
        await fnField.fill(firstName);
        const fnDisplayedValue = await fnField.inputValue();
        if (fnDisplayedValue != firstName)
            throw new Error(`Customer's FirstName was not entered properly`)
    }

    async enterLastName(lastName: string) {
        const lnField = this.page.getByTestId(yourInformationLocator.lastNameLocator);
        await lnField.fill(lastName);
        const lnDisplayedValue = await lnField.inputValue();
        if (lnDisplayedValue != lastName)
            throw new Error(`Customer's Last Name was not entered properly`)
    }

    async enterZipCode(zipCode: string) {
        const zcField = this.page.getByTestId(yourInformationLocator.zipCodeLocator);
        await zcField.fill(zipCode);
        const zcDisplayedValue = await zcField.inputValue();
        if (zcDisplayedValue != zipCode)
            throw new Error(`Customer's Zip Code was not entered properly`)
    }

    async enterUserInformation(firstName: string, lastName: string, zipCode: string) {
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.enterZipCode(zipCode);
    }

    async proceedToCheckoutOverviewPage() {
        await this.page.getByTestId(yourInformationLocator.continueLocator).click();
    };

    async cancelAndGoBack(){
        await this.page.getByTestId(yourInformationLocator.cancelButtonLocator).click();
    }

}