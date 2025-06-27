import { Page, Locator } from '@playwright/test'
import { ProductLocators } from '../locators/products.locator'
import { CommonLocator } from '../locators/common.locator'
import { expect } from '../fixtures/setup'

export class ProductPage {

    readonly sortDropdown: Locator;
    readonly productNames: Locator;
    readonly productPrices: Locator;

    constructor(private readonly page: Page) {
        this.page = page;
        this.sortDropdown = this.page.getByTestId(ProductLocators.sortButtonLocator);
        this.productNames = this.page.locator(ProductLocators.itemNameLocator);
        this.productPrices = this.page.getByTestId(ProductLocators.itemPriceLocator);
    }

    async addDesiredProductToCart(desiredProduct: string) {
        //click add to cart
        const addToCartBtn = await this.getButtonLocatorByProductName(desiredProduct, 'ADD TO CART');
        await addToCartBtn.click();
        const removeBtn = await this.getButtonLocatorByProductName(desiredProduct, 'Remove');
        const isVisible = await removeBtn.isVisible();
        if (!isVisible) {
            throw new Error('After clicking AddToCart, button is not changed to Remove');
        }

    }

    async removeAddedItemFromCart(productName: string) {
        const removeBtn = await this.getButtonLocatorByProductName(productName, 'Remove');
        await removeBtn.click();

        const addToCartBtn = await this.getButtonLocatorByProductName(productName, 'ADD TO CART')
        await expect(addToCartBtn).toHaveText('ADD TO CART');
    }

    

    private async getButtonLocatorByProductName(productName: string, buttonName: string): Promise<any> {
        const button = this.page.getByTestId(ProductLocators.inventoryItemLocator)
            .filter({ has: this.page.locator(ProductLocators.itemNameLocator, { hasText: productName }) })
            .locator(ProductLocators.itemAddToCartBtnLocator, { hasText: buttonName });
        return button;
    }

    // sort 
    async sortBy(option: 'az' | 'za' | 'hilo' | 'lohi') {
        // sort button to be visible
        await expect(this.sortDropdown).toBeVisible();
        await this.sortDropdown.selectOption({ value: option });
    }

    // verify sorted
    async verifySort(option: string) {
        await expect(this.sortDropdown).toHaveValue(option)
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
    async expectNamesSortedAtoZ() {
        const names = await this.getProductNames();
        const sorted = [...names].sort();
        expect(names).toEqual(sorted);
    }
    //sort z to a
    async expectNamesSortedZtoA() {
        const names = await this.getProductNames();
        const sorted = [...names].sort().reverse();
        expect(names).toEqual(sorted);
    }
    //sort pr hi to lo
    async expectPricesSortedHiToLo() {
        const prices = await this.getProductPrices();
        const sorted = [...prices].sort((a, b) => b - a);
        expect(prices).toEqual(sorted);
    }
    //sort pr lo to hi
    async expectPricesSortedLotoHi() {
        const prices = await this.getProductPrices();
        const sorted = [...prices].sort((a, b) => a - b);
        console.log(prices);
        console.log(sorted);
        expect(prices).toEqual(sorted);
    }




}