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

  // 1. Visit App Mode
  await page.goto('http://localhost:4173/#app', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // Click "Agree & Continue" if present
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Agree & Continue')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/verify_app_active_feed.png') });
  console.log('Saved verify_app_active_feed.png');

  // Click "Back to Website"
  for (const btn of await page.$$('button')) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Back to Website')) {
      await btn.click();
      break;
    }
  }
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/verify_returned_to_website.png') });
  console.log('Saved verify_returned_to_website.png');

  await browser.close();
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
