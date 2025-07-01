import { Page } from '@playwright/test'
import { productItemLocators } from '../locators/productItems.locator'
import { ProductDetails } from '../types/productTypes'

export class ProductItemsPage {

    constructor(private readonly page: Page) {
        this.page = page;
    }

    async verifyProductItem(productDetails: ProductDetails) {
        const displyedProductName = await this.page.getByTestId(productItemLocators.productName).innerText();
        const displayedProductDesc = await this.page.getByTestId(productItemLocators.productDesc).innerText();
        const displayedPrice = await this.page.getByTestId(productItemLocators.productPrice).innerText();
        const dislayedProductImage = await this.page.getAttribute(productItemLocators.productImage,'alt');
        if (displyedProductName != productDetails.name)
            throw new Error(`Product name is not matching. Expected: ${productDetails.name}, Actual: ${displyedProductName} `)
        if (displayedProductDesc != productDetails.description)
            throw new Error(`Product price is not matching. Expected: ${productDetails.description}, Actual: ${displayedProductDesc}`)
        if (displayedPrice != productDetails.price)
            throw new Error(`Product price is not matching. Expected: ${productDetails.price}, Actual: ${displayedPrice}`)
        if(dislayedProductImage!=productDetails.name)
            throw new Error (`Product Image is not matching. Expected: ${productDetails.name}, Actual: ${dislayedProductImage}`)
    }

    async addDesriedItemToCart(){
        await this.page.getByTestId(productItemLocators.addToCartBtn).click();
    }

    async backToProductsPage(){
        await this.page.getByTestId(productItemLocators.backToProductsBtn).click();
    }
}