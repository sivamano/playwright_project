import { test, expect } from '../../fixtures/setup';
import { LoginPage } from '../../pages/login.page';
import {Page} from '@playwright/test'
import { ProductPage } from '../../pages/products.page';
import { CommonUtilityForPages } from '../../pages/common.page'


let lp: LoginPage;
let pp: ProductPage;
let cup: CommonUtilityForPages;

test.describe('products page negative tests', async () => {
    test.beforeAll(async () => {
        //some code
    });

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        lp = new LoginPage(page)
        pp = new ProductPage(page)
        cup = new CommonUtilityForPages(page)
    });

    test('error user tries to remove product from cart in products page @negative @errorUserProductTest', async () => {
        test.fail();
        await lp.login('error_user', 'secret_sauce');
        await pp.addDesiredProductToCart('Sauce Labs Backpack');
        await pp.removeAddedItemFromCart('Sauce Labs Backpack');
        
    });

    test('error user tries to add problem product @negative @errorUserProblemProduct', async () => {
        test.fail();
        await lp.login('error_user', 'secret_sauce');
        await pp.addDesiredProductToCart('Sauce Labs Bolt T-Shirt');
        
    })

    test('error user tries to sort @negative @errorUserSortMechanism', async ()=>{  
        test.fail();   
        await lp.login('error_user','secret_sauce');
        await pp.sortBy('za');
        await pp.verifySort('za')
    })

    test('test problem user wrong product image @problemUserWrongProductImage',async({page})=>{
        await lp.login('problem_user','secret_sauce');
        //await page.waitForTimeout(3000);
        //await expect(page).toHaveScreenshot();
        await expect(page).toHaveScreenshot('products_negative_tests.png',{timeout: 3000});
    
      
    })
});

