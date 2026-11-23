const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const http = require('http');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DOCS_DIR = path.join(__dirname, '../docs');
const OUT_DIR_PROJECT = path.join(__dirname, '../ipad13_screenshots');
const OUT_DIR_APPSTORE_IPAD = path.join(__dirname, '../appstore_screenshots_ipad');
const PORT = 8146;

[OUT_DIR_PROJECT, OUT_DIR_APPSTORE_IPAD].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function startServer(port = PORT) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.woff2': 'font/woff2',
    '.ttf': 'font/ttf'
  };

  const server = http.createServer((req, res) => {
    let reqPath = req.url.split('?')[0].split('#')[0];
    if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
    const filePath = path.join(DOCS_DIR, reqPath);
    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(404);
        res.end('Not found');
        return;
      }
      const ext = path.extname(filePath);
      res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
      res.end(content);
    });
  });

  return new Promise((resolve) => {
    server.listen(port, () => resolve(server));
  });
}

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function injectIPadChrome(page, { dark = false, isSplash = false } = {}) {
  await page.evaluate(({ dark, isSplash }) => {
    // Hide web launcher bar
    document.querySelectorAll('.bg-slate-900.text-white.text-xs, [aria-label="Back to Website"], #launcher-bar').forEach(el => {
      const topBar = el.closest('div.sticky.top-0') || el;
      if (topBar) topBar.style.display = 'none';
    });

    // Remove existing overlays
    const existingStatus = document.getElementById('ipad-statusbar-overlay');
    if (existingStatus) existingStatus.remove();
    const existingHome = document.getElementById('ipad-home-indicator');
    if (existingHome) existingHome.remove();

    // iPad Status Bar (Clean iPadOS status bar with 9:41 time, wifi, and green 100 battery pill)
    const overlay = document.createElement('div');
    overlay.id = 'ipad-statusbar-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 38px;
      z-index: 9999999;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: ${dark || isSplash ? '#FFFFFF' : '#000000'};
      letter-spacing: -0.2px;
    `;

    // Left: Time (9:41)
    const time = document.createElement('div');
    time.textContent = '9:41';
    time.style.cssText = 'padding-left: 4px;';

    // Right: Wi-Fi + Green 100% Battery Pill (matching user reference)
    const rightGroup = document.createElement('div');
    rightGroup.style.cssText = 'display: flex; align-items: center; gap: 8px; padding-right: 4px;';
    rightGroup.innerHTML = `
      <svg width="17" height="13" viewBox="0 0 16 12" fill="${dark || isSplash ? '#FFFFFF' : '#000000'}">
        <path d="M8 2.5C10.5 2.5 12.8 3.5 14.5 5.2L16 3.7C13.9 1.6 11.1 0.5 8 0.5C4.9 0.5 2.1 1.6 0 3.7L1.5 5.2C3.2 3.5 5.5 2.5 8 2.5ZM8 6.5C9.5 6.5 10.9 7.1 12 8.1L13.5 6.6C12 5.1 10.1 4.5 8 4.5C5.9 4.5 4 5.1 2.5 6.6L4 8.1C5.1 7.1 6.5 6.5 8 6.5ZM8 10C8.8 10 9.5 10.7 9.5 11.5C9.5 12.3 8.8 13 8 13C7.2 13 6.5 12.3 6.5 11.5C6.5 10.7 7.2 10 8 10Z"/>
      </svg>
      <div style="background: #34C759; color: #FFFFFF; font-size: 11px; font-weight: 700; line-height: 1; padding: 2.5px 6.5px; border-radius: 9999px; letter-spacing: 0.1px;">
        100
      </div>
    `;

    overlay.appendChild(time);
    overlay.appendChild(rightGroup);
    document.body.appendChild(overlay);

    // Bottom Home Indicator (iPad Pro wide rounded bar)
    if (!isSplash) {
      const homeBar = document.createElement('div');
      homeBar.id = 'ipad-home-indicator';
      homeBar.style.cssText = `
        position: fixed;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 320px;
        height: 5px;
        background: ${dark ? '#FFFFFF' : '#000000'};
        opacity: 0.25;
        border-radius: 9999px;
        z-index: 9999999;
        pointer-events: none;
      `;
      document.body.appendChild(homeBar);
    }
  }, { dark, isSplash });
}

async function saveScreenshot(page, filename) {
  const p1 = path.join(OUT_DIR_PROJECT, filename);
  const p2 = path.join(OUT_DIR_APPSTORE_IPAD, filename);
  await page.screenshot({ path: p1 });
  fs.copyFileSync(p1, p2);
  console.log(`Saved screenshot: ${filename} (2064 x 2752 px)`);
}

async function run() {
  const server = await startServer(PORT);
  console.log(`Launching Headless Chrome for iPad 13-inch (2064x2752) on port ${PORT}...`);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1032,1376'
    ],
  });

  const page = await browser.newPage();
  await page.setViewport({
    width: 1032,
    height: 1376,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });

  // Setup pristine unlocked storage (no trial or pricing badges in App Store screenshots)
  await page.evaluateOnNewDocument(() => {
    localStorage.clear();
    sessionStorage.clear();

    localStorage.setItem('appblueprint_unlimited_unlocked_v2', 'true');
    localStorage.setItem('appblueprint_pro_unlocked_v1', 'true');
    localStorage.setItem('appblueprint_creations_ever_v2', '3');
    localStorage.setItem('appblueprint_free_project_claimed_v1', 'true');
    localStorage.setItem('appblueprint_fresh_brand_new_user_v29', 'true');
    localStorage.setItem('appblueprint_legal_agreed_v1', 'true');
    localStorage.setItem('launchready_legal_agreed_v1', 'true');

    const projects = [
      {
        id: 'proj-1',
        name: 'App Blueprint v1.0',
        color: '#3B82F6',
        createdAt: new Date().toISOString(),
        completedItemIds: [
          'p1-problem-solution', 
          'p1-scope-pruning', 
          'p4-keychain-keystore', 
          'p2-touch-targets', 
          'p2-safe-areas'
        ],
        isNameLocked: false,
      },
      {
        id: 'proj-2',
        name: 'Fitness Tracker Pro',
        color: '#8B5CF6',
        createdAt: new Date().toISOString(),
        completedItemIds: ['p1-problem-solution', 'p2-liquid-glass', 'p2-touch-targets'],
        isNameLocked: false,
      },
      {
        id: 'proj-3',
        name: 'SaaS Mobile Companion',
        color: '#10B981',
        createdAt: new Date().toISOString(),
        completedItemIds: ['p1-problem-solution', 'p4-schema-models', 'p4-privacy-manifest'],
        isNameLocked: false,
      }
    ];
    localStorage.setItem('appblueprint_projects_v1', JSON.stringify(projects));
    localStorage.setItem('appblueprint_active_proj_id_v1', 'proj-1');
  });

  // ==========================================
  // SCREENSHOT 1: Splash Screen
  // ==========================================
  console.log('\n--- 1. Capturing Splash Screen ---');
  await page.goto(`http://localhost:${PORT}/?mode=app&screenshot=1&splash=1`, { waitUntil: 'networkidle0' });
  await sleep(1000);
  await injectIPadChrome(page, { isSplash: true });
  await sleep(400);
  await saveScreenshot(page, 'ipad13_01_splash.png');

  // ==========================================
  // SCREENSHOT 2: Academy & Resources Page
  // ==========================================
  console.log('\n--- 2. Capturing Academy & Resources Page ---');
  await page.goto(`http://localhost:${PORT}/?mode=app&screenshot=1`, { waitUntil: 'networkidle0' });
  await sleep(1200);

  // Switch to Academy & Resources tab
  await page.evaluate(() => {
    const resourcesBtn = document.querySelector('button[aria-label="Academy and Resources"]');
    if (resourcesBtn) resourcesBtn.click();
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await sleep(800);
  await injectIPadChrome(page, { dark: false });
  await sleep(400);
  await saveScreenshot(page, 'ipad13_02_academy_resources.png');

  // ==========================================
  // SCREENSHOT 3: Checklist / Roadmap Page
  // ==========================================
  console.log('\n--- 3. Capturing Checklist / Roadmap Page ---');
  // Switch back to Checklist tab
  await page.evaluate(() => {
    const checklistBtn = document.querySelector('button[aria-label^="Checklist Progress"]');
    if (checklistBtn) checklistBtn.click();
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await sleep(800);
  await injectIPadChrome(page, { dark: false });
  await sleep(400);
  await saveScreenshot(page, 'ipad13_03_checklist_roadmap.png');

  // ==========================================
  // SCREENSHOT 4: Expanded Step Detail / AI Prompt View
  // ==========================================
  console.log('\n--- 4. Capturing Step Detail / AI Prompt View ---');
  // Expand Phase 1
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('expand-phase', { detail: 'phase-1' }));
  });
  await sleep(600);

  // Expand "Build Setup" requirement inside Phase 1
  await page.evaluate(() => {
    const buildSetupCard = document.querySelector('#p1-tech-stack .cursor-pointer');
    if (buildSetupCard) {
      buildSetupCard.click();
    }
  });
  await sleep(600);

  // Scroll so Build Setup aligns cleanly below status bar
  await page.evaluate(() => {
    const el = document.getElementById('p1-tech-stack');
    if (el) {
      const rect = el.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({ top: scrollTop + rect.top - 44, behavior: 'instant' });
    }
  });
  await sleep(500);
  await injectIPadChrome(page, { dark: false });
  await sleep(400);
  await saveScreenshot(page, 'ipad13_04_step_detail_prompt.png');

  // ==========================================
  // SCREENSHOT 5: Select Project / Switcher Page
  // ==========================================
  console.log('\n--- 5. Capturing Select Project Page ---');
  // Switch to Projects tab
  await page.evaluate(() => {
    const projectsBtn = document.querySelector('button[aria-label="Projects"]');
    if (projectsBtn) projectsBtn.click();
    window.scrollTo({ top: 0, behavior: 'instant' });
  });
  await sleep(800);
  await page.evaluate(() => {
    const restoreBtn = document.querySelector('button[title="Restore previously purchased items"]');
    if (restoreBtn) restoreBtn.style.display = 'none';
  });
  await injectIPadChrome(page, { dark: false });
  await sleep(400);
  await saveScreenshot(page, 'ipad13_05_select_project.png');

  await browser.close();
  server.close();
  console.log('\nAll 5 iPad 13-inch screenshots captured successfully!');
}

run().catch(err => {
  console.error('Screenshot generation failed:', err);
  process.exit(1);
});
