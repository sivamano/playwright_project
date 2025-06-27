import { expect } from '@playwright/test'
import { test } from '../../fixtures/setup'
import { LoginPage } from '../../pages/login.page'
import { ProductPage } from '../../pages/products.page'
import { YourCartPage } from '../../pages/yourCart.page'
import { YourInformationPage } from '../../pages/yourInformation.page'
import { CheckoutOverviewPage } from '../../pages/checkoutOverview.page'
import { CommonUtilityForPages } from '../../pages/common.page'

import { ProductDetails } from '../../types/productTypes'
import { CustomerInformation } from '../../types/customerTypes'

import { getUser } from '../../utils/loadUsers'
import { URI } from '../../utils/resources'

import { PRODUCT_MESSAGES, PRODUCTS } from '../../utils/productPage.messages'
import { YOUR_CART_MESSAGES } from '../../utils/yourCartPage.messages'
import { YOUR_INFORMATION_MESSAGES } from '../../utils/yourInformationPage.messages'
import { CHECKOUT_OVERVIEW_MESSAGES } from '../../utils/checkoutOverview.messages'

import testCustomer from '../../test-data/testCustomer.json'



let lp: LoginPage;
let pp: ProductPage;
let yc: YourCartPage;
let yi: YourInformationPage;
let co: CheckoutOverviewPage;
let cu: CommonUtilityForPages;

test.describe('negative test of checkoutOverview page', async () => {
    test.beforeAll(async () => {
        //some code
    })

    test.beforeEach(async ({ page }) => {
        await page.goto('/')
        lp = new LoginPage(page);
        pp = new ProductPage(page);
        yc = new YourCartPage(page);
        yi = new YourInformationPage(page);
        co = new CheckoutOverviewPage(page);
        cu = new CommonUtilityForPages(page);
    })

    test('error user final checkout @negative @errorUserFinalCheckout', async ({ page }) => {
        //constants for this test
        const user = getUser('error');
        const indexProd = Math.floor(Math.random() * PRODUCTS.length)
        const productDetails: ProductDetails = {
            name: PRODUCTS[indexProd].name,
            description: PRODUCTS[indexProd].desc,
            quantity: '1',
            price: PRODUCTS[indexProd].price
        }
        const indexCust = Math.floor(Math.random() * testCustomer.length)
        const customerInformation: CustomerInformation = {
            firstName: testCustomer[indexCust].firstName,
            lastName: testCustomer[indexCust].lastName,
            zipCode: testCustomer[indexCust].postalCode
        }

        await lp.login(user.username, user.password);
        await expect(page).toHaveURL(URI.inventory);
        await expect(await cu.getPageSectionHeading()).toHaveText(PRODUCT_MESSAGES.sectionTitle);
        await pp.addDesiredProductToCart(productDetails.name);
        await cu.clickCartButton();
        await expect(await cu.getPageSectionHeading()).toHaveText(YOUR_CART_MESSAGES.sectionTitle);
        await yc.verifyItemsInCart(productDetails);
        await yc.clickCheckOutButton();
        await expect(await cu.getPageSectionHeading()).toHaveText(YOUR_INFORMATION_MESSAGES.sectionTitle);
        await yi.enterFirstName(customerInformation.firstName);
        await yi.enterZipCode(customerInformation.zipCode);
        await yi.proceedToCheckoutOverviewPage();
        await expect(await cu.getPageSectionHeading()).toHaveText(CHECKOUT_OVERVIEW_MESSAGES.sectionTitle);
        await co.verifyItemsInOverview(productDetails);
        await co.verifyPaymentInfo(CHECKOUT_OVERVIEW_MESSAGES.paymentInformation);
        await co.verifyShippingInfo(CHECKOUT_OVERVIEW_MESSAGES.shippingInformation);
        await co.verifyPreTaxAmount();
        await co.verifyFinalAmount();
        await co.buyProducts();
        await expect(page).toHaveURL(URI.completeCheckout);
        test.fail();
    })


})

test.describe('positive test cases', async () => {
    test.beforeAll(async () => {
        // some code
    })

    test.beforeEach(async ({ page }) => {
        //navigate to base url
        await page.goto('/');
        lp = new LoginPage(page);
        pp = new ProductPage(page);
        yc = new YourCartPage(page);
        yi = new YourInformationPage(page);
        co = new CheckoutOverviewPage(page);
        cu = new CommonUtilityForPages(page);
    })


})