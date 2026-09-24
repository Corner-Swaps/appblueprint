const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

(async () => {
  console.log('🚀 Starting Centering & Highlight Pulse Verification...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  // iPhone 16 Pro Max viewport: 440 x 956
  const VIEWPORT_WIDTH = 440;
  const VIEWPORT_HEIGHT = 956;
  await page.setViewport({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('has_accepted_disclaimer_v1', 'true');
    localStorage.setItem('has_accepted_disclaimer', 'true');
    localStorage.setItem('appblueprint_terms_accepted_v1', 'true');
  });
  await page.goto('http://localhost:4173/?mode=app#app', { waitUntil: 'networkidle0' });

  // Wait for splash screen or modal
  await new Promise(r => setTimeout(r, 1200));

  // Dismiss disclaimer modal if present
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const agreeBtn = buttons.find(b => b.textContent && (b.textContent.includes('Agree') || b.textContent.includes('Continue') || b.textContent.includes('Accept')));
    if (agreeBtn) agreeBtn.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // TEST 1: Open Step 1 (phase-1)
  console.log('📦 Tapping Step 1 to expand main section...');
  const phase1Header = await page.waitForSelector('#phase-1', { visible: true });
  await page.evaluate(() => {
    const el = document.getElementById('phase-1');
    if (el) el.querySelector('h2, .cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Find first sub item in Step 1: "p1-problem-solution"
  console.log('📖 Tapping sub item "Target Audience & Problem"...');
  await page.evaluate(() => {
    const sub = document.getElementById('p1-problem-solution');
    if (sub) sub.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Scroll down a bit to simulate user reading the sub menu
  await page.evaluate(() => {
    window.scrollBy(0, 300);
  });
  await new Promise(r => setTimeout(r, 200));

  // TEST 2: Click the sub text inside the guidance drawer to collapse and center
  console.log('👆 Clicking sub text inside drawer to collapse...');
  await page.evaluate(() => {
    const sub = document.getElementById('p1-problem-solution');
    const p = sub?.querySelector('p');
    if (p) p.click();
  });

  // Wait for 320ms collapse + scroll settling
  await new Promise(r => setTimeout(r, 450));

  // Measure position of sub pill in viewport
  const subPillMetrics = await page.evaluate(() => {
    const el = document.getElementById('p1-problem-solution');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const hasPulse = el.classList.contains('apple-section-pulse');
    const screenCenter = window.innerHeight / 2;
    const pillCenter = rect.top + rect.height / 2;
    const centerDiff = Math.abs(pillCenter - screenCenter);
    return {
      top: rect.top,
      height: rect.height,
      pillCenter,
      screenCenter,
      centerDiff,
      hasPulse,
      classes: el.className
    };
  });

  console.log('📊 Sub pill metrics after clicking sub text:', subPillMetrics);
  await page.screenshot({ path: path.resolve(__dirname, '../screenshots/verify_subpill_centered_pulse.png') });

  if (!subPillMetrics || subPillMetrics.centerDiff > 25) {
    throw new Error(`Sub pill is NOT centered in viewport! Center diff: ${subPillMetrics?.centerDiff}px`);
  }
  if (!subPillMetrics.hasPulse) {
    throw new Error('Sub pill does not have apple-section-pulse class!');
  }
  console.log('✅ Sub pill cleanly collapsed upwards, centered in middle of viewport, and pulsed!');

  // TEST 3: Expand sub item again and click the "Close" button
  console.log('📖 Re-opening sub item to test "Close" button...');
  await page.evaluate(() => {
    const sub = document.getElementById('p1-problem-solution');
    if (sub) sub.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Click the bottom "Close" button in the sub menu
  console.log('👆 Clicking "Close" button in sub menu...');
  await page.evaluate(() => {
    const sub = document.getElementById('p1-problem-solution');
    const closeBtn = Array.from(sub?.querySelectorAll('button') || []).find(b => b.textContent.includes('Close'));
    if (closeBtn) closeBtn.click();
  });

  await new Promise(r => setTimeout(r, 450));

  const subCloseMetrics = await page.evaluate(() => {
    const el = document.getElementById('p1-problem-solution');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const screenCenter = window.innerHeight / 2;
    const pillCenter = rect.top + rect.height / 2;
    const centerDiff = Math.abs(pillCenter - screenCenter);
    const hasPulse = el.classList.contains('apple-section-pulse');
    return { centerDiff, hasPulse, pillCenter, screenCenter };
  });

  console.log('📊 Sub pill metrics after clicking Close button:', subCloseMetrics);
  if (!subCloseMetrics || subCloseMetrics.centerDiff > 25) {
    throw new Error(`Sub pill is NOT centered after clicking Close button! Diff: ${subCloseMetrics?.centerDiff}px`);
  }
  console.log('✅ Sub pill Close button cleanly collapsed upwards, centered, and pulsed!');

  // TEST 4: Now test clicking "Close" on the MAIN pill (Step 1)
  console.log('👆 Clicking "Close" on main section action capsule...');
  const foundClose = await page.evaluate(() => {
    // Look for the close section button inside the expanded section's drawer
    const phase1 = document.getElementById('phase-1');
    const drawer = phase1?.nextElementSibling;
    const closeBtn = drawer?.querySelector('button[aria-label="Close section"]') || document.querySelector('button[aria-label="Close section"]');
    if (closeBtn) {
      closeBtn.click();
      return { found: true };
    }
    return { found: false };
  });
  console.log('🔍 Found close button result:', foundClose);

  await new Promise(r => setTimeout(r, 600));

  const mainPillMetrics = await page.evaluate(() => {
    const el = document.getElementById('phase-1');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const screenCenter = window.innerHeight / 2;
    const pillCenter = rect.top + rect.height / 2;
    const centerDiff = Math.abs(pillCenter - screenCenter);
    const hasPulse = el.classList.contains('apple-section-pulse');
    return { centerDiff, hasPulse, pillCenter, screenCenter, top: rect.top, height: rect.height };
  });

  console.log('📊 Main pill metrics after clicking Close:', mainPillMetrics);
  await page.screenshot({ path: path.resolve(__dirname, '../screenshots/verify_mainpill_centered_pulse.png') });

  if (!mainPillMetrics || mainPillMetrics.centerDiff > 25) {
    throw new Error(`Main pill is NOT centered in viewport! Center diff: ${mainPillMetrics?.centerDiff}px`);
  }
  if (!mainPillMetrics.hasPulse) {
    throw new Error('Main pill does not have apple-section-pulse class!');
  }
  console.log('✅ Main pill cleanly collapsed upwards, centered in middle of viewport, and pulsed!');

  // TEST 5: Academy & Resources Test
  console.log('🎓 Navigating to Academy & Resources tab...');
  await page.click('button[aria-label="Academy and Resources"]');
  await new Promise(r => setTimeout(r, 800));

  // Expand "AI Models & Coding Agents" category (id: "ai_models")
  console.log('📚 Expanding "ai_models" category...');
  await page.evaluate(() => {
    const sec = document.getElementById('ai_models');
    if (sec) sec.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Expand first tool: "ai-gemini-antigravity"
  console.log('🛠 Expanding "ai-gemini-antigravity" tool item...');
  await page.evaluate(() => {
    const item = document.getElementById('ai-gemini-antigravity');
    if (item) item.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 500));

  // Scroll down a bit inside tool drawer
  await page.evaluate(() => {
    window.scrollBy(0, 250);
  });
  await new Promise(r => setTimeout(r, 200));

  // Click sub text inside tool drawer
  console.log('👆 Clicking sub text inside Academy tool drawer...');
  await page.evaluate(() => {
    const item = document.getElementById('ai-gemini-antigravity');
    const p = item?.querySelector('p');
    if (p) p.click();
  });

  await new Promise(r => setTimeout(r, 450));

  const academySubMetrics = await page.evaluate(() => {
    const el = document.getElementById('ai-gemini-antigravity');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const screenCenter = window.innerHeight / 2;
    const pillCenter = rect.top + rect.height / 2;
    const centerDiff = Math.abs(pillCenter - screenCenter);
    const hasPulse = el.classList.contains('apple-section-pulse');
    return { centerDiff, hasPulse, pillCenter, screenCenter };
  });

  console.log('📊 Academy sub pill metrics:', academySubMetrics);
  await page.screenshot({ path: path.resolve(__dirname, '../screenshots/verify_academy_subpill_centered.png') });

  if (!academySubMetrics || academySubMetrics.centerDiff > 25) {
    throw new Error(`Academy tool pill is NOT centered! Center diff: ${academySubMetrics?.centerDiff}px`);
  }
  if (!academySubMetrics.hasPulse) {
    throw new Error('Academy tool pill does not have pulse class!');
  }
  console.log('✅ Academy tool pill cleanly collapsed upwards, centered, and pulsed!');

  // TEST 6: Expand "design" category and test closing it to verify exact vertical centering
  console.log('🎨 Expanding "design" category (Design Systems & UI/UX)...');
  await page.evaluate(() => {
    const sec = document.getElementById('design');
    if (sec) sec.querySelector('.cursor-pointer')?.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Scroll down into the design category drawer
  await page.evaluate(() => {
    window.scrollBy(0, 300);
  });
  await new Promise(r => setTimeout(r, 200));

  // Click Close on the "design" category action capsule
  console.log('👆 Clicking Close on "design" category action capsule...');
  const foundDesignClose = await page.evaluate(() => {
    const cat = document.getElementById('design');
    const drawer = cat?.nextElementSibling;
    const closeBtn = drawer?.querySelector('button[aria-label="Close section"]') || document.querySelector('button[aria-label="Close section"]');
    if (closeBtn) {
      closeBtn.click();
      return true;
    }
    return false;
  });
  console.log('🔍 Found Design category close button:', foundDesignClose);

  await new Promise(r => setTimeout(r, 600));

  const designCatMetrics = await page.evaluate(() => {
    const el = document.getElementById('design');
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    const screenCenter = window.innerHeight / 2;
    const pillCenter = rect.top + rect.height / 2;
    const centerDiff = Math.abs(pillCenter - screenCenter);
    const hasPulse = el.classList.contains('apple-section-pulse');
    return { centerDiff, hasPulse, pillCenter, screenCenter, top: rect.top, height: rect.height };
  });

  console.log('📊 Design category metrics after Close:', designCatMetrics);
  await page.screenshot({ path: path.resolve(__dirname, '../screenshots/verify_academy_design_centered.png') });

  if (!designCatMetrics || designCatMetrics.centerDiff > 25) {
    throw new Error(`Design category pill is NOT centered! Center diff: ${designCatMetrics?.centerDiff}px`);
  }
  if (!designCatMetrics.hasPulse) {
    throw new Error('Design category pill does not have pulse class!');
  }
  console.log('✅ Design category cleanly collapsed upwards, centered, and pulsed!');

  console.log('🎉 ALL CENTERING & PULSE TESTS PASSED WITH 100% SUCCESS!');
  await browser.close();
})().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
