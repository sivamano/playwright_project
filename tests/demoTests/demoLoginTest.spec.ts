 import{test,expect} from '@playwright/test'
 
 test('orange hrm demo login', async ({page})=>{
 await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
 await page.pause();
 await page.waitForSelector('[name="username"]');
 await page.locator('[name="username"]').fill('Admin');
 await page.locator('[name="password"]').fill('admin123');
 await page.locator('[type="submit"]').click();
 await page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
});

 test('nopcommerce demo login', async ({page})=>{
 await page.goto('https://admin-demo.nopcommerce.com/login?ReturnUrl=%2Fadmin%2F');
 await page.locator('id=Email').fill('admin@yourstore.com');
 await page.locator('#Password').fill('admin');
 await page.locator('text=Log in').click();
 await page.waitForURL('https://admin-demo.nopcommerce.com/admin/');
});