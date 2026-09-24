const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

(async () => {
  console.log('🚀 Starting New Project Pill & Paywall verification test...');

  const vite = spawn('npx', ['vite', '--port', '5173'], {
    cwd: path.resolve(__dirname, '..'),
    stdio: 'pipe'
  });

  await new Promise((resolve) => {
    vite.stdout.on('data', (d) => {
      const s = d.toString();
      if (s.includes('Local:')) {
        resolve();
      }
    });
  });

  console.log('⚡️ Vite server listening on http://localhost:5173');

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 393, height: 852, deviceScaleFactor: 2, isMobile: true, hasTouch: true });

    await page.goto('http://localhost:5173/?mode=app#app', { waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 800));

    // Handle initial disclaimer or splash if present
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const text = await page.evaluate(el => el.textContent, btn);
      if (text && text.includes('Agree & Continue')) {
        await btn.click();
        await new Promise(r => setTimeout(r, 600));
        break;
      }
    }

    // Reset storage to test clean locked state with 1 project
    await page.evaluate(() => {
      localStorage.removeItem('appblueprint_pro_unlocked_v1');
      localStorage.removeItem('appblueprint_unlimited_unlocked_v2');
      localStorage.removeItem('appblueprint_purchased_slots_v2');
      localStorage.setItem('appblueprint_creations_ever_v2', '1');
      localStorage.setItem('appblueprint_free_project_claimed_v1', 'true');
    });
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 1200));

    // Wait for splash screen to complete if showing
    await page.waitForFunction(() => !document.querySelector('.splash-screen'), { timeout: 7000 }).catch(() => {});

    // Click projects tab
    console.log('📱 Navigating to Projects tab...');
    const navState = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('nav button'));
      const activeBtn = btns.find(b => b.getAttribute('aria-label') === 'Projects');
      if (activeBtn) activeBtn.click();
      return {
        btnsCount: btns.length,
        hasProjectsBtn: !!activeBtn
      };
    });
    console.log('Nav state:', navState);
    await new Promise(r => setTimeout(r, 1200));

    // Check if Select Project heading is visible
    const isProjectsVisible = await page.evaluate(() => {
      const headings = Array.from(document.querySelectorAll('h1, h2'));
      return headings.some(h => (h.textContent || '').includes('Select Project'));
    });
    console.log('Select Project screen visible:', isProjectsVisible);

    // 2. Verify New Project pill
    console.log('🔍 Checking New Project pill styling & content...');
    const allCards = await page.evaluate(() => {
      const cards = Array.from(document.querySelectorAll('[role="button"], div.rounded-3xl'));
      return cards.map(c => ({
        title: c.getAttribute('title'),
        text: c.innerText?.slice(0, 100),
        className: c.className
      }));
    });
    console.log('Found cards:', allCards);

    const pillContent = await page.evaluate(() => {
      const el = document.querySelector('[title="Unlock Unlimited Projects"], [title="Create New Project"]');
      if (!el) return null;
      return {
        text: el.innerText,
        title: el.getAttribute('title'),
        html: el.innerHTML.slice(0, 300),
        hasCoffee: el.innerHTML.toLowerCase().includes('coffee') || el.innerText.includes('☕️'),
        hasSparkles: el.innerHTML.includes('lucide-sparkles'),
        hasBlackButton: el.innerHTML.includes('bg-slate-900 text-white')
      };
    });

    console.log('Pill content summary:', {
      hasPill: !!pillContent,
      hasCoffee: pillContent?.hasCoffee,
      hasSparkles: pillContent?.hasSparkles,
      hasBlackButton: pillContent?.hasBlackButton
    });

    if (!pillContent) {
      throw new Error('New Project card [title="Unlock Unlimited Projects"] not found!');
    }

    if (pillContent.hasCoffee) {
      throw new Error('Coffee reference found in New Project card!');
    }
    if (pillContent.hasBlackButton) {
      throw new Error('Black button found in New Project card!');
    }

    const screenshotsDir = path.resolve(__dirname, '../screenshots');
    if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir);
    await page.screenshot({ path: path.join(screenshotsDir, 'verify_new_project_pill_step1_style.png') });
    console.log('📸 Saved screenshot: verify_new_project_pill_step1_style.png');

    // 3. Click the New Project card to open the modal
    console.log('👆 Tapping New Project card to open Paywall Modal...');
    await page.click('[title="Unlock Unlimited Projects"]');
    await new Promise(r => setTimeout(r, 800));

    // Verify modal content
    const modalData = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      if (!modal) return null;
      const text = modal.innerText;
      const inputs = Array.from(modal.querySelectorAll('input')).map(i => i.placeholder);
      const title = modal.querySelector('#paywall-title')?.textContent;
      const hasCoffee = modal.innerHTML.toLowerCase().includes('coffee') || text.includes('☕️');
      return {
        title,
        inputs,
        hasCoffee
      };
    });

    console.log('Modal data:', modalData);
    if (!modalData) {
      throw new Error('Paywall modal did not open upon clicking New Project card!');
    }
    if (modalData.hasCoffee) {
      throw new Error('Coffee references found in Paywall Modal!');
    }

    await page.screenshot({ path: path.join(screenshotsDir, 'verify_creator_pass_modal.png') });
    console.log('📸 Saved screenshot: verify_creator_pass_modal.png');

    // 4. Fill in Creator Name & Email
    console.log('✍️ Testing Sign-up inputs inside modal...');
    const inputs = await page.$$('[role="dialog"] input');
    if (inputs.length >= 2) {
      await inputs[0].type('Slava Studio');
      await inputs[1].type('slava@creatorpass.io');
    }

    // 5. Click the enticing gradient CTA button
    console.log('💳 Tapping Sign Up & Unlock CTA button...');
    const ctaBtn = await page.$('[role="dialog"] button.apple-press.w-full');
    await ctaBtn.click();

    // Wait for StoreKit simulation to complete
    await new Promise(r => setTimeout(r, 2200));

    // 6. Verify modal is closed and create project form is open
    const postUnlockState = await page.evaluate(() => {
      const modal = document.querySelector('[role="dialog"]');
      const input = document.querySelector('input[placeholder="Project Name..."]');
      return {
        isModalOpen: modal !== null,
        hasCreateInput: input !== null
      };
    });

    console.log('Post unlock state:', postUnlockState);
    if (postUnlockState.isModalOpen) {
      throw new Error('Modal did not close after simulated unlock!');
    }
    if (!postUnlockState.hasCreateInput) {
      throw new Error('Create Project input is not visible after unlock!');
    }

    await page.screenshot({ path: path.join(screenshotsDir, 'verify_create_form_active.png') });
    console.log('📸 Saved screenshot: verify_create_form_active.png');

    // 7. Create a project
    console.log('🎯 Typing new project name and submitting...');
    await page.type('input[placeholder="Project Name..."]', 'AI Camera Studio');
    await page.keyboard.press('Enter');

    await new Promise(r => setTimeout(r, 1000));

    await page.screenshot({ path: path.join(screenshotsDir, 'verify_project_created.png') });
    console.log('📸 Saved screenshot: verify_project_created.png');

    console.log('🎉 ALL TESTS PASSED WITH 100% SUCCESS!');
  } finally {
    await browser.close();
    vite.kill();
  }
})();
