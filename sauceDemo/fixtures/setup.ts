// import { chromium } from '@playwright/test'
// import { GlobalSetupInfo } from '@playwright/test';

// async function globalSetup(config: GlobalSetupInfo) {

//   const browser = await chromium.launch({headless: false});
//   const context = await browser.newContext();
//   const page = await context.newPage();
// }

// export default globalSetup;


import { test as base, expect, chromium, Browser, BrowserContext, Page } from '@playwright/test';

type MyFixtures = {
  browser: Browser;
  context: BrowserContext;
  page: Page;
};

export const test = base.extend<MyFixtures>({
  browser: async ({}, use) => {
    const browser = await chromium.launch({headless: true});
    await use(browser);
    await browser.close();
  },
  context: async ({ browser }, use) => {
    const context = await browser.newContext({
      viewport: {width: 1920, height: 1080}
    });
    await use(context);
    await context.close();
  },
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },
});

export { expect };