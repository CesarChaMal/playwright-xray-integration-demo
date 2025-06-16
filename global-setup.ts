import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('Global setup executed');
  // Add any setup logic here, such as initializing environment variables or databases
}

export default globalSetup;