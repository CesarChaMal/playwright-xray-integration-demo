import { defineConfig, devices } from '@playwright/test';
import ENV from './app-commons/environments/env';

const isCI = !!process.env.CI;

export default defineConfig({
  globalSetup: './global-setup.ts',
  testDir: './tests',
  testMatch: ['**/*.spec.ts'],
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [
    ['list'],
    ['junit', { outputFile: 'results.xml' }]
  ],

  use: {
    baseURL: `${ENV.BASE_URL || 'http://localhost:3000'}`,
    headless: true,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    trace: 'off',
    launchOptions: {
      slowMo: 1000,
      args: ENV.PROXY_HOST && ENV.PROXY_HOST !== 'http://dummy-proxy-url.com:8080' 
        ? ['--start-maximized'] 
        : [],
    },
    viewport: {
      width: 1600,
      height: 1000,
    },
    proxy: ENV.PROXY_HOST && ENV.PROXY_HOST !== 'http://dummy-proxy-url.com:8080' 
      ? { server: ENV.PROXY_HOST } 
      : undefined,
    video: {
      mode: 'off',
      size: { width: 1600, height: 1000 },
    },
    timeout: 60000,
    actionTimeout: 60000,
    navigationTimeout: 60000,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } }
  ],
});