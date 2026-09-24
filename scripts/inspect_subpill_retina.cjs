const puppeteer = require('puppeteer-core');
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  // Device scale factor 3 to simulate physical iPhone 16 Pro Max Retina display!
  await page.setViewport({ width: 440, height: 956, deviceScaleFactor: 3 });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('has_accepted_disclaimer_v1', 'true');
    localStorage.setItem('has_accepted_disclaimer', 'true');
    localStorage.setItem('appblueprint_terms_accepted_v1', 'true');
  });

  await page.goto('http://localhost:4173/?mode=app#app', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const agreeBtn = buttons.find(b => b.textContent && (b.textContent.includes('Agree') || b.textContent.includes('Continue') || b.textContent.includes('Accept')));
    if (agreeBtn) agreeBtn.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Expand phase 1
  await page.evaluate(() => {
    document.getElementById('phase-1')?.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Pulse sub item
  await page.evaluate(() => {
    const el = document.getElementById('p1-problem-solution');
    el?.classList.add('apple-section-pulse');
  });
  await new Promise(r => setTimeout(r, 100));

  // Take screenshot of the pulsing sub-pill
  const subEl = await page.$('#p1-problem-solution');
  if (subEl) {
    await subEl.screenshot({ path: path.resolve(__dirname, '../screenshots/subpill_pulse_retina.png') });
  }

  // Also pulse main pill for comparison
  await page.evaluate(() => {
    const el = document.getElementById('phase-1');
    el?.classList.add('apple-section-pulse');
  });
  await new Promise(r => setTimeout(r, 100));

  const mainEl = await page.$('#phase-1');
  if (mainEl) {
    await mainEl.screenshot({ path: path.resolve(__dirname, '../screenshots/mainpill_pulse_retina.png') });
  }

  // Also let's inspect the exact computed styles and box model of the sub-pill
  const subBoxModel = await page.evaluate(() => {
    const el = document.getElementById('p1-problem-solution');
    const cs = window.getComputedStyle(el);
    const rect = el.getBoundingClientRect();
    const children = Array.from(el.children).map(c => {
      const ccs = window.getComputedStyle(c);
      const crect = c.getBoundingClientRect();
      return {
        tag: c.tagName,
        className: c.className,
        rect: { top: crect.top, bottom: crect.bottom, height: crect.height },
        marginTop: ccs.marginTop,
        marginBottom: ccs.marginBottom,
        overflow: ccs.overflow,
        display: ccs.display,
      };
    });
    return {
      rect: { top: rect.top, bottom: rect.bottom, height: rect.height, left: rect.left, right: rect.right, width: rect.width },
      padding: cs.padding,
      borderTop: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`,
      borderBottom: `${cs.borderBottomWidth} ${cs.borderBottomStyle} ${cs.borderBottomColor}`,
      borderLeft: `${cs.borderLeftWidth} ${cs.borderLeftStyle} ${cs.borderLeftColor}`,
      borderRight: `${cs.borderRightWidth} ${cs.borderRightStyle} ${cs.borderRightColor}`,
      boxShadow: cs.boxShadow,
      children
    };
  });

  console.log('=== SUB PILL BOX MODEL ===');
  console.log(JSON.stringify(subBoxModel, null, 2));

  await browser.close();
})();
