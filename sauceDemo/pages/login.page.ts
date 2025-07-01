import { Page } from '@playwright/test';
import { loginLocator } from '../locators/login.locator';

export class LoginPage {
    
    //constructor(...) {}: This is the special method that runs when you create a new instance of the class.
    constructor(private readonly page: Page) {
        this.page = page;
    }
    async enterUserName(userName: string) {
        await this.page.waitForSelector(loginLocator.userNameInput);
        await this.page.locator(loginLocator.userNameInput).fill(userName);
    }
    async enterPassword(password: string) {
        await this.page.waitForSelector(loginLocator.passwordInput);
        await this.page.locator(loginLocator.passwordInput).fill(password);
    }
    async clickLoginButton() {
        await this.page.locator(loginLocator.loginButton).click();
    }

    async getErrorMessage(): Promise<string> {
        await this.page.waitForSelector(loginLocator.errorMessage, { state: 'visible' });
        return await this.page.locator(loginLocator.errorMessage).innerText();
    }

    async login(userName: string, password: string) {
        await this.enterUserName(userName);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

}
