 import{test,expect} from '@playwright/test'

 test('assertions demo test', async ({page})=>{
 await page.goto('https://kitchen.applitools.com/');
 await page.pause();
  // url
 await expect(page).toHaveURL('https://kitchen.applitools.com/');
 //title
 await expect(page).toHaveTitle(/.*Kitchen/);
 //screenshot
 await expect(page).toHaveScreenshot();
//assert presence of element
 await expect(page.locator('text=The Kitchen')).toHaveCount(1);
//assert visible/hidden + soft assertion
 await expect(page.locator('text=The Kitchen')).toBeVisible();
 await expect.soft(page.locator('text=The Kitchen')).toBeHidden();
//assert enable/disable
 await expect(page.locator('text=The Kitchen')).toBeEnabled();
 await expect.soft(page.locator('text=The Kitchen')).toBeDisabled();
// Text match
 await expect(page.locator('text=The Kitchen')).toHaveValue('The Kitchen');
 await expect.soft(page.locator('text=The Kitchen')).toHaveValue('sdfdf');
//element attribute
 await expect(page.locator('text=The Kitchen')).toHaveAttribute('class','/*css-1ws335m');
 await expect(page.locator('text=The Kitchen')).toHaveClass('/*css-1ws335m');

});