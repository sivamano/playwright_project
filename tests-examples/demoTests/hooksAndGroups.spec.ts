import { test, expect, Page } from '@playwright/test'

test.describe('standard user', () => {

  test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/v1/');
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/');
    await page.locator('#user-name').fill('standard_user');
    await page.locator('//input[@placeholder="Password"]').fill('secret_sauce')
    await page.locator('[id="login-button"]').click();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });

  test('order a product', async ({ page }) => {
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/inventory.html');
    await addToCartAndVerify(page, 'Sauce Labs Backpack');
    // click cart icon
    await page.locator('[data-icon="shopping-cart"]').click();
    // proceed to checkout
    await page.locator('.btn_action.checkout_button').click();
    // enter your information
    await page.locator('#first-name').fill('John');
    await page.locator('#last-name').fill('Sekar');
    await page.locator('#postal-code').fill('607894');
    await page.locator('[type="submit"]').click();

    //click finish
    await page.locator('.btn_action.cart_button').click();
    // verify completion URL
    await expect(page).toHaveURL('https://www.saucedemo.com/v1/checkout-complete.html');
  });

});


//old add to card and verify function

// async function addToCartAndVerify(page:Page, productName: string ) {
//   // click ADD TO CART button for the specific product
//  await page.locator('.inventory_item')
// .filter({ has: page.locator('.inventory_item_name', { hasText: productName}) })
// .locator('.btn_primary.btn_inventory', {hasText: "ADD TO CART"})
// .click();
// // verify that the button text changes to 'REMOVE'

//  await expect (
//   page.locator('.inventory_item')
// .filter({ has: page.locator( '.inventory_item_name' , { hasText: productName }) })
// .locator('.btn_primary.btn_inventory')
// ).toHaveText('REMOVE');
// }

//dummy
 test.beforeEach(async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });
test('dummy test', async ({ page }) => {
  await expect(page).toHaveURL('https://www.saucedemo.com/');


});

//new add to cart and verify function
async function addToCartAndVerify(page: Page, productName: string) {
  const productItem = page.locator('.inventory_item').filter({ has: page.locator('.inventory_item_name', { hasText: productName }) });
  const actionButton = productItem.locator('.btn_inventory');
  //click ADD TO CART
  await actionButton.getByText('ADD TO CART').click();
  // check if button name changed to 'REMOVE'
  await expect(actionButton).toHaveText('REMOVE');
}