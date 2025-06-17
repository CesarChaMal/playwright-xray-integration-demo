# Playwright Multi-Environment Test Project with Xray Integration

This is a Playwright-based end-to-end testing project designed with support for multiple environments using `.env` configuration files.
It also supports direct integration with [Xray Test Management for Jira](https://www.getxray.app/) — for both **Jira Cloud** and **Jira Server**.

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
├── upload-xray.ts             # Xray Cloud/Server upload integration
├── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Environment Setup

Install dependencies:

```bash
npm install
```

Install Playwright browsers and system dependencies:

```bash
npx playwright install-deps
npx playwright install
```

---

## 🌍 Environment Files

Environment variables are stored in `.env.{env}` files inside `app-commons/environments/`.

Sample fields:

```env
BASE_URL=https://example.com
BROWSER_NAME=chromium
USER_NAME=test-user
PASSWORD=secret
PROXY_HOST=
```

Also add Xray config in `.env.local` depending on your platform:

### For Xray Cloud:

```env
XRAY_MODE=cloud
XRAY_CLIENT_ID=your-client-id
XRAY_CLIENT_SECRET=your-client-secret
XRAY_PROJECT_KEY=TEST
XRAY_CLOUD_AUTH_URL=https://xray.cloud.getxray.app/api/v2/authenticate
XRAY_CLOUD_API_BASE=https://xray.cloud.getxray.app/api/v2
```

### For Xray Server:

```env
XRAY_MODE=server
XRAY_USERNAME=your-username
XRAY_PASSWORD=your-password
XRAY_JIRA_BASE_URL=http://localhost:9094
XRAY_PROJECT_KEY=TEST
```

---

## 🧪 Writing Tests

Reference environment variables like this:

```ts
import ENV from '../app-commons/environments/env';

test('TEST-1 - Navigate to BASE_URL and verify title', async ({ page }) => {
  await page.goto(ENV.BASE_URL);
});
```

> ℹ️ Including the test key (e.g., `TEST-1`) in the test title allows Xray to match the test automatically.

---

## 🧾 Running Tests

```bash
# Run using dev environment
npm run test:dev

# Run using test environment
npm run test:test

# Run using local environment
npm run test:local
```

---

## ☁️ Uploading Results to Xray (Cloud or Server)

Generate and upload test results to Xray via:

```bash
npm run test:local:xray
```

This does:

1. Run tests with Playwright
2. Generate `results.xml` (JUnit format)
3. Upload it to Xray via REST API using `upload-xray.ts`

### 🔁 Full Local Test + Xray Flow:

```bash
npx playwright install-deps
npx playwright install
npm run test:local:xray
```

Expected output:

```bash
✅ 3 tests passed (5.4s)
✅ Authenticated to Xray Cloud
✅ Upload successful: { testExecIssue: "TEST-12", ... }
```

---

## 🧾 Reporters & Debugging

Playwright is configured with:

* `list` reporter (for console output)
* `junit` reporter (for Xray integration)

To run with debugging:

```bash
npx playwright test --debug
```

---

## 📦 Key Dependencies

* `@playwright/test`
* `cross-env`
* `dotenv`
* `axios`
* `form-data`
* `ts-node`
* `typescript`

---

Happy Testing 🎭 + Seamless Reporting 📊
