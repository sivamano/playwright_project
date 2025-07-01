import { test, expect } from '../../fixtures/setup';
import { LoginPage } from '../../pages/login.page';
import {getUser} from '../../utils/loadUsers'
import {URI} from '../../utils/resources'
import {LOGIN_MESSAGES} from '../../constants/login.constants'

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
        const user = getUser('standard')
        await lp.login(user.username, user.password);
        await expect(page).toHaveURL(URI.inventory);
    });

    test('@loginLockedOut simple lockedOut user login @negative @lockedOutUserTest', async ({ page }) => {
        const user = getUser('lockedOut')
        await lp.login(user.username, user.password);
        const errorMsg = await lp.getErrorMessage();
        expect(errorMsg).toEqual(LOGIN_MESSAGES.lockedOutError);
    });

    test('@login simple problem user login', async ({ page }) => {
        const user = getUser('problem')
        await lp.login(user.username, user.password);
        await expect(page).toHaveURL(URI.inventory);
    })

    test('@loginPerfGlitch simple performance glitch user login', async ({ page }) => {
        const user = getUser('perfGlitch')
        await lp.login(user.username, user.password);
        await expect(page).toHaveURL(URI.inventory);

    })

    test.skip('@login simple error user login', async ({ page }) => {
        const user = getUser('error')
        await lp.login(user.username, user.password);
        await expect(page).toHaveURL(URI.inventory);
    })

    test('@login simple visual user login', async ({ page }) => {
        const user = getUser('visual')
        await lp.login(user.username, user.password);
        await expect(page).toHaveURL(URI.inventory);
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
        const user = getUser('standard')
        await lp.login('wrongusername', user.password);
        let errorMessage = await lp.getErrorMessage();
        expect(errorMessage).toBe(LOGIN_MESSAGES.userNamePwdNoMatch)
    })

    test(' incorrect password @negative @wrongPasswordTest', async ({ page }) => {
         const user = getUser('standard')
        await lp.login(user.username, 'wrong_password');
        let errorMessage = await lp.getErrorMessage();
        expect(errorMessage).toBe(LOGIN_MESSAGES.userNamePwdNoMatch)
    })



})