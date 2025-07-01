import {Page} from '@playwright/test' 
import {expect} from '../fixtures/setup'
import {commonLocator} from '../locators/common.locator'
import {yourCartLocators} from '../locators/yourCart.locator'

export class CommonUtilityForPages {
    constructor(private readonly page: Page){
        this.page = page;
    }
    // error user sorting error js popup handling
    async handleSortingErrorDialog(){
        // page.on is setting up of listener for any JS alert/confirm/prompt
        this.page.on('dialog', async dialog=>{
            const message = dialog.message();
            //print error message
            console.log(`Dialog Message: ${message}`);
            //verify error message contains certain text
            expect(message).toContain('Sorting is broken!')
            //accept the error
            await dialog.accept();
        })
        
    }

    async clickCartButton() {
        await this.page.getByTestId(commonLocator.shoppingCartLinkLocator).click();
        await this.page.getByTestId(yourCartLocators.checkoutButton).waitFor({ state: 'visible' });
    }

    async getPageSectionHeading(){
        const sectionHeadingLocator = this.page.getByTestId(commonLocator.sectionHeading);
        return sectionHeadingLocator;
    }
    
    async getCartBadgeCount():Promise<number>{
        const badgeText = await this.page.getByTestId(commonLocator.cartBadgeLocator).innerText();
        const badgeCount = parseInt(badgeText,10);
        console.log(badgeCount);
        return badgeCount;
    }

    async logout(){
        await this.page.getByRole('button',{name: commonLocator.menuButtonLocator}).click();
        await this.page.getByTestId(commonLocator.logoutLink).click();
    }
}