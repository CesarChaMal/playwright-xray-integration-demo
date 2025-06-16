# Playwright Multi-Environment Test Project

This is a Playwright-based end-to-end testing project designed with support for multiple environments using `.env` configuration files.

---

## 📁 Project Structure

```
playwright-env-demo/
├── app-commons/
│   └── environments/
│       ├── .env.dev
│       ├── .env.test
│       ├── .env.local         # (ignored in git)
│       └── env.ts             # loads the correct .env file dynamically
├── tests/
│   └── example.spec.ts        # Sample test
├── playwright.config.ts       # Main Playwright configuration
├── package.json               # NPM scripts and dependencies
├── .gitignore
└── README.md
```

---

## ⚙️ Environment Setup

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Set your desired environment by running:

```bash
# Run using dev environment
npm run test:dev

# Run using test environment
npm run test:test

# Run using local environment (includes auth/proxy config)
npm run test:local
```

---

## 🌍 .env Files

Environment variables are managed using `.env.{env}` files in `app-commons/environments/`. Example fields include:

```env
BASE_URL=
BROWSER_NAME=
USER_NAME=
PASSWORD=
PROXY_HOST=
```

---

## 🧪 Writing Tests

Use `ENV` variables like this:

```ts
import ENV from '../app-commons/environments/env';

test('My Test', async ({ page }) => {
  await page.goto(ENV.BASE_URL);
});
```

---

## 🧾 Running Tests

To run tests with Playwright, use the following commands:

```bash
# Run all tests
npx playwright test

# Run tests in a specific file
npx playwright test tests/example.spec.ts

# Run tests with debugging enabled
npx playwright test --debug
```

---

## 🧾 Reporters & Debugging

Console logs appear when using the `list` reporter. HTML reports are generated on each run.

---

## 🔒 Notes

- `.env.local` is ignored by Git to prevent committing sensitive credentials.
- Customize proxy, auth, browser, and URL per environment easily.

---

## 📦 Dependencies

- `@playwright/test`
- `dotenv`
- `cross-env`

---

Happy Testing 🎭