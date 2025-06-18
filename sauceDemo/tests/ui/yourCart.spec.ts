import { test } from '../../fixtures/setup'
import { LoginPage } from '../../pages/login.page'
import { ProductPage } from '../../pages/products.page'
import { YourCartPage } from '../../pages/yourCart.page'


let lp: LoginPage;
let pp: ProductPage;
let yc: YourCartPage;

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

    test('error user last name test @negative @errorUserLastNameTest', async () => {
        await lp.login('error_user', 'secret_sauce');
        await pp.addDesiredProductToCart('Sauce Labs Backpack');
        await pp.clickCartButton();
        await yc.verifyCartItems('Sauce Labs Backpack',
            'carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.',
            1,
            '$29.99',
            'Remove');

    });


});
