import{chromium, expect, test} from '@playwright/test'

 test('slowmo and videoR local config', async ()=>{

//config for slowmo and video record
 const browser = await chromium.launch(
 {
  slowMo: 500,
 headless: false
 }
);
 const context = await browser.newContext({
 recordVideo: {
 dir: 'videos/',
 size:{width:800, height:500}
 }
});
 const page = await context.newPage();

//actual test
await page.goto('https://admin-demo.nopcommerce.com/login?ReturnUrl=%2Fadmin%2F');
 await page.locator('id=Email').fill('admin@yourstore.com');
 await page.locator('#Password').fill('admin');
 await page.locator('text=Log in').click();
 await page.waitForURL('https://admin-demo.nopcommerce.com/admin/');

// context close
 await context.close();
});