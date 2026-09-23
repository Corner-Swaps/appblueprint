const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const SCREENSHOT_DIR = path.join(__dirname, '../screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function run() {
  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 430,
    height: 932,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  // 0. Splash Screen capture
  console.log('0. Capturing Splash Screen...');
  await page.evaluateOnNewDocument(() => {
    if (!sessionStorage.getItem('__booted')) {
      sessionStorage.setItem('__booted', 'true');
      localStorage.clear();
    }
  });
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  await sleep(600); // During splash animation
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '00_splash_screen.png') });
  console.log('Saved 00_splash_screen.png');

  // Wait for splash screen to fully finish and dismiss
  await sleep(2500);

  // 1. Legal Modal (now cleanly visible after splash)
  console.log('1. Capturing Legal Modal...');
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '01_legal_modal.png') });
  console.log('Saved 01_legal_modal.png');

  // 2. Open Privacy Policy from Legal Modal
  console.log('2. Opening Privacy Policy modal...');
  const privacyButton = await page.$('button ::-p-text(Privacy Policy)');
  if (privacyButton) {
    await privacyButton.click();
    await sleep(500);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '02_privacy_modal.png') });
    console.log('Saved 02_privacy_modal.png');

    // Click "I Understand" to go back
    const understandBtn = await page.$('button ::-p-text(I Understand)');
    if (understandBtn) await understandBtn.click();
    await sleep(400);
  }

  // 3. Accept Legal Agreement -> Home Checklist
  console.log('3. Accepting legal agreement...');
  const acceptBtn = await page.$('button ::-p-text(I Agree & Accept)');
  if (acceptBtn) {
    await acceptBtn.click();
    await sleep(800);
  }
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_home_checklist.png') });
  console.log('Saved 03_home_checklist.png');

  // 4. Expand Set Up Steps (Phase 0)
  console.log('4. Expanding Set Up Steps...');
  const setupPhase = await page.$('#phase-setup');
  if (setupPhase) {
    // Click the top chevron button of phase-setup
    const headerBtn = await page.$('#phase-setup > div > div:first-child');
    if (headerBtn) await headerBtn.click();
    await sleep(600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_setup_steps_expanded.png') });
    console.log('Saved 04_setup_steps_expanded.png');

    // 5. Expand first setup step item drawer
    console.log('5. Expanding first setup step drawer...');
    const itemCard = await page.$('#setup-model .cursor-pointer');
    if (itemCard) {
      await itemCard.click();
      await sleep(600);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_setup_item_drawer_open.png') });
      console.log('Saved 05_setup_item_drawer_open.png');
    }
  }

  // 6. Switch to Projects Page
  console.log('6. Switching to Projects tab...');
  const projectsNavBtn = await page.$('button[aria-label="Projects"]');
  if (projectsNavBtn) {
    await projectsNavBtn.click();
    await sleep(600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '06_projects_page.png') });
    console.log('Saved 06_projects_page.png');
  }

  // 7. Switch to Resources Page
  console.log('7. Switching to Resources tab...');
  const resourcesNavBtn = await page.$('button[aria-label="Academy and Resources"]');
  if (resourcesNavBtn) {
    await resourcesNavBtn.click();
    await sleep(600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '07_resources_page.png') });
    console.log('Saved 07_resources_page.png');

    // Expand Typography Section
    console.log('8. Expanding Typography section in Resources...');
    const typographyPill = await page.$('button ::-p-text(Typography & Font Systems)');
    if (typographyPill) {
      await typographyPill.click();
      await sleep(600);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '08_resources_typography.png') });
      console.log('Saved 08_resources_typography.png');
    }
  }

  // 9. Switch back to Checklist to verify subsections collapsed and test Phase 2
  console.log('9. Switching back to Checklist...');
  const checklistNavBtn = await page.$('button[aria-label^="Checklist Progress"]');
  if (checklistNavBtn) {
    await checklistNavBtn.click();
    await sleep(600);

    // Expand Phase 2 (Design, Layout & Mobile Comfort)
    const phase2Header = await page.$('#phase-2 > div > div:first-child');
    if (phase2Header) {
      await phase2Header.click();
      await sleep(600);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09_phase2_expanded.png') });
      console.log('Saved 09_phase2_expanded.png');

      // Expand Liquid Glass item
      const liquidGlassCard = await page.$('#p2-liquid-glass .cursor-pointer');
      if (liquidGlassCard) {
        await liquidGlassCard.click();
        await sleep(600);
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10_liquid_glass_drawer.png') });
        console.log('Saved 10_liquid_glass_drawer.png');
      }
    }
  }

  // 10. Native Review Prompt Modal test
  console.log('10. Triggering Native Review Prompt...');
  await page.evaluate(() => {
    localStorage.setItem('launchready_legal_agreed_v1', 'true');
    localStorage.setItem('launchready_visits_count', '14');
    sessionStorage.removeItem('launchready_session_counted');
    localStorage.removeItem('launchready_review_prompted_15');
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await sleep(4600); // Wait for splash to finish (2.5s) + review timer (1.5s) + render buffer
  await page.waitForSelector('#review-title', { timeout: 3000 }).catch(() => {});
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '11_native_review_prompt.png') });
  console.log('Saved 11_native_review_prompt.png');

  console.log('All screenshots captured successfully!');
  await browser.close();
}

run().catch((err) => {
  console.error('Screenshot script error:', err);
  process.exit(1);
});
