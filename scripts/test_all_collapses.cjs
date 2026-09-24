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

  console.log('--- TEST A: Main Pill Collapse ---');
  // Expand phase 1
  await page.evaluate(() => {
    document.getElementById('phase-1')?.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 400));
  // Collapse phase 1 via header click
  await page.evaluate(() => {
    document.getElementById('phase-1')?.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 450));
  const mainPillPulseState = await page.evaluate(() => {
    const el = document.getElementById('phase-1');
    return {
      hasPulse: el?.classList.contains('apple-section-pulse'),
      classes: el?.className
    };
  });
  console.log('Main Pill after header collapse:', mainPillPulseState);

  console.log('--- TEST B: Sub Pill Collapse via Header Click ---');
  // Re-expand phase 1
  await page.evaluate(() => {
    document.getElementById('phase-1')?.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 400));
  // Expand sub item
  await page.evaluate(() => {
    document.getElementById('p1-problem-solution')?.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 400));
  // Collapse sub item via header click
  await page.evaluate(() => {
    document.getElementById('p1-problem-solution')?.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 450));
  const subPillHeaderCollapse = await page.evaluate(() => {
    const el = document.getElementById('p1-problem-solution');
    return {
      hasPulse: el?.classList.contains('apple-section-pulse'),
      classes: el?.className
    };
  });
  console.log('Sub Pill after header collapse:', subPillHeaderCollapse);

  console.log('--- TEST C: Sub Pill Collapse via Chevron Click ---');
  // Re-expand sub item
  await page.evaluate(() => {
    document.getElementById('p1-problem-solution')?.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 400));
  // Collapse via chevron
  await page.evaluate(() => {
    const btn = document.getElementById('p1-problem-solution')?.querySelector('button[title="Close guidance"], button[aria-label="Close guidance"]');
    if (btn) btn.click();
    else console.log('Chevron close button not found!');
  });
  await new Promise(r => setTimeout(r, 450));
  const subPillChevronCollapse = await page.evaluate(() => {
    const el = document.getElementById('p1-problem-solution');
    return {
      hasPulse: el?.classList.contains('apple-section-pulse'),
      classes: el?.className
    };
  });
  console.log('Sub Pill after chevron collapse:', subPillChevronCollapse);

  console.log('--- TEST D: Sub Pill Collapse via Bottom "Close" Button ---');
  // Re-expand sub item
  await page.evaluate(() => {
    document.getElementById('p1-problem-solution')?.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 400));
  // Collapse via bottom Close button
  await page.evaluate(() => {
    const btns = Array.from(document.getElementById('p1-problem-solution')?.querySelectorAll('button') || []);
    const closeBtn = btns.find(b => b.textContent && b.textContent.includes('Close'));
    if (closeBtn) closeBtn.click();
    else console.log('Bottom close button not found!');
  });
  await new Promise(r => setTimeout(r, 450));
  const subPillBottomClose = await page.evaluate(() => {
    const el = document.getElementById('p1-problem-solution');
    return {
      hasPulse: el?.classList.contains('apple-section-pulse'),
      classes: el?.className
    };
  });
  console.log('Sub Pill after bottom Close button collapse:', subPillBottomClose);

  console.log('--- TEST E: Sub Pill Collapse via Drawer Text Click ---');
  // Re-expand sub item
  await page.evaluate(() => {
    document.getElementById('p1-problem-solution')?.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 400));
  // Collapse via drawer text
  await page.evaluate(() => {
    const drawerP = document.getElementById('p1-problem-solution')?.querySelector('.apple-drawer-content p');
    if (drawerP) drawerP.click();
    else console.log('Drawer p not found!');
  });
  await new Promise(r => setTimeout(r, 450));
  const subPillDrawerText = await page.evaluate(() => {
    const el = document.getElementById('p1-problem-solution');
    return {
      hasPulse: el?.classList.contains('apple-section-pulse'),
      classes: el?.className
    };
  });
  console.log('Sub Pill after drawer text click collapse:', subPillDrawerText);

  console.log('--- TEST F: Academy Tool Pill Collapse via Header Click ---');
  // Switch to Academy tab
  await page.evaluate(() => {
    const navBtns = Array.from(document.querySelectorAll('nav button'));
    // Second button is Academy (index 1)
    if (navBtns[1]) navBtns[1].click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Expand first category "ai_models"
  await page.evaluate(() => {
    document.getElementById('ai_models')?.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Expand first tool "ai-gemini-antigravity"
  await page.evaluate(() => {
    document.getElementById('ai-gemini-antigravity')?.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Collapse tool via header click
  await page.evaluate(() => {
    document.getElementById('ai-gemini-antigravity')?.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 450));
  const academyToolHeader = await page.evaluate(() => {
    const el = document.getElementById('ai-gemini-antigravity');
    return {
      hasPulse: el?.classList.contains('apple-section-pulse'),
      classes: el?.className
    };
  });
  console.log('Academy Tool after header collapse:', academyToolHeader);

  console.log('--- TEST G: Academy Tool Pill Collapse via Bottom Close Button ---');
  // Re-expand tool
  await page.evaluate(() => {
    document.getElementById('ai-gemini-antigravity')?.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // Collapse tool via bottom close button
  await page.evaluate(() => {
    const btns = Array.from(document.getElementById('ai-gemini-antigravity')?.querySelectorAll('button') || []);
    const closeBtn = btns.find(b => b.textContent && b.textContent.includes('Close'));
    if (closeBtn) closeBtn.click();
    else console.log('Academy tool close button not found!');
  });
  await new Promise(r => setTimeout(r, 450));
  const academyToolBottomClose = await page.evaluate(() => {
    const el = document.getElementById('ai-gemini-antigravity');
    return {
      hasPulse: el?.classList.contains('apple-section-pulse'),
      classes: el?.className
    };
  });
  console.log('Academy Tool after bottom Close button collapse:', academyToolBottomClose);

  await browser.close();
})();
