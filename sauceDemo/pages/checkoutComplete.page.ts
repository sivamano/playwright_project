import { Page } from '@playwright/test'
import {  checkoutCompleteLocators } from '../locators/checkoutComplete.locator'
export class CheckoutCompletePage {
    constructor(private readonly page: Page) {
        this.page = page;
    }
    async verifyCompletionMessages(mainMessage: string, subMessage: string) {
        const displayedMainMessage = await this.page.getByTestId(checkoutCompleteLocators.messageHeader).innerText();
        if (displayedMainMessage != mainMessage)
            throw new Error(`Displayed main message is not matching. Expected: ${mainMessage}, Actual:${displayedMainMessage}`);

        const displayedSubMessage = await this.page.getByTestId(checkoutCompleteLocators.messageText).innerText();
        if (displayedSubMessage != subMessage)
            throw new Error(`Displayed sub message is not matching. Expected: ${subMessage}, Actual: ${displayedSubMessage}`)
    }

    async clickBackToHome() {
        await this.page.getByTestId(checkoutCompleteLocators.backToHomeBtn).click();
    }
}
