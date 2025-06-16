import { test, expect } from '@playwright/test';
import ENV from '../app-commons/environments/env';

test('Navigate to BASE_URL and verify title', async ({ page }) => {
  if (!ENV.BASE_URL) {
    throw new Error('BASE_URL is not defined in the environment variables.');
  }

  console.log(`Using proxy: ${ENV.PROXY_HOST || 'No proxy configured'}`);
  console.log(`Navigating to: ${ENV.BASE_URL}`);

  // Navigate to the BASE_URL
  await page.goto(ENV.BASE_URL);

  // Verify the page title
  const title = await page.title();
  console.log(`Page title: ${title}`);
  expect(title).toContain('Google'); // Adjust based on the expected title
});