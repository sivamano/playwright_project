import {Page} from '@playwright/test'
import {CheckoutCompleteLocators} from '../locators/checkoutComplete.locator'
export class CheckoutCompletePage {
    constructor(private readonly page: Page){
        this.page= page;
    }
    async verifyCompletionMessages(mainMessage: string, subMessage: string){
        const displayedMainMessage = await this.page.getByTestId(CheckoutCompleteLocators.messageHeader).innerText();
        if(displayedMainMessage!=mainMessage)
            throw new Error(`Displayed main message is not matching. Expected: ${mainMessage}, Actual:${displayedMainMessage}`);

        const displayedSubMessage = await this.page.getByTestId(CheckoutCompleteLocators.messageText).innerText();
        if(displayedSubMessage!=subMessage)
            throw new Error(`Displayed sub message is not matching. Expected: ${subMessage}, Actual: ${displayedSubMessage}`)
    }
}
