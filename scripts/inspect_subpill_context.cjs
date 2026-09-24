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

  // Open sub-pill, then collapse it using the real collapse function!
  await page.evaluate(() => {
    document.getElementById('p1-problem-solution')?.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Now click Close button inside the sub-pill
  await page.evaluate(() => {
    const btns = Array.from(document.getElementById('p1-problem-solution')?.querySelectorAll('button') || []);
    const closeBtn = btns.find(b => b.textContent && b.textContent.includes('Close'));
    if (closeBtn) closeBtn.click();
  });

  // Wait 400ms for collapse to complete and pulse to be active
  await new Promise(r => setTimeout(r, 400));

  // Capture full viewport
  await page.screenshot({ path: path.resolve(__dirname, '../screenshots/full_page_subpill_pulse.png') });

  // Also inspect what is overlapping or clipping
  const contextInfo = await page.evaluate(() => {
    const sub = document.getElementById('p1-problem-solution');
    const parent = sub?.parentElement;
    const grandparent = parent?.parentElement;
    const greatGrandparent = grandparent?.parentElement;
    
    function cs(el) {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      return {
        tag: el.tagName,
        className: el.className,
        overflow: s.overflow,
        overflowY: s.overflowY,
        overflowX: s.overflowX,
        padding: s.padding,
        margin: s.margin,
        clipPath: s.clipPath,
        rect: el.getBoundingClientRect()
      };
    }

    return {
      sub: cs(sub),
      parent: cs(parent),
      grandparent: cs(grandparent),
      greatGrandparent: cs(greatGrandparent)
    };
  });

  console.log(JSON.stringify(contextInfo, null, 2));

  await browser.close();
})();
