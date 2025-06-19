import { test } from '../../fixtures/setup'
import { LoginPage } from '../../pages/login.page'
import { ProductPage } from '../../pages/products.page'
import { YourCartPage } from '../../pages/yourCart.page'
import { YourInformationPage } from '../../pages/yourInformation.page'

let lp: LoginPage;
let pp: ProductPage;
let yc: YourCartPage;
let yi: YourInformationPage;

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
    })

    test('error user lastName test @negative @errorUserLastNameTest', async () => {
        await lp.login('error_user', 'secret_sauce');
        await pp.addDesiredProductToCart('Sauce Labs Onesie');
        await pp.clickCartButton();
        await yc.verifyCartItems('Sauce Labs Onesie',
            'Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.',
            1,
            '$7.99',
            'Remove'
        );
        await yc.clickCheckOutButton();
        await yi.enterUserInformation('error', 'notvisible', 'ZIP001');
        test.fail();
    });

});