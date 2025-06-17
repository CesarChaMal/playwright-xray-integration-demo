import { test, expect } from '@playwright/test';
import ENV from '../app-commons/environments/env';

test.describe('Base URL Health Check', () => {
  test('TEST-2 - should load the base URL and verify title contains "Google"', async ({ page }) => {
    const baseUrl = ENV.BASE_URL;

    test.skip(!baseUrl, 'BASE_URL is not defined in the environment variables');

    await page.goto(baseUrl!);
    const title = await page.title();
    expect(title).toContain('Google');
  });
});
