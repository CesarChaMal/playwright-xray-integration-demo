import dotenv from 'dotenv';
import path from 'path';

const envFile = `.env.${process.env.TEST_ENV || 'dev'}`;
const envPath = path.resolve(__dirname, envFile);

dotenv.config({ path: envPath });
console.log(`✅ Loaded environment from ${envPath}`);

const ENV = {
  BASE_URL: process.env.BASE_URL || '',
  BROWSER_NAME: process.env.BROWSER_NAME || 'chromium',
  USER_NAME: process.env.USER_NAME || '',
  PASSWORD: process.env.PASSWORD || '',
  PROXY_HOST: process.env.PROXY_HOST || '',

  // Optional Xray vars (use only if needed in tests)
  XRAY_MODE: process.env.XRAY_MODE || '',
  XRAY_CLOUD_AUTH_URL: process.env.XRAY_CLOUD_AUTH_URL || 'https://xray.cloud.getxray.app/api/v2/authenticate',
  XRAY_CLOUD_API_BASE: process.env.XRAY_CLOUD_API_BASE || 'https://xray.cloud.getxray.app/api/v2',
  XRAY_CLIENT_ID: process.env.XRAY_CLIENT_ID || '',
  XRAY_CLIENT_SECRET: process.env.XRAY_CLIENT_SECRET || '',
  XRAY_USERNAME: process.env.XRAY_USERNAME || '',
  XRAY_PASSWORD: process.env.XRAY_PASSWORD || '',
  XRAY_JIRA_BASE_URL: process.env.XRAY_JIRA_BASE_URL || '',
  XRAY_PROJECT_KEY: process.env.XRAY_PROJECT_KEY || '',
};

export default ENV;
