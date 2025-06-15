import { test, expect, devices } from '@playwright/test';

test.use({
  ...devices['iPhone 12 Pro'],
});

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="password"]').click();
  await page.getByTestId('submit-button btn_action').click();
});