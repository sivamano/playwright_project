import { Page, Locator, expect } from '@playwright/test'
import { productLocators } from '../locators/products.locator'
import { COMMON_CONSTANTS } from '../constants/common.constants'
import { ProductDetails } from '../types/productTypes'

export class ProductPage {

    readonly sortDropdown: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;

    constructor(private readonly page: Page) {
        this.page = page;
        this.sortDropdown = this.page.getByTestId(productLocators.sortButtonLocator);
        this.productNames = this.page.locator(productLocators.itemNameLocator);
        this.productPrices = this.page.getByTestId(productLocators.itemPriceLocator);
    }

    async addProductToCartByName(productName: string) {
        //click add to cart
        const addToCartBtn = await this.getButtonLocatorByProductName(productName, COMMON_CONSTANTS.addToCartBtnName);
        await addToCartBtn.click();
        const removeBtn = await this.getButtonLocatorByProductName(productName, COMMON_CONSTANTS.removeBtnName);
        const isVisible = await removeBtn.isVisible();
        if (!isVisible) {
            throw new Error('After clicking AddToCart, button is not changed to Remove');
        }

    }

    async addProductToCartByPosition(position: number) {

        const desriedProduct = await this.getButtonLocatorByPosition(position);

        const products: ProductDetails = {
            name: await desriedProduct.locator(productLocators.itemNameLocator).innerText(),
            description: await desriedProduct.getByTestId(productLocators.itemDecLocator).innerText(),
            price: await desriedProduct.getByTestId(productLocators.itemPriceLocator).innerText(),
            quantity: '1'
        }

        const addToCartBtn = desriedProduct.locator(productLocators.itemAddToCartBtnLocator, { hasText: COMMON_CONSTANTS.addToCartBtnName })
        await addToCartBtn.click();
        const removeBtn = desriedProduct.locator(productLocators.itemAddToCartBtnLocator, { hasText: COMMON_CONSTANTS.removeBtnName })
        const isVisible = await removeBtn.isVisible();
        if (!isVisible) {
            throw new Error('After clicking AddToCart, button is not changed to Remove')
        }

        return products;
    }

    async removeAddedItemFromCart(productName: string) {
        const removeBtn = await this.getButtonLocatorByProductName(productName, COMMON_CONSTANTS.removeBtnName);
        await removeBtn.click();

        const addToCartBtn = await this.getButtonLocatorByProductName(productName, COMMON_CONSTANTS.addToCartBtnName)
        const isVisible = await addToCartBtn.isVisible();
        if (!isVisible) {
            throw new Error('After clicking Remove, button is not changed to AddToCart');
        }
    }

    async clickDesriedProduct(productName: string) {
        await this.page.locator(productLocators.itemNameLocator, { hasText: productName }).click();
    }

    async verifyItemAddedToCart(productName: string) {
        const removeBtn = await this.getButtonLocatorByProductName(productName, COMMON_CONSTANTS.removeBtnName);
        const isVisible = await removeBtn.isVisible();
        if (!isVisible) {
            throw new Error('After adding product, button is not changed to Remove status');
        }
    }

    async verifyItemRemovedFromCart(productName: string) {
        const addToCartBtn = await this.getButtonLocatorByProductName(productName, COMMON_CONSTANTS.addToCartBtnName);
        const isVisible = await addToCartBtn.isVisible();
        if (!isVisible) {
            throw new Error('After removing product, button is not changed to Add to Cart status');
        }
    }

    async verifyProductItem(productDetails: ProductDetails) {
        const desiredProduct = this.page.getByTestId(productLocators.inventoryItemLocator)
            .filter({ has: this.page.locator(productLocators.itemNameLocator, { hasText: productDetails.name }) })
        const displyedProductName = await desiredProduct.locator(productLocators.itemNameLocator).innerText();
        const displayedProductDesc = await desiredProduct.getByTestId(productLocators.itemDecLocator).innerText();
        const displayedPrice = await desiredProduct.getByTestId(productLocators.itemPriceLocator).innerText();
        const addToCartButtonVisible = await desiredProduct.locator(productLocators.itemAddToCartBtnLocator, { hasText: COMMON_CONSTANTS.addToCartBtnName }).isVisible();
        if (displyedProductName != productDetails.name)
            throw new Error(`Product name is not matching. Expected: ${productDetails.name}, Actual: ${displyedProductName} `)
        if (displayedProductDesc != productDetails.description)
            throw new Error(`Product price is not matching. Expected: ${productDetails.description}, Actual: ${displayedProductDesc}`)
        if (displayedPrice != productDetails.price)
            throw new Error(`Product price is not matching. Expected: ${productDetails.price}, Actual: ${displayedPrice}`)
        if (!addToCartButtonVisible)
            throw new Error(`ADD TO CART button is not visible`)
    }

    async getProductImageLocator(productName: string): Promise<Locator> {
        const desiredProduct = this.page.getByTestId(productLocators.inventoryItemLocator)
            .filter({
                has: this.page.locator(productLocators.itemNameLocator, { hasText: productName })
            });

        const productImage = desiredProduct.locator(productLocators.genericImg);
        return productImage;
    }
    // sort 
    async sortBy(option: 'az' | 'za' | 'hilo' | 'lohi') {
        await this.sortDropdown.selectOption({ value: option });
        const visibleOption = await this.sortDropdown.inputValue()
        if (visibleOption != option)
            throw new Error(`Selected value and displayed value are not matching. Expected: ${option}, Acutal: ${visibleOption}`)
    }
    // getproductNames
    async getProductNames(): Promise<string[]> {
        return await this.productNames.allTextContents();
    }
    // getproductNames
    async getProductPrices(): Promise<number[]> {
        const text = await this.productPrices.allTextContents();
        return text.map(p => parseFloat(p.replace('$', '')))
    }
    //sort a to z
    async verifyNamesSortedAtoZ() {
        const names = await this.getProductNames();
        const sorted = [...names].sort();
        const isEqual = await this.sortComparison(names, sorted);
        if (!isEqual) {
            throw new Error('Sorting based on name (A to Z) has failed');
        }
    }
    //sort z to a
    async verifyNamesSortedZtoA() {
        const names = await this.getProductNames();
        const sorted = [...names].sort().reverse();
        const isEqual = await this.sortComparison(names, sorted);
        if (!isEqual) {
            throw new Error('Sorting based on name (Z to A) has failed');
        }
    }
    //sort pr hi to lo
    async verifyPricesSortedHiToLo() {
        const prices = await this.getProductPrices();
        const sorted = [...prices].sort((a, b) => b - a);
        const isEqual = await this.sortComparison(prices, sorted);
        if (!isEqual) {
            throw new Error('Sorting based on price (Hi to Lo) has failed');
        }

    }
    //sort pr lo to hi
    async verifyPricesSortedLotoHi() {
        const prices = await this.getProductPrices();
        const sorted = [...prices].sort((a, b) => a - b);
        const isEqual = await this.sortComparison(prices, sorted);
        if (!isEqual) {
            throw new Error('Sorting based on price (Lo to Hi) has failed');
        }
    }

    private async getButtonLocatorByPosition(position: number) {
        const desiredInventoryItem = this.page.getByTestId(productLocators.inventoryItemLocator).nth(position);
        return desiredInventoryItem;

    }
    private async getButtonLocatorByProductName(productName: string, buttonName: string): Promise<any> {
        const button = this.page.getByTestId(productLocators.inventoryItemLocator)
            .filter({ has: this.page.locator(productLocators.itemNameLocator, { hasText: productName }) })
            .locator(productLocators.itemAddToCartBtnLocator, { hasText: buttonName });
        return button;
    }
    private async sortComparison<T>(prices: T[], sorted: T[]): Promise<boolean> {
        if (prices.length !== sorted.length)
            return false;
        return prices.every((val, index) => val === sorted[index])
    }


}