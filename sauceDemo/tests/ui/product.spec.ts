import { test, expect } from '../../fixtures/setup';
import { LoginPage } from '../../pages/login.page';
import { ProductPage } from '../../pages/products.page';

let lp: LoginPage;
let pp: ProductPage;

test.describe('products page negative tests', async () => {
    test.beforeAll(async () => {
        //some code
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        lp = new LoginPage(page)
        pp = new ProductPage(page)
    });

    test('error user tries to remove product from cart in products page @negative @errorUserProductTest', async () => {
        await lp.login('error_user', 'secret_sauce');
        await pp.addDesiredProductToCart('Sauce Labs Backpack');
        await pp.removeAddedItemFromCart('Sauce Labs Backpack');
        test.fail();
    });

    test('error user tries to add problem product @negative @errorUserProblemProduct', async () => {
        await lp.login('error_user', 'secret_sauce');
        await pp.addDesiredProductToCart('Sauce Labs Bolt T-Shirt');
        test.fail();
    })
});