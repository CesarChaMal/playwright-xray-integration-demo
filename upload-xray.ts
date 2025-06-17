import fs from 'fs';
import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config({ path: './app-commons/environments/.env.local' });

const filePath = 'results.xml';
const projectKey = process.env.XRAY_PROJECT_KEY || '';
const mode = process.env.XRAY_MODE || 'cloud';

const authUrl = process.env.XRAY_CLOUD_AUTH_URL || 'https://eu.xray.cloud.getxray.app/api/v2/authenticate';
const apiBase = process.env.XRAY_CLOUD_API_BASE || 'https://eu.xray.cloud.getxray.app/api/v2';

if (!fs.existsSync(filePath)) {
  console.error(`❌ Missing ${filePath}. Run the tests first.`);
  process.exit(1);
}

// === CLOUD: Use raw XML as body ===
const uploadToXrayCloud = async () => {
  const clientId = process.env.XRAY_CLIENT_ID;
  const clientSecret = process.env.XRAY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('❌ XRAY_CLIENT_ID and XRAY_CLIENT_SECRET must be set in .env.local');
  }

  // 1. Get bearer token
  const tokenRes = await axios.post(authUrl, {
    client_id: clientId,
    client_secret: clientSecret,
  }, {
    headers: { 'Content-Type': 'application/json' }
  });

  const token = tokenRes.data;

  // 2. Read XML as string
  const xml = fs.readFileSync(filePath, 'utf8');

  // 3. Post JUnit result to Xray Cloud as RAW XML
  const res = await axios.post(
    `${apiBase}/import/execution/junit?projectKey=${projectKey}`,
    xml,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/xml',
      },
      maxBodyLength: Infinity,
    }
  );

  console.log('✅ Uploaded to Xray Cloud:', res.data);
};

// === SERVER: Use multipart/form-data ===
const uploadToXrayServer = async () => {
  const baseUrl = process.env.XRAY_JIRA_BASE_URL;
  const username = process.env.XRAY_USERNAME;
  const password = process.env.XRAY_PASSWORD;

  if (!username || !password) {
    throw new Error('❌ XRAY_USERNAME and XRAY_PASSWORD must be set in .env.local for server mode');
  }

  const form = new FormData();
  form.append('file', fs.createReadStream(filePath), {
    filename: 'results.xml',
    contentType: 'application/xml',
  });

  const res = await axios.post(
    `${baseUrl}/rest/raven/1.0/import/execution/junit?projectKey=${projectKey}`,
    form,
    {
      auth: { username, password },
      headers: form.getHeaders(),
      maxBodyLength: Infinity,
    }
  );

  console.log('✅ Uploaded to Xray Server:', res.data);
};

(async () => {
  try {
    if (mode === 'cloud') {
      await uploadToXrayCloud();
    } else if (mode === 'server') {
      await uploadToXrayServer();
    } else {
      throw new Error(`Unknown XRAY_MODE: ${mode}`);
    }
  } catch (err: any) {
    console.error('❌ Upload failed:', err.response?.data || err.message);
  }
})();
