const fs = require('fs');
const xml2js = require('xml2js');

const file = 'results.xml';

fs.readFile(file, (err, data) => {
  if (err) throw err;

  xml2js.parseString(data, (err, result) => {
    if (err) throw err;

    // Normalize to always wrap in <testsuites>
    let suites = [];

    if (result.testsuites?.testsuite) {
      suites = result.testsuites.testsuite;
    } else if (result.testsuite) {
      suites = [result.testsuite];
    } else {
      console.error('❌ No <testsuite> or <testsuites> found');
      return;
    }

    suites.forEach((suite) => {
      if (!suite.testcase) return;

      suite.testcase.forEach((testcase) => {
        let originalName = testcase.$.name;
        const match = originalName.match(/(TEST-\d+)/i);

        if (match) {
          // Keep only the Jira issue key as name
          testcase.$.name = match[1].toUpperCase();
        } else {
          console.warn(`⚠️ No Jira issue key found in: "${originalName}"`);
        }

        if (!testcase['system-out']) {
          testcase['system-out'] = ['Passed via Playwright'];
        }
      });
    });

    const builder = new xml2js.Builder({
      headless: false,
      rootName: 'testsuites',
      renderOpts: { pretty: true },
    });

    const xml = builder.buildObject({ testsuite: suites });
    fs.writeFileSync(file, xml);
    console.log('✅ Fixed results.xml for Xray: test names reduced to issue keys and wrapped in <testsuites>');
  });
});
