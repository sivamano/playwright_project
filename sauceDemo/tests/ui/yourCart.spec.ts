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

    test('error user single product @negative ', async () => {
       

    });


});
