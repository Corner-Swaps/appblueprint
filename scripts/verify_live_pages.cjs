const puppeteer = require('puppeteer-core');
const path = require('path');

async function testLive() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to live GitHub Pages...');
  await page.goto('https://corner-swaps.github.io/appblueprint/?v=' + Date.now(), { waitUntil: 'networkidle0' });

  await page.screenshot({ path: path.join(__dirname, '../screenshots/verify_live_github_pages.png') });
  console.log('Saved verify_live_github_pages.png');

  // Check title and hero text
  const title = await page.title();
  const heroText = await page.evaluate(() => document.querySelector('h1')?.innerText);
  console.log('Live Title:', title);
  console.log('Live H1:', heroText);

  // Check for any console errors
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('Live Error:', msg.text());
  });

  await browser.close();
}

testLive().catch(err => {
  console.error(err);
  process.exit(1);
});
