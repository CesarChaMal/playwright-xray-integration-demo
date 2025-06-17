import { test, expect } from '@playwright/test';
import ENV from '../app-commons/environments/env';

test('TEST-2 - Navigate to BASE_URL and verify title', async ({ page }) => {
  if (!ENV.BASE_URL) {
    throw new Error('BASE_URL is not defined in the environment variables.');
  }

  await page.goto(ENV.BASE_URL);
  const title = await page.title();
  expect(title).toContain('Google');
});
