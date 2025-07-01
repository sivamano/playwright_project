import { yourCartLocators } from '../locators/yourCart.locator'
import { Page } from '@playwright/test'
import { ProductDetails } from '../types/productTypes'

export class YourCartPage {
    constructor(private readonly page: Page) {
        this.page = page;
    }

    async verifyItemsInCart(productDetails: ProductDetails) {
        // get the specific cart item based on provided name
        const cartItem = await this.getProductByName(productDetails.name);

        // verify quantity of item has not changed
        const qty = await cartItem.locator(yourCartLocators.itemQuantity).innerText();
        if (qty != productDetails.quantity)
            throw new Error(`Item Quantity is different. Expected: ${productDetails.quantity}, Actual: ${qty}`)
        // verify item description has not changed
        const desc = await cartItem.locator(yourCartLocators.itemDescription).innerText();
        if (desc != productDetails.description)
            throw new Error(`Item Description is different. Expected:${productDetails.description}, Actual:${desc}`)
        // verify items price has not changed
        const price = await cartItem.locator(yourCartLocators.itemPrice).innerText();
        if (price != productDetails.price)
            throw new Error(`Item price is different. Expected: ${productDetails.price}, Actual: ${price}`)
        // verify the state of the button is 'Remove'
        const btnState = await cartItem.locator(yourCartLocators.itemRemoveButton).innerText();
        if (btnState != "Remove")
            throw new Error('Button name is not remove');
    }

    async removeItemFromCart(productName: string) {
        const cartItem = await this.getProductByName(productName);
        const removeBtn = cartItem.locator(yourCartLocators.itemRemoveButton);
        await removeBtn.click();

    }

    async verifyNullItemsInCart(){
        const countOfInventoryItem = await this.page.getByTestId(yourCartLocators.inventoryItem).count();
        if(countOfInventoryItem!=0)
            throw new Error('There are some items present in your cart page')
    }

    async clickCheckOutButton() {
        await this.page.getByTestId(yourCartLocators.checkoutButton).click();
    }

    async clickContinueShoppingButton() {
        await this.page.getByTestId(yourCartLocators.continueShopping).click();
    }

    private async getProductByName(productName: string) {
        const cartItem = this.page.getByTestId(yourCartLocators.inventoryItem)
            .filter({ has: this.page.locator(yourCartLocators.itemName, { hasText: productName }) });
        return cartItem;
    }
}
