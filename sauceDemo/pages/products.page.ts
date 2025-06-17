import {Page} from '@playwright/test'
import {ProductLocators} from '../locators/products.locator'
import {expect} from '../fixtures/setup'

export class ProductPage {

    constructor (private readonly page: Page) {
        this.page = page;
    }

    async addDesiredProductToCart(desiredProduct: string) {
        const addToCartBtn = await this.getButtonLocatorByProductName(desiredProduct, 'ADD TO CART');
        await addToCartBtn.click();

        const removeBtn = await this.getButtonLocatorByProductName(desiredProduct, 'Remove');
        await expect(removeBtn).toHaveText('Remove');
    }

    async removeAddedItemFromCart(productName : string) {
        const removeBtn = await this.getButtonLocatorByProductName(productName, 'Remove'); 
        await removeBtn.click();

        const addToCartBtn = await this.getButtonLocatorByProductName(productName, 'ADD TO CART')
        await expect(addToCartBtn).toHaveText('ADD TO CART');
    }

    private async getButtonLocatorByProductName(productName: string, buttonName: string): Promise<any>{
        const button = this.page.getByTestId(ProductLocators.inventoryItemLocator)
                 .filter({has: this.page.locator(ProductLocators.itemNameLocator, {hasText: productName})})
                 .locator(ProductLocators.itemAddToCartBtnLocator,{hasText: buttonName});
        return button;
    }

}