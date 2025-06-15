import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await expect(page.locator('#logout_sidebar_link')).toBeVisible();
  await page.locator('#logout_sidebar_link').click();
  await expect(page).toHaveURL('https://www.saucedemo.com/v1/');
});