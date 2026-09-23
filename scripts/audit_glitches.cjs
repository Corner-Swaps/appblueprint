const puppeteer = require('puppeteer-core');
const path = require('path');

async function audit() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  const issues = [];
  const networkFailures = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      issues.push(`Console Error: ${msg.text()}`);
    } else if (msg.type() === 'warning') {
      issues.push(`Console Warning: ${msg.text()}`);
    }
  });

  page.on('pageerror', err => {
    issues.push(`Page Error: ${err.message}`);
  });

  page.on('requestfailed', req => {
    networkFailures.push(`Failed Request: ${req.url()} (${req.failure()?.errorText})`);
  });

  page.on('response', res => {
    if (res.status() >= 400) {
      networkFailures.push(`HTTP ${res.status()} on ${res.url()}`);
    }
  });

  console.log('Testing Desktop 1440x900...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });

  // Check horizontal overflow
  const hasHScrollDesktop = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  if (hasHScrollDesktop) {
    issues.push('Desktop 1440x900: Horizontal scrollbar detected on root document');
  }

  // Check all images
  const brokenImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs
      .filter(img => !img.complete || img.naturalWidth === 0)
      .map(img => img.src);
  });
  if (brokenImages.length > 0) {
    issues.push(`Broken Images found on website: ${JSON.stringify(brokenImages)}`);
  }

  // Check mobile 390x844
  console.log('Testing Mobile 390x844...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.reload({ waitUntil: 'networkidle0' });

  const hasHScrollMobile = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  if (hasHScrollMobile) {
    issues.push('Mobile 390x844: Horizontal scrollbar detected on root document');
  }

  // Check small mobile 320x568
  console.log('Testing Small Mobile 320x568...');
  await page.setViewport({ width: 320, height: 568, isMobile: true, hasTouch: true });
  const hasHScrollSmall = await page.evaluate(() => {
    return document.documentElement.scrollWidth > window.innerWidth;
  });
  if (hasHScrollSmall) {
    issues.push('Small Mobile 320x568: Horizontal scrollbar detected on root document');
  }

  // Check Interactive App mode
  console.log('Testing Interactive App Mode (#app)...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:4173/#app', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const brokenAppImages = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img'));
    return imgs
      .filter(img => !img.complete || img.naturalWidth === 0)
      .map(img => img.src);
  });
  if (brokenAppImages.length > 0) {
    issues.push(`Broken Images found in App mode: ${JSON.stringify(brokenAppImages)}`);
  }

  await browser.close();

  console.log('\n--- AUDIT RESULTS ---');
  console.log('Issues found:', issues.length);
  issues.forEach(i => console.log(' - ', i));
  console.log('Network failures:', networkFailures.length);
  networkFailures.forEach(n => console.log(' - ', n));
}

audit().catch(err => {
  console.error(err);
  process.exit(1);
});
