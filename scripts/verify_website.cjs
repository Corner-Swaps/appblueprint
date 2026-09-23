const puppeteer = require('puppeteer-core');
const path = require('path');

async function run() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.goto('http://localhost:4174/', { waitUntil: 'networkidle0' });

  // Scroll to explorer
  await page.evaluate(() => {
    document.querySelector('#explorer')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/verify_explorer_section.png') });
  console.log('Saved verify_explorer_section.png');

  // Scroll to calculator
  await page.evaluate(() => {
    document.querySelector('#calculator')?.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/verify_calculator_section.png') });
  console.log('Saved verify_calculator_section.png');

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
