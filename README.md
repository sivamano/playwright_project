# Sivaraman Manoharan - Playwright SauceDemo Test Automation

This project has been created to showcase my skills in Playwright test automation using Typescript
It project contains automated UI tests for [SauceDemo](https://www.saucedemo.com/) using [Playwright](https://playwright.dev/) and TypeScript.
It follows the Page Object Model (POM) pattern and uses Playwright's custom fixtures for browser management.

---

## 📁 Project Structure

```
sauceDemo/
  fixtures/
    setup.ts           # Custom Playwright test fixtures (browser, context, page)
  pages/
    login.page.ts      # Page object for login page
    products.page.ts   # Page object for products page
  tests/
    ui/
      login.spec.ts    # UI test specs for login scenarios
      ...              # (Add more test files here)
  locators/
    ...                # Locator constants (if any)
playwright.config.ts   # Playwright configuration
```

---

## 🚀 Getting Started

### 1. **Install Dependencies**

```sh
npm install
```

### 2. **Run All Tests**

```sh
npx playwright test
```

### 3. **Run a Specific Test File**

```sh
npx playwright test sauceDemo/tests/ui/login.spec.ts
```

### 4. **View HTML Test Report**

```sh
npx playwright show-report
```

---

## 🧩 Key Features

- **TypeScript** for type safety and modern syntax.
- **Page Object Model** for maintainable and reusable test code.
- **Custom Fixtures** for consistent browser/context/page management.
- **Playwright Test Runner** for parallel execution, retries, and rich reporting.

---

## 📝 Writing Tests

- Import the custom `test` and `expect` from `sauceDemo/fixtures/setup.ts` in your spec files:
  ```typescript
  import { test, expect } from '../../fixtures/setup';
  import { LoginPage } from '../../pages/login.page';
  ```

- Use page objects for actions:
  ```typescript
  let lp: LoginPage;
  test.beforeEach(async ({ page }) => {
    lp = new LoginPage(page);
    await page.goto('/');
  });

  test('login with standard user', async ({ page }) => {
    await lp.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });
  ```

---

## ⚙️ Configuration

- **Base URL** and other settings are managed in `playwright.config.ts`.
- Tests use the custom fixtures for browser lifecycle management.
- Test tags (like `@negative`, `@login`) can be used for filtering.

---

## 🛠️ Troubleshooting

- **Selectors not found:**  
  Ensure locators in your page objects match the actual HTML.
- **Empty arrays from `.allTextContents()`:**  
  Wait for elements to appear before querying.
- **"Target page, context or browser has been closed":**  
  Do not close `page`, `context`, or `browser` manually in your tests or page objects; let fixtures handle cleanup.
- **Debugger messages:**  
  Run tests from the terminal, not from the VS Code debugger, unless debugging.

---

## 📚 Resources

- [Playwright Docs](https://playwright.dev/docs/intro)
- [SauceDemo Test Site](https://www.saucedemo.com/)

---

## 📝 License

This project is for educational and demonstration purposes.
