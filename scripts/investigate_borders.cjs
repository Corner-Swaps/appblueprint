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

  const borderStyles = await page.evaluate(() => {
    const el = document.getElementById('p1-problem-solution');
    const cs = window.getComputedStyle(el);
    return {
      borderTopColor: cs.borderTopColor,
      borderBottomColor: cs.borderBottomColor,
      borderLeftColor: cs.borderLeftColor,
      borderRightColor: cs.borderRightColor,
      borderTopWidth: cs.borderTopWidth,
      borderBottomWidth: cs.borderBottomWidth,
      boxShadow: cs.boxShadow,
      animation: cs.animation,
      // Check if any element is overlapping the top or bottom of this element
      rect: el.getBoundingClientRect(),
    };
  });

  console.log('Border styles:', borderStyles);

  // Check what elements are at points along the top and bottom borders
  const hitTest = await page.evaluate(() => {
    const el = document.getElementById('p1-problem-solution');
    const rect = el.getBoundingClientRect();
    
    // Top border points: middle of top border
    const topElement = document.elementFromPoint(rect.left + rect.width / 2, rect.top);
    const topElementInside = document.elementFromPoint(rect.left + rect.width / 2, rect.top + 2);
    const topElementOutside = document.elementFromPoint(rect.left + rect.width / 2, rect.top - 2);

    // Bottom border points: middle of bottom border
    const bottomElement = document.elementFromPoint(rect.left + rect.width / 2, rect.bottom);
    const bottomElementInside = document.elementFromPoint(rect.left + rect.width / 2, rect.bottom - 2);
    const bottomElementOutside = document.elementFromPoint(rect.left + rect.width / 2, rect.bottom + 2);

    // Left border points
    const leftElement = document.elementFromPoint(rect.left, rect.top + rect.height / 2);
    const rightElement = document.elementFromPoint(rect.right - 1, rect.top + rect.height / 2);

    function summarize(el) {
      if (!el) return null;
      return { tag: el.tagName, id: el.id, className: el.className };
    }

    return {
      topElement: summarize(topElement),
      topElementInside: summarize(topElementInside),
      topElementOutside: summarize(topElementOutside),
      bottomElement: summarize(bottomElement),
      bottomElementInside: summarize(bottomElementInside),
      bottomElementOutside: summarize(bottomElementOutside),
      leftElement: summarize(leftElement),
      rightElement: summarize(rightElement),
    };
  });

  console.log('Hit test:', JSON.stringify(hitTest, null, 2));

  // Let's get the pixel colors of the screenshot!
  // We can sample pixels using an offscreen canvas in page.evaluate!
  const sampledPixels = await page.evaluate(async () => {
    const el = document.getElementById('p1-problem-solution');
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      bottom: rect.bottom,
      left: rect.left,
      right: rect.right,
    };
  });

  console.log('Sampled coordinates:', sampledPixels);

  await browser.close();
})();
