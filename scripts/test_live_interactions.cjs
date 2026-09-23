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

  page.on('console', msg => {
    if (msg.type() === 'error') console.log('Live Console Error:', msg.text());
  });

  console.log('1. Loading live GitHub Pages...');
  await page.goto('https://corner-swaps.github.io/appblueprint/?v=' + Date.now(), { waitUntil: 'networkidle0' });

  console.log('Title:', await page.title());

  // Capture full landing page screenshots
  await page.screenshot({ path: path.join(__dirname, '../screenshots/live_top.png') });

  // Scroll to explorer
  await page.evaluate(() => {
    const el = document.getElementById('explorer');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/live_explorer.png') });
  console.log('Scrolled to Explorer');

  // Scroll to calculator
  await page.evaluate(() => {
    const el = document.getElementById('calculator');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/live_calculator.png') });
  console.log('Scrolled to Calculator');

  // Scroll to traps
  await page.evaluate(() => {
    const el = document.getElementById('why-apps-fail') || document.getElementById('traps');
    if (el) el.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/live_traps.png') });
  console.log('Scrolled to Traps');

  // Test clicking "Launch Interactive Blueprint"
  console.log('2. Clicking "Launch Interactive Blueprint"...');
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 300));
  
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Launch Interactive Blueprint'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1000));

  console.log('Current URL after launch click:', page.url());
  await page.screenshot({ path: path.join(__dirname, '../screenshots/live_app_mode.png') });

  // Verify sticky "Back to Website" bar is present
  const hasBackBar = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).some(b => b.innerText.includes('Back to Website'));
  });
  console.log('Back to Website button present in #app mode?', hasBackBar);

  if (hasBackBar) {
    console.log('3. Clicking "Back to Website"...');
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Back to Website'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1000));
    console.log('Current URL after back click:', page.url());
    await page.screenshot({ path: path.join(__dirname, '../screenshots/live_back_to_website.png') });
  }

  // Test mobile view
  console.log('4. Testing Mobile View (390x844)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('https://corner-swaps.github.io/appblueprint/?v=' + Date.now(), { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(__dirname, '../screenshots/live_mobile_hero.png') });

  await browser.close();
  console.log('All tests completed successfully!');
}

testLive().catch(err => {
  console.error(err);
  process.exit(1);
});
