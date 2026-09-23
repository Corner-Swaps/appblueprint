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

  // 1. Initial Launch - Legal Modal
  console.log('1. Loading app without legal acceptance...');
  await page.evaluateOnNewDocument(() => {
    localStorage.clear();
  });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
  await sleep(1500); // Wait for splash animation if any
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
    await sleep(600);
  }
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '03_home_checklist.png') });
  console.log('Saved 03_home_checklist.png');

  // 4. Expand Set Up Steps (Phase 0)
  console.log('4. Expanding Set Up Steps...');
  const setupPhaseHeader = await page.$('#phase-setup');
  if (setupPhaseHeader) {
    // Click the accordion header
    await page.click('#phase-setup button');
    await sleep(600);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_setup_steps_expanded.png') });
    console.log('Saved 04_setup_steps_expanded.png');

    // 5. Expand first setup step item
    console.log('5. Expanding first setup step drawer...');
    const firstItemBtn = await page.$('#phase-setup [aria-expanded]');
    if (firstItemBtn) {
      await firstItemBtn.click();
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

    // Expand Phase 2 (Design, Liquid Glass & Native UI)
    const phase2Card = await page.$('#phase-2');
    if (phase2Card) {
      await page.click('#phase-2 button');
      await sleep(600);
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, '09_phase2_expanded.png') });
      console.log('Saved 09_phase2_expanded.png');

      // Expand Liquid Glass item
      const liquidGlassBtn = await page.$('#p2-liquid-glass button');
      if (liquidGlassBtn) {
        await liquidGlassBtn.click();
        await sleep(600);
        await page.screenshot({ path: path.join(SCREENSHOT_DIR, '10_liquid_glass_drawer.png') });
        console.log('Saved 10_liquid_glass_drawer.png');
      }
    }
  }

  // 10. Native Review Prompt Modal test
  console.log('10. Triggering Native Review Prompt...');
  await page.evaluate(() => {
    localStorage.setItem('launchready_visits_count', '14');
    sessionStorage.removeItem('launchready_session_counted');
    localStorage.removeItem('launchready_review_prompted_15');
  });
  await page.reload({ waitUntil: 'networkidle0' });
  await sleep(1800); // wait for 1200ms timer
  await page.screenshot({ path: path.join(SCREENSHOT_DIR, '11_native_review_prompt.png') });
  console.log('Saved 11_native_review_prompt.png');

  console.log('All screenshots captured successfully!');
  await browser.close();
}

run().catch((err) => {
  console.error('Screenshot script error:', err);
  process.exit(1);
});
