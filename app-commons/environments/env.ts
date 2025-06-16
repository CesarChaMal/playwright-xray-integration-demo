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
};

export default ENV;
