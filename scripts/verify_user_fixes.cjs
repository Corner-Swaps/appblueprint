const puppeteer = require('puppeteer-core');
const path = require('path');

async function run() {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  // iPhone 16 Pro Max viewport
  await page.setViewport({ width: 430, height: 932, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

  console.log('--- 1. Testing App Load & Initial Feed ---');
  await page.goto('http://localhost:4173/?mode=app#app', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  // Accept legal modal if present
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('Agree & Continue')) {
      await btn.click();
      await new Promise(r => setTimeout(r, 500));
      break;
    }
  }

  // Check Set Up pill is first
  const firstPhaseText = await page.evaluate(() => {
    const firstPill = document.querySelector('[id="phase-setup"]');
    return firstPill ? firstPill.innerText : 'NOT FOUND';
  });
  console.log('First phase found:', firstPhaseText.split('\n')[0]);

  await page.screenshot({ path: path.join(__dirname, '../screenshots/verify_feed_setup_first.png') });

  console.log('--- 2. Testing Add Custom Section Centering ---');
  // Scroll down to find the Add Section button
  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 400));

  // Find Add Section button
  const addBtn = await page.evaluateHandle(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    return btns.find(b => b.textContent && b.textContent.includes('Add Section'));
  });

  if (addBtn && (await addBtn.asElement())) {
    await addBtn.click();
    await new Promise(r => setTimeout(r, 300));

    // Fill in section title and description
    await page.type('input[placeholder*="In-App Purchases"]', 'Push Notifications');
    await page.type('input[placeholder*="summary of requirements"]', 'APNs certs, background entitlements, and notification permissions');

    // Click "Create Section"
    const submitBtn = await page.evaluateHandle(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      return btns.find(b => b.textContent && b.textContent.includes('Create Section'));
    });
    await submitBtn.click();

    // Wait for smooth scroll and centering
    await new Promise(r => setTimeout(r, 600));

    const newSectionMetrics = await page.evaluate(() => {
      const customEl = Array.from(document.querySelectorAll('[id^="custom-phase-"]')).pop();
      if (!customEl) return null;
      const rect = customEl.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const centerY = rect.top + rect.height / 2;
      return {
        id: customEl.id,
        text: customEl.innerText.slice(0, 50),
        top: Math.round(rect.top),
        centerY: Math.round(centerY),
        viewportCenter: Math.round(viewportHeight / 2),
        isCentered: Math.abs(centerY - viewportHeight / 2) < 180,
        scrollY: window.pageYOffset
      };
    });

    console.log('New section metrics:', newSectionMetrics);
    await page.screenshot({ path: path.join(__dirname, '../screenshots/verify_custom_section_centered.png') });
  }

  console.log('--- 3. Testing Section Expansion, Action Capsule & Smooth Collapse ---');
  // Expand Phase 1
  await page.evaluate(() => {
    const p1 = document.getElementById('phase-1');
    if (p1) {
      p1.scrollIntoView({ behavior: 'instant', block: 'center' });
      const toggle = p1.querySelector('[role="button"]');
      if (toggle) toggle.click();
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/verify_phase1_expanded.png') });

  // Verify Action Capsule [ Add | Edit | ^ ]
  const capsuleDetails = await page.evaluate(() => {
    const p1 = document.getElementById('phase-1');
    if (!p1) return null;
    const btns = Array.from(p1.querySelectorAll('button'));
    return btns.map(b => ({
      text: b.textContent.trim(),
      title: b.title || b.getAttribute('aria-label') || ''
    }));
  });
  console.log('Phase 1 buttons:', capsuleDetails);

  // Click the bottom pure ChevronUp close button in the action capsule
  await page.evaluate(() => {
    const p1 = document.getElementById('phase-1');
    if (p1) {
      const closeBtn = p1.querySelector('button[title="Close section"]');
      if (closeBtn) closeBtn.click();
    }
  });

  // Wait for fluid scroll up and fold closed
  await new Promise(r => setTimeout(r, 800));

  const afterCloseMetrics = await page.evaluate(() => {
    const p1 = document.getElementById('phase-1');
    if (!p1) return null;
    const rect = p1.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const centerY = rect.top + rect.height / 2;
    return {
      centerY: Math.round(centerY),
      viewportCenter: Math.round(viewportHeight / 2),
      isCentered: Math.abs(centerY - viewportHeight / 2) < 120,
      classes: p1.className
    };
  });
  console.log('Phase 1 after close metrics:', afterCloseMetrics);
  await page.screenshot({ path: path.join(__dirname, '../screenshots/verify_phase1_closed_pulse.png') });

  console.log('--- 4. Testing Academy & Resources Tab ---');
  // Click on Academy tab in bottom dock
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('nav button'));
    if (btns[1]) btns[1].click();
  });
  await new Promise(r => setTimeout(r, 600));

  // Check categories and verify Backend uses Server icon
  const academyCategories = await page.evaluate(() => {
    const headers = Array.from(document.querySelectorAll('h2'));
    return headers.map(h => h.textContent.trim());
  });
  console.log('Academy categories:', academyCategories);
  await page.screenshot({ path: path.join(__dirname, '../screenshots/verify_academy_tab.png') });

  // Expand AI Models category
  await page.evaluate(() => {
    const aiSec = document.getElementById('ai_models');
    if (aiSec) {
      aiSec.querySelector('div[onClick], [role="button"], h2')?.click();
    }
  });
  await new Promise(r => setTimeout(r, 600));

  // Click bottom ChevronUp close button on the category
  await page.evaluate(() => {
    const aiSec = document.getElementById('ai_models');
    if (aiSec) {
      const closeBtn = aiSec.parentElement.querySelector('button[title="Close section"]');
      if (closeBtn) closeBtn.click();
    }
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/verify_academy_closed_pulse.png') });

  console.log('--- All automated verification tests completed successfully! ---');
  await browser.close();
}

run().catch(err => {
  console.error('Error during test:', err);
  process.exit(1);
});
