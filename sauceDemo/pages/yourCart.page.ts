import {yourCartLocators} from '../locators/yourCart.locator'
import {Page} from '@playwright/test'
import {expect} from '../fixtures/setup'

export class YourCartPage {
    constructor (private readonly page: Page){
        this.page = page ;
    }

    async verifyCartItems(productName: string, productDescription: string, productQuantity: number, productPrice: string,removeButton: string){
        // get the specific cart item based on provided name
        const cartItem = this.page.getByTestId(yourCartLocators.inventoryItem)
                   .filter({has: this.page.locator(yourCartLocators.itemName, {hasText: productName})});
        // verify quantity of item has not changed
        await expect(cartItem.locator(yourCartLocators.itemQuantity)).toHaveText(productQuantity.toString());
        // verify item description has not changed
        await expect(cartItem.locator(yourCartLocators.itemDescription)).toHaveText(productDescription);
         // verify items price has not changed           
        //await expect(cartItem.filter({has: this.page.locator(yourCartLocators.itemPrice,{hasText:productQuantity.toString()})})).toHaveText(productQuantity.toString());
        await expect(cartItem.locator(yourCartLocators.itemPrice)).toHaveText(productPrice);
        // verify the state of the button is 'Remove' 
        await expect(cartItem.locator(yourCartLocators.itemRemoveButton)).toHaveText(removeButton);
    }
        
    }
