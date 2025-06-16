// upload-xray.ts
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config({ path: './app-commons/environments/.env.local' }); // adjust as needed

async function uploadToXray() {
  const filePath = 'results.xml';

  if (!fs.existsSync(filePath)) {
    console.error('❌ results.xml not found. Run tests first.');
    process.exit(1);
  }

  const form = new FormData();
  form.append('file', fs.createReadStream(filePath));

  try {
    const response = await axios.post(
      'https://xray.cloud.getxray.app/api/v2/import/execution/junit?projectKey=' + process.env.XRAY_PROJECT_KEY,
      form,
      {
        headers: {
          'Authorization': `Bearer ${process.env.XRAY_API_KEY}`,
          ...form.getHeaders(),
        },
      }
    );

    console.log('✅ Xray upload successful:', response.data);
  } catch (error: any) {
    console.error('❌ Xray upload failed:', error.response?.data || error.message);
  }
}

uploadToXray();
