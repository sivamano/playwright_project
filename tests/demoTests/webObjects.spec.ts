import {test, expect} from '@playwright/test'

 test('Web Objects', async ({page})=>{
 await page.goto('https://saucedemo.com/v1');
 await page.pause();
 await page.locator('id=user-name').fill('user');
 await page.locator('[id="user-name"]').fill('value1');
 await page.locator('#login-button').click();
 await page.locator('//input[@id="password"]').fill('password');
 await page.locator('text=LOGIN').click();

//  https://playwright.dev/docs/api/class-selectors

});