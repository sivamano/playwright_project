import {CheckoutOverviewLocators} from '../locators/checkoutOverview.locator'
import {CheckoutCompleteLocators} from '../locators/checkoutComplete.locator'

import {Page} from '@playwright/test'
import {expect} from '../fixtures/setup'
import {ProductDetails} from '../types/productTypes'

export class CheckoutOverviewPage {
    constructor (private readonly page: Page){
        this.page = page;
    }

    async verifyItemsInOverview(productDetails: ProductDetails) {
        const itemName =  this.page.getByTestId(CheckoutOverviewLocators.cartItemLocator)
        .filter({has:  this.page.locator(CheckoutOverviewLocators.itemNameLocator,{hasText: productDetails.name})});
        //verify prod quantity
        const qty = await itemName.getByTestId(CheckoutOverviewLocators.itemQuantityLocator).innerText();
        if(qty!= productDetails.quantity)
            throw new Error(`Quantity of item is not matching. Expected: ${productDetails.quantity}, Actual: ${qty}`);
        //verify prod description
        const desc = await itemName.getByTestId(CheckoutOverviewLocators.itemDescLocator).innerText();
        if(desc!= productDetails.description)
            throw new Error(`Product Description is not matching. Expected: ${productDetails.description}, Actual: ${desc}`);
        //verify product price
        const price = await itemName.getByTestId(CheckoutOverviewLocators.itemPriceLocator).innerText();
        if(price!=productDetails.price)
            throw new Error(`Product Price is not matching. Expected: ${productDetails.price}, Actual: ${price}`);
    }

    async verifyPaymentInfo(paymentMode: string){
        const paymentMsg = await this.page.getByTestId(CheckoutOverviewLocators.paymentInfoValue).innerText();
        if(paymentMsg!=paymentMode)
            throw new Error(`Payment information is incorrect. Expected: ${paymentMode}, Actual:${paymentMsg}`);
    }

    async verifyShippingInfo(modeOfShipment: string){
        const shippingMsg = await this.page.getByTestId(CheckoutOverviewLocators.shippingInfoValue).innerText();
        if(shippingMsg!=modeOfShipment)
            throw new Error(`Shipping information is incorrect. Expected: ${modeOfShipment}, Actual: ${shippingMsg}`);
        
    }
    
    async verifyPreTaxAmount(){
        const displayedPreTaxAmountText = await this.page.getByTestId(CheckoutOverviewLocators.preTaxAllItemsLabel).innerText();
        const match = displayedPreTaxAmountText.match(/\$[\d.]+/);
        if (!match) {
            throw new Error(`Could not find a valid price in: "${displayedPreTaxAmountText}"`);
        }
        const displayedPreTaxAmount = match[0];
        const computedPreTaxAmount = `$${await this.calculateTotalPreTax()}`
        if(computedPreTaxAmount!=displayedPreTaxAmount)
            throw new Error(`Total pre tax amount is incorrect. Expected: ${computedPreTaxAmount}, Actual: ${displayedPreTaxAmount}`)
    }
    async verifyFinalAmount(){
        const computedFinalAmount = await this.computeFinalAmountWithTax();
        const displayedFinalAmount = await this.page.getByTestId(CheckoutOverviewLocators.postTaxTotalLabel).innerText();
        if(computedFinalAmount!=displayedFinalAmount)
            throw new Error(`Error in tax computation. Expected:${computedFinalAmount}, Actual: ${displayedFinalAmount}`);
    }

    async buyProducts(){
        await this.page.getByTestId(CheckoutOverviewLocators.completeCheckout).click();
    
    }

    private async calculateTotalPreTax(): Promise<number>{
        const priceElements = await this.page.getByTestId(CheckoutOverviewLocators.itemPriceLocator).all();
        const prices: number[] =[];
        for(const priceEl of priceElements){
            const text = await priceEl.textContent();
            if(text){
                const numeric = parseFloat(text.replace('$',''));
                prices.push(numeric);
            }
        }
        const totalPreTax = prices.reduce((sum, val) => sum + val, 0);
        console.log(totalPreTax);
        return totalPreTax;
    }
    private async convertTaxTextToNumeric():Promise<number>{
        const taxText = await this.page.getByTestId(CheckoutOverviewLocators.taxAllItemsLabel).textContent();
        let taxNumeric: number | undefined = undefined;
        if (taxText) {
            taxNumeric = parseFloat(taxText.replace('Tax: $',''));
        }
        console.log(taxNumeric);
        return taxNumeric ?? 0;
    }
    private async computeFinalAmountWithTax(): Promise<string>{
        const finalNumeric = ((await this.convertTaxTextToNumeric()) + (await this.calculateTotalPreTax()));
        const finalNumericRoundedToTwoDigits = finalNumeric.toFixed(2);
        const finalAmount = "Total: $"+finalNumericRoundedToTwoDigits;
        console.log(finalAmount)
        return finalAmount;

    }
    }
