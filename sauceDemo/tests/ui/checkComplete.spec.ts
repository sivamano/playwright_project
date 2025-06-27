import { test } from '../../fixtures/setup'
import { LoginPage } from '../../pages/login.page'
import { ProductPage } from '../../pages/products.page'
import { YourCartPage } from '../../pages/yourCart.page'
import { YourInformationPage } from '../../pages/yourInformation.page'
import { CheckoutOverviewPage } from '../../pages/checkoutOverview.page'
import { CheckoutCompletePage } from '../../pages/checkoutComplete.page'
import { CommonUtilityForPages } from '../../pages/common.page'

import {ProductDetails} from '../../types/productTypes'
import {CustomerInformation} from '../../types/customerTypes'

import {getUser} from '../../utils/loadUsers'
import {URI} from '../../utils/resources'
import {PRODUCT_MESSAGES, PRODUCTS} from '../../utils/productPage.messages'
import {YOUR_CART_MESSAGES} from '../../utils/yourCartPage.messages'
import {YOUR_INFORMATION_MESSAGES} from '../../utils/yourInformationPage.messages'
import {CHECKOUT_OVERVIEW_MESSAGES} from '../../utils/checkoutOverview.messages'
import {CHECKOUT_COMPLETE_MESSAGES} from '../../utils/checkoutComplete.messages'

import testCustomer from '../../test-data/testCustomer.json'

import {expect} from '@playwright/test'

let lp: LoginPage;
let pp: ProductPage;
let yc: YourCartPage;
let yi: YourInformationPage;
let co: CheckoutOverviewPage;
let ccomp: CheckoutCompletePage;
let cu: CommonUtilityForPages;

test.describe('Checkout complete successful test ', async () => {
    test.beforeAll(async () => {
        //some code
    })

    test.beforeEach(async ({ page }) => {
        page.goto('/');
        lp = new LoginPage(page);
        pp = new ProductPage(page);
        yc = new YourCartPage(page);
        yi = new YourInformationPage(page);
        co = new CheckoutOverviewPage(page);
        ccomp= new CheckoutCompletePage(page);
        cu = new CommonUtilityForPages(page);
    })

   test('perfomance glitch user successfull order of products @perfGlitchAllSuccess @positive', async({page})=>{
        // constants used in this test
        const perfGlitch = getUser('perfGlitch')
        const indexProd =  Math.floor(Math.random() * PRODUCTS.length) // to randomly pick a product from the array PRODUCTS
        const productDetails: ProductDetails = {
            name: PRODUCTS[indexProd].name,
            description: PRODUCTS[indexProd].desc,
            price: PRODUCTS[indexProd].price,
            quantity: "1"
        }
        const indexCust = Math.floor(Math.random() * testCustomer.length)
        const fn = testCustomer[indexCust].firstName;
        const ln = testCustomer[indexCust].lastName;
        const zc = testCustomer[indexCust].postalCode;

        //test begins, first login
        await lp.login(perfGlitch.username, perfGlitch.password);
        //check if Products page has been navigated to successfully
        await expect(page).toHaveURL(URI.inventory);
        await expect(await cu.getPageSectionHeading()).toHaveText(PRODUCT_MESSAGES.sectionTitle);
        //add products to cart
        const product = productDetails.name;
        await pp.addDesiredProductToCart(product);
        //move to your cart page
        await cu.clickCartButton();
        await expect(await cu.getPageSectionHeading()).toHaveText(YOUR_CART_MESSAGES.sectionTitle); 
        //verify products in cart
        await yc.verifyItemsInCart(productDetails);
        //checkout and proceed
        await yc.clickCheckOutButton();
        await expect(await cu.getPageSectionHeading()).toHaveText(YOUR_INFORMATION_MESSAGES.sectionTitle);
        // enter customer details
        await yi.enterUserInformation(fn,ln,zc);
        // click continue
        await yi.proceedToCheckoutOverviewPage();
        await expect(await cu.getPageSectionHeading()).toHaveText(CHECKOUT_OVERVIEW_MESSAGES.sectionTitle);
        //verify product info in checkout overview page
        await co.verifyItemsInOverview(productDetails);
        //verify payment information
        await co.verifyPaymentInfo(CHECKOUT_OVERVIEW_MESSAGES.paymentInformation);
        //verify shipping information
        await co.verifyShippingInfo(CHECKOUT_OVERVIEW_MESSAGES.shippingInformation);
        //verify total amount
        await co.verifyFinalAmount();
        //proceed to order the product
        await co.buyProducts();
        await expect(await cu.getPageSectionHeading()).toHaveText(CHECKOUT_COMPLETE_MESSAGES.sectionTitle);
        //verify success exit messages
        await ccomp.verifyCompletionMessages(CHECKOUT_COMPLETE_MESSAGES.messageHeader,CHECKOUT_COMPLETE_MESSAGES.messageText);

    } );

    test('standard user orders a single product @standardUserSingleProd @positive',async({page})=>{
        //test data for this test
        const user = getUser('standard');
        const indexProd = Math.floor(Math.random() * PRODUCTS.length)
        const productDetails: ProductDetails ={
            name: PRODUCTS[indexProd].name,
            description: PRODUCTS[indexProd].desc,
            price: PRODUCTS[indexProd].price,
            quantity: '1'
        }
        const indexCust = Math.floor(Math.random()* testCustomer.length)
        const customerInformation: CustomerInformation = {
            firstName: testCustomer[indexCust].firstName,
            lastName: testCustomer[indexCust].lastName,
            zipCode: testCustomer[indexCust].postalCode
        }
        const fn = customerInformation.firstName;
        const ln = customerInformation.lastName;
        const zc = customerInformation.zipCode;

        //login
        await lp.login(user.username,user.password);
        //verify login successfull
        await expect(page).toHaveURL(URI.inventory);
        //select a product
        await pp.addDesiredProductToCart(productDetails.name);
        //click cart button
        await cu.clickCartButton();
        //verify your cart page loaded successfully
        await expect(page).toHaveURL(URI.cart);
        //verify items you added to cart is/are present
        await yc.verifyItemsInCart(productDetails);
        //click checkout and proceed
        await yc.clickCheckOutButton();
        //verify your information page loaded successfully
        await expect(page).toHaveURL(URI.checkoutOne);
        //fill your information
        await yi.enterUserInformation(fn,ln,zc);
        //click continue
        await yi.proceedToCheckoutOverviewPage();
        //verify checkout 1 (overview)page is loaded successfully
        await expect(page).toHaveURL(URI.checkoutTwo);
        //verify the products, payment, shipping, and total amount info
        await co.verifyItemsInOverview(productDetails);
        await co.verifyPaymentInfo(CHECKOUT_OVERVIEW_MESSAGES.paymentInformation);
        await co.verifyShippingInfo(CHECKOUT_OVERVIEW_MESSAGES.shippingInformation);
        await co.verifyPreTaxAmount();
        await co.verifyFinalAmount();
        //click finish
        await co.buyProducts();
        //verify checkout 2 (complete) page is navigated successfully
        await expect(page).toHaveURL(URI.completeCheckout);
        //verify the thank you messages and close
        await ccomp.verifyCompletionMessages(CHECKOUT_COMPLETE_MESSAGES.messageHeader,CHECKOUT_COMPLETE_MESSAGES.messageText);
    })

    test('standard user order multiple prod @standardUserMultipleProd @positive', async({page})=>{
        const user = getUser('standard');
        const numberOfProducts = 4;
        const selectedProductsIndexes: Set<number> = new Set();
        while(selectedProductsIndexes.size<=numberOfProducts) {
            selectedProductsIndexes.add(Math.floor(Math.random()*PRODUCTS.length));
        }
        const selectedProducts: ProductDetails[] = Array.from(selectedProductsIndexes).map(index=> ({
            name: PRODUCTS[index].name,
            description: PRODUCTS[index].desc,
            price: PRODUCTS[index].price,
            quantity: '1'
        }));
        const indexCust = Math.floor(Math.random()* testCustomer.length)
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
        for (const products of selectedProducts){
            await pp.addDesiredProductToCart(products.name)
        }
        await cu.clickCartButton();
        await expect(page).toHaveURL(URI.cart);
        for (const products of selectedProducts){
            await yc.verifyItemsInCart(products)
        }
        await yc.clickCheckOutButton();
        await expect(page).toHaveURL(URI.checkoutOne);
        await yi.enterUserInformation(fn,ln,zc);
        await yi.proceedToCheckoutOverviewPage();
        await expect(page).toHaveURL(URI.checkoutTwo);
        for(const products of selectedProducts){
            await co.verifyItemsInOverview(products);
        }
        await co.verifyPaymentInfo(CHECKOUT_OVERVIEW_MESSAGES.paymentInformation);
        await co.verifyShippingInfo(CHECKOUT_OVERVIEW_MESSAGES.shippingInformation);
        await co.verifyPreTaxAmount();
        await co.verifyFinalAmount();
        await co.buyProducts();
        await expect(page).toHaveURL(URI.completeCheckout);
        await ccomp.verifyCompletionMessages(CHECKOUT_COMPLETE_MESSAGES.messageHeader,CHECKOUT_COMPLETE_MESSAGES.messageText);
    })
})