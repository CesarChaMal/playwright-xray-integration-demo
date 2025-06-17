const fs = require('fs');

const filePath = 'results.xml';
let content = fs.readFileSync(filePath, 'utf-8');

if (!content.startsWith('<?xml')) {
  content = `<?xml version="1.0" encoding="UTF-8"?>\n${content}`;
}

if (!content.trim().endsWith('</testsuites>')) {
  content += '\n</testsuites>';
}

fs.writeFileSync(filePath, content);
console.log('✅ Fixed results.xml JUnit format');
