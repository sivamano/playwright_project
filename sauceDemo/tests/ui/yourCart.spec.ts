import { test, expect } from '../../fixtures/setup'
import { LoginPage } from '../../pages/login.page'
import { ProductPage } from '../../pages/products.page'
import { YourCartPage } from '../../pages/yourCart.page'
import { CommonUtilityForPages } from '../../pages/common.page'
import { YOUR_CART_MESSAGES } from '../../constants/yourCartPage.constants'
import { PRODUCTS, PRODUCT_MESSAGES } from '../../constants/productPage.constants'
import { getUser } from '../../utils/loadUsers'
import { ProductDetails } from '../../types/productTypes'


let lp: LoginPage;
let pp: ProductPage;
let yc: YourCartPage;
let cu: CommonUtilityForPages;

test.describe('yourCartPageTests negative tests', async () => {

    test.beforeAll(async () => {
        //some code
    })

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        lp = new LoginPage(page);
        pp = new ProductPage(page);
        yc = new YourCartPage(page);
    })

});

test.describe('yourCartPageTests positive tests', async () => {

    test.beforeAll(async () => {
        //some code
    })

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        lp = new LoginPage(page);
        pp = new ProductPage(page);
        yc = new YourCartPage(page);
        cu = new CommonUtilityForPages(page);
    })

    test('changes in product list reflected properly in yourcart page @productListUpdation @positive', async ({ page }) => {
        /*test objective
        to login, add multiple products to cart, go to yc page and remove any product, verify if that update is reflected in products page
        */
        //test-data
        const user = getUser('standard');
        const numberOfProducts = 5;
        const selectedProductIndexes: Set<number> = new Set();
        while (selectedProductIndexes.size <= numberOfProducts) {
            selectedProductIndexes.add(Math.floor(Math.random() * PRODUCTS.length))
        }
        const selectedProducts: ProductDetails[] = Array.from(selectedProductIndexes).map(index => ({
            name: PRODUCTS[index].name,
            price: PRODUCTS[index].price,
            description: PRODUCTS[index].desc,
            quantity: '1'
        }))
        //test
        await lp.login(user.username, user.password);
        await expect(await cu.getPageSectionHeading()).toHaveText(PRODUCT_MESSAGES.sectionTitle);
        for (const product of selectedProducts) {
            await pp.addProductToCartByName(product.name)
        }
        await cu.clickCartButton();
        await expect(await cu.getPageSectionHeading()).toHaveText(YOUR_CART_MESSAGES.sectionTitle);

        for (const product of selectedProducts) {
            await yc.verifyItemsInCart(product);
        }
        await yc.removeItemFromCart(selectedProducts[4].name);
        await yc.clickContinueShoppingButton();
        await expect(await cu.getPageSectionHeading()).toHaveText(PRODUCT_MESSAGES.sectionTitle);
        await pp.verifyItemRemovedFromCart(selectedProducts[4].name);


    })

    test('verify items in cart is null, after all items are remvoed in product page @yourCartnullProducts @positive', async ({ page }) => {
        /*test-objective
        login, add 3 products, verify in cart page, go back and remove all products in products page, verify now cart is null
        */
        //test-data
        const user = getUser('standard');
        const numberOfProducts = 4;
        const selectedProductIndexes: Set<number> = new Set();
        while (selectedProductIndexes.size <= numberOfProducts) {
            selectedProductIndexes.add(Math.floor(Math.random() * PRODUCTS.length))
        }
        const selectedProduct: ProductDetails[] = Array.from(selectedProductIndexes).map(index => ({
            name: PRODUCTS[index].name,
            description: PRODUCTS[index].desc,
            quantity: '1',
            price: PRODUCTS[index].price

        }))

        //test
        await lp.login(user.username, user.password);
        await expect(await cu.getPageSectionHeading()).toHaveText(PRODUCT_MESSAGES.sectionTitle);
        for (const product of selectedProduct) {
            await pp.addProductToCartByName(product.name);
        }
        await cu.clickCartButton();
        await expect(await cu.getPageSectionHeading()).toHaveText(YOUR_CART_MESSAGES.sectionTitle);
        for (const product of selectedProduct) {
            await yc.verifyItemsInCart(product)
        }
        await yc.clickContinueShoppingButton();
        await expect(await cu.getPageSectionHeading()).toHaveText(PRODUCT_MESSAGES.sectionTitle);
        for (const product of selectedProduct) {
            await pp.removeAddedItemFromCart(product.name)
        }
        await cu.clickCartButton();
        await yc.verifyNullItemsInCart();

    })

    test('yourCart page product modification @yourCartPageProdMod @positive', async ({ page }) => {

        //test-data
        const user = getUser('standard');
        const numberOfProducts = 2;
        const selectedProductIndexes: Set<number> = new Set();
        while (selectedProductIndexes.size <= numberOfProducts) {
            selectedProductIndexes.add(Math.floor(Math.random() * PRODUCTS.length))
        }
        const selectedProducts: ProductDetails[] = Array.from(selectedProductIndexes).map(index => ({
            name: PRODUCTS[index].name,
            price: PRODUCTS[index].price,
            description: PRODUCTS[index].desc,
            quantity: '1'
        }))
        //test
        await lp.login(user.username, user.password);
        await expect(await cu.getPageSectionHeading()).toHaveText(PRODUCT_MESSAGES.sectionTitle);
        for (const product of selectedProducts) {
            await pp.addProductToCartByName(product.name)
        }
        await cu.clickCartButton();
        await expect(await cu.getPageSectionHeading()).toHaveText(YOUR_CART_MESSAGES.sectionTitle);
        for (const product of selectedProducts) {
            await yc.verifyItemsInCart(product);
        }
        await yc.removeItemFromCart(selectedProducts[1].name);
    })
});
