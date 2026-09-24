const puppeteer = require('puppeteer-core');
const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 440, height: 956 });

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

  // Add apple-section-pulse to sub-pill
  await page.evaluate(() => {
    document.getElementById('p1-problem-solution')?.classList.add('apple-section-pulse');
  });

  // Wait 500ms (in the middle of the pulse!)
  await new Promise(r => setTimeout(r, 500));

  const at500ms = await page.evaluate(() => {
    const el = document.getElementById('p1-problem-solution');
    const cs = window.getComputedStyle(el);
    return {
      borderTopColor: cs.borderTopColor,
      borderBottomColor: cs.borderBottomColor,
      borderLeftColor: cs.borderLeftColor,
      borderRightColor: cs.borderRightColor,
      boxShadow: cs.boxShadow,
    };
  });

  console.log('At 500ms:', at500ms);

  await browser.close();
})();
