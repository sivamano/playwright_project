import { test, expect } from '../../fixtures/setup';
import { LoginPage } from '../../pages/login.page';

let lp: LoginPage
test.describe('Login with available credentials', async () => {

    test.beforeAll(async () => {

    })

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        lp = new LoginPage(page);
    })

    test.afterEach(async ({ page }) => {
        //page.close();
    })

    test('@loginSimple simple standard user login', async ({ page }) => {
        await lp.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });

    test('@loginLockedOut simple lockedOut user login @negative @lockedOutUserTest', async ({ page }) => {
        //lp = new LoginPage(page);
        await lp.login('locked_out_user', 'secret_sauce');
        const errorMsg = await lp.getErrorMessage();
        expect(errorMsg).toEqual('Epic sadface: Sorry, this user has been locked out.');
    });

    test('@login simple problem user login', async ({ page }) => {

        await lp.login('problem_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })

    test('@loginPerfGlitch simple performance glitch user login', async ({ page }) => {
        test.fail();
        await lp.login('performance_glitch_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    })

    test.skip('@login simple error user login', async ({ page }) => {
        await lp.login('error_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })

    test('@login simple visual user login', async ({ page }) => {
        await lp.login('visual_user', 'secret_sauce');
        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    })


});

test.describe('Login Negative Test Cases', async () => {
    test.beforeAll(async () => {

    })

    test.beforeEach(async ({ page }) => {
        lp = new LoginPage(page);
        await page.goto('/');
    })

    test('incorrect userName @negative @wrongUserNameTest', async ({ page }) => {
        await lp.login('wrongusername', 'secret_sauce');
        let errorMessage = await lp.getErrorMessage();
        expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service')
    })

    test(' incorrect password @negative @wrongPasswordTest', async ({ page }) => {
        await lp.login('standard_user', 'wrong_password');
        let errorMessage = await lp.getErrorMessage();
        expect(errorMessage).toBe('Epic sadface: Username and password do not match any user in this service')
    })



})