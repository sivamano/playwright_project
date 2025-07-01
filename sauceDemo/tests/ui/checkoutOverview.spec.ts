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
import { PRODUCT_MESSAGES, PRODUCTS } from '../../constants/productPage.constants'
import { YOUR_CART_MESSAGES } from '../../constants/yourCartPage.constants'
import { YOUR_INFORMATION_MESSAGES } from '../../constants/yourInformationPage.constants'
import { CHECKOUT_OVERVIEW_MESSAGES } from '../../constants/checkoutOverview.constants'


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
        //test fail annotation
        test.fail();

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
        await pp.addProductToCartByName(productDetails.name);
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

    })


})

test.describe('positive test of checkoutOverview page', async () => {
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

    test('infomation displayed properly in Overview Page @overviewPageInfo @positive', async ({ page }) => {
        //constants for this test
        const user = getUser('standard');
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
        const fn = customerInformation.firstName;
        const ln = customerInformation.lastName;
        const zc = customerInformation.zipCode;

        await lp.login(user.username, user.password);
        await expect(page).toHaveURL(URI.inventory);
        await expect(await cu.getPageSectionHeading()).toHaveText(PRODUCT_MESSAGES.sectionTitle);
        await pp.addProductToCartByName(productDetails.name);
        await cu.clickCartButton();
        await expect(await cu.getPageSectionHeading()).toHaveText(YOUR_CART_MESSAGES.sectionTitle);
        await yc.verifyItemsInCart(productDetails);
        await yc.clickCheckOutButton();
        await expect(await cu.getPageSectionHeading()).toHaveText(YOUR_INFORMATION_MESSAGES.sectionTitle);
        await yi.enterUserInformation(fn, ln, zc);
        await yi.proceedToCheckoutOverviewPage();
        await expect(await cu.getPageSectionHeading()).toHaveText(CHECKOUT_OVERVIEW_MESSAGES.sectionTitle);
        await co.verifyItemsInOverview(productDetails);
        await co.verifyPaymentInfo(CHECKOUT_OVERVIEW_MESSAGES.paymentInformation);
        await co.verifyShippingInfo(CHECKOUT_OVERVIEW_MESSAGES.shippingInformation);
    })

    test('cancel order in Overview Page @cancelInoverviewPage @positive', async ({ page }) => {
        //constants for this test
        const user = getUser('standard');
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
        const fn = customerInformation.firstName;
        const ln = customerInformation.lastName;
        const zc = customerInformation.zipCode;

        await lp.login(user.username, user.password);
        await expect(page).toHaveURL(URI.inventory);
        await expect(await cu.getPageSectionHeading()).toHaveText(PRODUCT_MESSAGES.sectionTitle);
        await pp.addProductToCartByName(productDetails.name);
        await cu.clickCartButton();
        await expect(await cu.getPageSectionHeading()).toHaveText(YOUR_CART_MESSAGES.sectionTitle);
        await yc.verifyItemsInCart(productDetails);
        await yc.clickCheckOutButton();
        await expect(await cu.getPageSectionHeading()).toHaveText(YOUR_INFORMATION_MESSAGES.sectionTitle);
        await yi.enterUserInformation(fn, ln, zc);
        await yi.proceedToCheckoutOverviewPage();
        await expect(await cu.getPageSectionHeading()).toHaveText(CHECKOUT_OVERVIEW_MESSAGES.sectionTitle);
        await co.cancelCheckout();
        await expect(await cu.getPageSectionHeading()).toHaveText(PRODUCT_MESSAGES.sectionTitle);

    })

    test('total item Value verification @totoalItemValueInOverviewPage @positive', async ({ page }) => {
        const user = getUser('standard');
        const numberOfProducts = 4;
        const selectedProductsIndexes: Set<number> = new Set();
        while (selectedProductsIndexes.size <= numberOfProducts) {
            selectedProductsIndexes.add(Math.floor(Math.random() * PRODUCTS.length));
        }
        const selectedProducts: ProductDetails[] = Array.from(selectedProductsIndexes).map(index => ({
            name: PRODUCTS[index].name,
            description: PRODUCTS[index].desc,
            price: PRODUCTS[index].price,
            quantity: '1'
        }));
        const indexCust = Math.floor(Math.random() * testCustomer.length)
        const customerInformation: CustomerInformation = {
            firstName: testCustomer[indexCust].firstName,
            lastName: testCustomer[indexCust].lastName,
            zipCode: testCustomer[indexCust].postalCode
        }
        const fn = customerInformation.firstName;
        const ln = customerInformation.lastName;
        const zc = customerInformation.zipCode;

        await lp.login(user.username, user.password);
        await expect(page).toHaveURL(URI.inventory);
        for (const products of selectedProducts) {
            await pp.addProductToCartByName(products.name)
        }
        await cu.clickCartButton();
        await expect(page).toHaveURL(URI.cart);
        for (const products of selectedProducts) {
            await yc.verifyItemsInCart(products)
        }
        await yc.clickCheckOutButton();
        await expect(page).toHaveURL(URI.checkoutOne);
        await yi.enterUserInformation(fn, ln, zc);
        await yi.proceedToCheckoutOverviewPage();
        await expect(page).toHaveURL(URI.checkoutTwo);
        for (const products of selectedProducts) {
            await co.verifyItemsInOverview(products);
        }
        await co.verifyPaymentInfo(CHECKOUT_OVERVIEW_MESSAGES.paymentInformation);
        await co.verifyShippingInfo(CHECKOUT_OVERVIEW_MESSAGES.shippingInformation);
        await co.verifyPreTaxAmount();
        await co.verifyFinalAmount();


    })

    test('navigate to your cart page from checkoutOverview page @yourCartFromOverview @positive', async ({ page }) => {
        //constants for this test
        const user = getUser('standard');
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
        const fn = customerInformation.firstName;
        const ln = customerInformation.lastName;
        const zc = customerInformation.zipCode;

        await lp.login(user.username, user.password);
        await expect(page).toHaveURL(URI.inventory);
        await expect(await cu.getPageSectionHeading()).toHaveText(PRODUCT_MESSAGES.sectionTitle);
        await pp.addProductToCartByName(productDetails.name);
        await cu.clickCartButton();
        await expect(await cu.getPageSectionHeading()).toHaveText(YOUR_CART_MESSAGES.sectionTitle);
        await yc.verifyItemsInCart(productDetails);
        await yc.clickCheckOutButton();
        await expect(await cu.getPageSectionHeading()).toHaveText(YOUR_INFORMATION_MESSAGES.sectionTitle);
        await yi.enterUserInformation(fn, ln, zc);
        await yi.proceedToCheckoutOverviewPage();
        await expect(await cu.getPageSectionHeading()).toHaveText(CHECKOUT_OVERVIEW_MESSAGES.sectionTitle);
        await cu.clickCartButton();
        await expect(await cu.getPageSectionHeading()).toHaveText(YOUR_CART_MESSAGES.sectionTitle);
    })

    
})