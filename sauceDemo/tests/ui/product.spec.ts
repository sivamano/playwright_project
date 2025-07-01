import { test, expect } from '../../fixtures/setup';
import { LoginPage } from '../../pages/login.page';
import { Page } from '@playwright/test'
import { ProductPage } from '../../pages/products.page';
import { CommonUtilityForPages } from '../../pages/common.page'
import { ProductItemsPage } from '../../pages/productItem.page'

import { PRODUCT_MESSAGES, PRODUCTS } from '../../constants/productPage.constants'

import { ProductDetails } from '../../types/productTypes'
import { getUser } from '../../utils/loadUsers'
import { URI } from '../../utils/resources'


let lp: LoginPage;
let pp: ProductPage;
let pi: ProductItemsPage;
let cu: CommonUtilityForPages;

test.describe('products page negative tests', async () => {
    test.beforeAll(async () => {
        //some code
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        lp = new LoginPage(page)
        pp = new ProductPage(page)
        cu = new CommonUtilityForPages(page)
    });

    test('error user tries to remove product from cart in products page @negative @errorUserProductTest', async () => {
        test.fail();
        //test-data
        const user = getUser('error');
        const indexProd = Math.floor(Math.random() * PRODUCTS.length)
        const product: ProductDetails = {
            name: PRODUCTS[indexProd].name,
            description: PRODUCTS[indexProd].desc,
            quantity: '1',
            price: PRODUCTS[indexProd].price
        }
        //test
        await lp.login(user.username, user.password);
        await pp.addProductToCartByName(product.name);
        await pp.removeAddedItemFromCart(product.name);

    });

    test('error user tries to add problem product @negative @errorUserProblemProduct', async () => {
        test.fail();
        const user = getUser('error');
        const product: ProductDetails = {
            name: PRODUCTS[1].name,
            description: PRODUCTS[1].desc,
            quantity: '1',
            price: PRODUCTS[1].price
        }
        //test
        await lp.login(user.username, user.password);
        await pp.addProductToCartByName(product.name);

    })

    test('error user tries to sort @negative @errorUserSortMechanism', async () => {
        test.fail();

        const user = getUser('error');

        await lp.login(user.username, user.password);
        await pp.sortBy('za');
        await pp.verifyNamesSortedZtoA();
    })

    test('test problem user wrong product image @problemUserWrongProductImage', async ({ page }) => {
        test.skip()
        const user = getUser('problem')
        await lp.login(user.username, user.password);
        await expect(page).toHaveScreenshot('products_negative_tests.png', {
            timeout: 3000,
            threshold: 0.1,
            maxDiffPixelRatio: 0.1,
        });
    })
});

test.describe('products page positive tests', async () => {
    test.beforeAll(async () => {
        //some code
    })
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        lp = new LoginPage(page);
        pp = new ProductPage(page);
        pi = new ProductItemsPage(page);
        cu = new CommonUtilityForPages(page);
    })
    test('Adding a product to cart in product details page @productDetailPageTest @positive', async ({ page }) => {
        /*algol
        login
        navigate to products page
        click the name of your desired product
        verify the details in product details page and add product to cart there
        verify remove button in the added product
        */
        // test data
        const user = getUser('standard');
        const indexProd = Math.floor(Math.random() * PRODUCTS.length)
        const product: ProductDetails = {
            name: PRODUCTS[indexProd].name,
            description: PRODUCTS[indexProd].desc,
            quantity: '1',
            price: PRODUCTS[indexProd].price,
            productImageURL: PRODUCTS[indexProd].image_url
        }
        //test
        await lp.login(user.username, user.password);
        await expect(await cu.getPageSectionHeading()).toHaveText(PRODUCT_MESSAGES.sectionTitle);
        await pp.clickDesriedProduct(product.name);
        await expect(page).toHaveURL(new RegExp(`${URI.inventoryItem}\\?id=\\d+`));
        await pi.verifyProductItem(product);
        await pi.addDesriedItemToCart();
        await pi.backToProductsPage();
        await expect(await cu.getPageSectionHeading()).toHaveText(PRODUCT_MESSAGES.sectionTitle);
        await pp.verifyItemAddedToCart(product.name);


    })

    test('shopping cart badge count @cartBadgeCount @positive', async ({ page }) => {
        /*test-objective
        login, add multiple products, check cart badge number is equivalent to added products
        */
        //test-data
        const user = getUser('standard');
        let numberOfProducts: number = 5;
        const selectedProductIndexes: Set<number> = new Set();
        while (selectedProductIndexes.size <= numberOfProducts) {
            selectedProductIndexes.add(Math.floor(Math.random() * PRODUCTS.length))
        }
        const selectedProducts: ProductDetails[] = Array.from(selectedProductIndexes).map(index => ({
            name: PRODUCTS[index].name,
            description: PRODUCTS[index].desc,
            quantity: '1',
            price: PRODUCTS[index].price
        }))
        //test
        await lp.login(user.username, user.password);
        await expect(await cu.getPageSectionHeading()).toHaveText(PRODUCT_MESSAGES.sectionTitle)
        for (const product of selectedProducts) {
            await pp.addProductToCartByName(product.name);
        }
        let badgeCount: number = await cu.getCartBadgeCount();
        expect(badgeCount).toEqual(selectedProductIndexes.size);
    })

    test('verify if products in cart are unmodified for users different sessions @cartUnmodifiedStandardUser @positive', async ({ page }) => {
        /*test-objective
        login,add product to cart, logout, relogin, check if that product is still present
        */

        //test-data
        const user = getUser('standard');
        const index = Math.floor(Math.random() * PRODUCTS.length)
        const product: ProductDetails = {
            name: PRODUCTS[index].name,
            description: PRODUCTS[index].desc,
            quantity: '1',
            price: PRODUCTS[index].price
        }

        //test
        await lp.login(user.username, user.password);
        await expect(await cu.getPageSectionHeading()).toHaveText(PRODUCT_MESSAGES.sectionTitle);
        await pp.addProductToCartByName(product.name);
        await cu.logout();
        await expect(page).toHaveURL(URI.base);
        await lp.login(user.username, user.password);
        await expect(await cu.getPageSectionHeading()).toHaveText(PRODUCT_MESSAGES.sectionTitle);
        await pp.verifyItemAddedToCart(product.name);

    })

    test('product details basic verification @productDetailsBasicVerification @positive', async ({ page }) => {
        test.skip();
        const user = getUser('standard');
        const numberOfProducts: number = 5;
        const selectedProductsIndexes: Set<number> = new Set();
        while (selectedProductsIndexes.size <= numberOfProducts) {
            selectedProductsIndexes.add(Math.floor(Math.random() * PRODUCTS.length));
        }
        const selectedProducts: ProductDetails[] = Array.from(selectedProductsIndexes).map(index => ({
            name: PRODUCTS[index].name,
            description: PRODUCTS[index].desc,
            price: PRODUCTS[index].price,
            quantity: '1',
            productImageURL: PRODUCTS[index].image_url
        }));

        await lp.login(user.username, user.password);
        await expect(page).toHaveURL(URI.inventory);
        for (const product of selectedProducts) {
            await pp.verifyProductItem(product);
            const productImage = await pp.getProductImageLocator(product.name);
            await expect(productImage).toBeVisible();
            const snapshotName = `product-images/${product.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.png`;
            await expect(productImage).toHaveScreenshot(snapshotName, {
                threshold: 0.1,
                maxDiffPixelRatio: 0.1,
            });
        }


    })

})

