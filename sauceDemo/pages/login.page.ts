import { Page } from '@playwright/test';
import { LoginLocator } from '../locators/login.locator';

export class LoginPage {
    
    //constructor(...) {}: This is the special method that runs when you create a new instance of the class.
    constructor(private readonly page: Page) {
        this.page = page;
    }
    async enterUserName(userName: string) {
        await this.page.waitForSelector(LoginLocator.userNameInput);
        await this.page.locator(LoginLocator.userNameInput).fill(userName);
    }
    async enterPassword(password: string) {
        await this.page.waitForSelector(LoginLocator.passwordInput);
        await this.page.locator(LoginLocator.passwordInput).fill(password);
    }
    async clickLoginButton() {
        await this.page.locator(LoginLocator.loginButton).click();
    }

    async getErrorMessage(): Promise<string> {
        await this.page.waitForSelector(LoginLocator.errorMessage, { state: 'visible' });
        return await this.page.locator(LoginLocator.errorMessage).innerText();
    }

    async login(userName: string, password: string) {
        await this.enterUserName(userName);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

}
