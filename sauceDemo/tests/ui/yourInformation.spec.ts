import { test, expect } from '../../fixtures/setup'
import { LoginPage } from '../../pages/login.page'
import { ProductPage } from '../../pages/products.page'
import { YourCartPage } from '../../pages/yourCart.page'
import { YourInformationPage } from '../../pages/yourInformation.page'
import { CommonUtilityForPages } from '../../pages/common.page'
import { PRODUCTS, PRODUCT_MESSAGES } from '../../constants/productPage.constants'
import { YOUR_CART_MESSAGES } from '../../constants/yourCartPage.constants'
import { YOUR_INFORMATION_MESSAGES } from '../../constants/yourInformationPage.constants'
import { getUser } from '../../utils/loadUsers'
import testCustomer from '../../test-data/testCustomer.json'
import { ProductDetails } from '../../types/productTypes'
import { CustomerInformation } from '../../types/customerTypes'
import { URI } from '../../utils/resources.ts'


let lp: LoginPage;
let pp: ProductPage;
let yc: YourCartPage;
let yi: YourInformationPage;
let cu: CommonUtilityForPages;

test.describe('negative tests of yourInformation page', async () => {
    test.beforeAll(async () => {
        //some code
    })

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        lp = new LoginPage(page);
        pp = new ProductPage(page);
        yc = new YourCartPage(page);
        yi = new YourInformationPage(page);
        cu = new CommonUtilityForPages(page);
    })

    test('error user lastName test @negative @errorUserLastNameTest', async ({ page }) => {
        //negative test case annotation
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
        await yi.enterLastName(customerInformation.lastName);

    });

});

test.describe('positive tests of yourInformation page', async () => {
    test.beforeAll(async () => {
        //some code
    })

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        lp = new LoginPage(page);
        pp = new ProductPage(page);
        yc = new YourCartPage(page);
        yi = new YourInformationPage(page);
        cu = new CommonUtilityForPages(page);
    })

    test('enter user information @positive @enterUserInformation ', async ({ page }) => {
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
        await yi.enterLastName(customerInformation.lastName);


    });

    test('cancel after entering user information @positive @cancelAfterUserInformation ', async ({ page }) => {
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
        await yi.enterLastName(customerInformation.lastName);
        await yi.cancelAndGoBack();
        await expect(await cu.getPageSectionHeading()).toHaveText(YOUR_CART_MESSAGES.sectionTitle);


    });

    test('navigate to yourCart page from yourInfo page @positive @navigateToYourCartFromInfo ', async ({ page }) => {
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
        await yi.enterLastName(customerInformation.lastName);
        await cu.clickCartButton();
        await expect(await cu.getPageSectionHeading()).toHaveText(YOUR_CART_MESSAGES.sectionTitle);


    });
    
});