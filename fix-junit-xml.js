const fs = require('fs');
const xml2js = require('xml2js');

const file = 'results.xml';

fs.readFile(file, (err, data) => {
  if (err) throw err;

  xml2js.parseString(data, (err, result) => {
    if (err) throw err;

    const suites = result.testsuites.testsuite;
    suites.forEach((suite) => {
      suite.testcase.forEach((testcase) => {
        // Extract issue key if in format "TEST-123 - something"
        const match = testcase.$.name.match(/(TEST-\d+)/);
        if (match) {
          testcase.$.name = match[1]; // Keep only the issue key
        }

        // Ensure <system-out> is present (needed by Xray)
        if (!testcase['system-out']) {
          testcase['system-out'] = ['Passed via Playwright'];
        }
      });
    });

    const builder = new xml2js.Builder({ headless: false, renderOpts: { pretty: true } });
    const xml = builder.buildObject(result);
    fs.writeFileSync(file, xml);
    console.log('✅ Fixed results.xml JUnit format (names mapped to Jira issue keys only + system-out)');
  });
});
