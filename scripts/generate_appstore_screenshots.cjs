const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const http = require('http');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DOCS_DIR = path.join(__dirname, '../docs');
const DIR_6_5 = path.join(__dirname, '../appstore_screenshots_6_5');
const DIR_6_9 = path.join(__dirname, '../appstore_screenshots_6_9');
const DIR_PUBLIC = path.join(__dirname, '../public/screenshots');
const DIR_DOCS = path.join(__dirname, '../docs/screenshots');

[DIR_6_5, DIR_6_9, DIR_PUBLIC, DIR_DOCS].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

// Simple static server for docs
function startServer(port = 3456) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.json': 'application/json',
    '.woff2': 'font/woff2'
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

// Injects iOS Status Bar & Dynamic Island
async function injectIOSChrome(page, isDark = false) {
  await page.evaluate((dark) => {
    // Remove web launcher bar if present
    document.querySelectorAll('.bg-slate-900.text-white.text-xs, [aria-label="Back to Website"]').forEach(el => {
      const topBar = el.closest('div.sticky.top-0');
      if (topBar) topBar.remove();
    });

    // Remove any existing overlay
    const existing = document.getElementById('ios-statusbar-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'ios-statusbar-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 54px;
      z-index: 99999;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 28px;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: ${dark ? '#FFFFFF' : '#000000'};
    `;

    // Left: Time 9:41
    const time = document.createElement('div');
    time.textContent = '9:41';
    time.style.cssText = 'letter-spacing: -0.2px; padding-left: 6px;';

    // Center: Dynamic Island
    const island = document.createElement('div');
    island.style.cssText = `
      position: absolute;
      left: 50%;
      top: 11px;
      transform: translateX(-50%);
      width: 126px;
      height: 36px;
      background: #000000;
      border-radius: 9999px;
    `;

    // Right: Cellular + WiFi + Battery Icons
    const rightGroup = document.createElement('div');
    rightGroup.style.cssText = 'display: flex; align-items: center; gap: 6px; padding-right: 4px;';
    rightGroup.innerHTML = `
      <svg width="18" height="12" viewBox="0 0 18 12" fill="${dark ? '#FFFFFF' : '#000000'}">
        <rect x="0" y="8" width="3" height="4" rx="1"/>
        <rect x="5" y="5.5" width="3" height="6.5" rx="1"/>
        <rect x="10" y="3" width="3" height="9" rx="1"/>
        <rect x="15" y="0.5" width="3" height="11.5" rx="1"/>
      </svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="${dark ? '#FFFFFF' : '#000000'}">
        <path d="M8 2.5C10.5 2.5 12.8 3.5 14.5 5.2L16 3.7C13.9 1.6 11.1 0.5 8 0.5C4.9 0.5 2.1 1.6 0 3.7L1.5 5.2C3.2 3.5 5.5 2.5 8 2.5ZM8 6.5C9.5 6.5 10.9 7.1 12 8.1L13.5 6.6C12 5.1 10.1 4.5 8 4.5C5.9 4.5 4 5.1 2.5 6.6L4 8.1C5.1 7.1 6.5 6.5 8 6.5ZM8 10C8.8 10 9.5 10.7 9.5 11.5C9.5 12.3 8.8 13 8 13C7.2 13 6.5 12.3 6.5 11.5C6.5 10.7 7.2 10 8 10Z"/>
      </svg>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
        <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="${dark ? '#FFFFFF' : '#000000'}" stroke-opacity="0.35"/>
        <rect x="2" y="2" width="18" height="8" rx="2" fill="${dark ? '#FFFFFF' : '#000000'}"/>
        <path d="M23 4C23.6 4.3 24 5.1 24 6C24 6.9 23.6 7.7 23 8V4Z" fill="${dark ? '#FFFFFF' : '#000000'}" fill-opacity="0.4"/>
      </svg>
    `;

    overlay.appendChild(time);
    overlay.appendChild(island);
    overlay.appendChild(rightGroup);
    document.body.appendChild(overlay);

    // Bottom Home Indicator
    let homeBar = document.getElementById('ios-home-indicator');
    if (!homeBar) {
      homeBar = document.createElement('div');
      homeBar.id = 'ios-home-indicator';
      homeBar.style.cssText = `
        position: fixed;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 140px;
        height: 5px;
        background: ${dark ? '#FFFFFF' : '#000000'};
        opacity: 0.3;
        border-radius: 9999px;
        z-index: 99999;
        pointer-events: none;
      `;
      document.body.appendChild(homeBar);
    }
  }, isDark);
}

async function captureScreenSet(browser, config) {
  const { name, width, height, scale, outDir } = config;
  console.log(`\n========================================`);
  console.log(`Capturing ${name} (${width * scale} x ${height * scale})...`);
  console.log(`========================================`);

  const page = await browser.newPage();
  await page.setViewport({
    width,
    height,
    deviceScaleFactor: scale,
    isMobile: true,
    hasTouch: true,
  });

  // Inject initial pre-set storage
  await page.evaluateOnNewDocument(() => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('appblueprint_legal_agreed_v1', 'true');
    localStorage.setItem('launchready_legal_agreed_v1', 'true');
    localStorage.setItem('appblueprint_visits_count', '5');

    // Multi-project mock setup
    const projects = [
      {
        id: 'proj-1',
        name: 'App Blueprint v1.0',
        color: '#3B82F6',
        createdAt: new Date().toISOString(),
        completedItemIds: [
          'p1-problem-solution', 'p1-scope-pruning', 'p1-target-audience',
          'p2-liquid-glass', 'p2-safe-areas', 'p2-haptics', 'p2-dark-mode',
          'p3-state-architecture', 'p3-deep-linking',
          'p4-keychain-keystore', 'p4-privacy-manifest', 'p4-network-security',
          'p5-cold-start', 'p5-memory-leaks',
          'p6-screenshots', 'p6-privacy-nutrition'
        ]
      },
      {
        id: 'proj-2',
        name: 'Fitness Tracker v1',
        color: '#8B5CF6',
        createdAt: new Date().toISOString(),
        completedItemIds: ['p1-problem-solution', 'p2-liquid-glass']
      },
      {
        id: 'proj-3',
        name: 'SaaS Mobile Companion',
        color: '#10B981',
        createdAt: new Date().toISOString(),
        completedItemIds: ['p1-problem-solution', 'p3-state-architecture']
      }
    ];

    localStorage.setItem('appblueprint_projects_v1', JSON.stringify(projects));
    localStorage.setItem('appblueprint_active_proj_id_v1', 'proj-1');
  });

  // Load app directly with #app
  await page.goto('http://localhost:3456/?mode=app#app', { waitUntil: 'networkidle0' });
  await sleep(1200); // Allow render & animation settle

  // 1. Production Checklist (Main Home)
  console.log(`[${name}] 1. Capturing 01_production_checklist...`);
  await injectIOSChrome(page, false);
  await sleep(400);
  const shot1 = path.join(outDir, '01_production_checklist.png');
  await page.screenshot({ path: shot1 });
  console.log(`Saved: ${shot1}`);

  // 2. Architecture & HIG Audit (Expanded Phase 2)
  console.log(`[${name}] 2. Capturing 02_architecture_audit...`);
  // Click on Phase 2 header
  const phase2Btn = await page.$('#phase-2-layout, #phase-2 > div > div:first-child');
  if (phase2Btn) {
    await phase2Btn.click();
    await sleep(600);
  }
  // Click on Liquid Glass item drawer
  const liquidCard = await page.$('#p2-liquid-glass .cursor-pointer');
  if (liquidCard) {
    await liquidCard.click();
    await sleep(600);
  }
  await injectIOSChrome(page, false);
  await sleep(300);
  const shot2 = path.join(outDir, '02_architecture_audit.png');
  await page.screenshot({ path: shot2 });
  console.log(`Saved: ${shot2}`);

  // 3. Multi-Project Manager
  console.log(`[${name}] 3. Capturing 03_projects_manager...`);
  const projectsTab = await page.$('button[aria-label="Projects"]');
  if (projectsTab) {
    await projectsTab.click();
    await sleep(700);
  }
  await injectIOSChrome(page, false);
  await sleep(300);
  const shot3 = path.join(outDir, '03_projects_manager.png');
  await page.screenshot({ path: shot3 });
  console.log(`Saved: ${shot3}`);

  // 4. App Launch Academy & Resources
  console.log(`[${name}] 4. Capturing 04_app_launch_academy...`);
  const resourcesTab = await page.$('button[aria-label="Academy and Resources"]');
  if (resourcesTab) {
    await resourcesTab.click();
    await sleep(700);
  }
  await injectIOSChrome(page, false);
  await sleep(300);
  const shot4 = path.join(outDir, '04_app_launch_academy.png');
  await page.screenshot({ path: shot4 });
  console.log(`Saved: ${shot4}`);

  // 5. Config Generators & Store Manifest
  console.log(`[${name}] 5. Capturing 05_config_generators...`);
  // In Resources tab, scroll to and open Config Generators or Typography
  const configSection = await page.$('button ::-p-text(Config Generators)');
  if (configSection) {
    await configSection.click();
    await sleep(600);
  } else {
    // If not found, open Typography & Font Systems
    const typoSection = await page.$('button ::-p-text(Typography & Font Systems)');
    if (typoSection) {
      await typoSection.click();
      await sleep(600);
    }
  }
  await injectIOSChrome(page, false);
  await sleep(300);
  const shot5 = path.join(outDir, '05_config_generators.png');
  await page.screenshot({ path: shot5 });
  console.log(`Saved: ${shot5}`);

  await page.close();
}

async function run() {
  console.log('Starting local preview server...');
  const server = await startServer(3456);

  console.log('Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  // 1. Generate 6.9" Display (iPhone 16 Pro Max: 1320 x 2868)
  await captureScreenSet(browser, {
    name: 'iPhone 6.9" Display',
    width: 440,
    height: 956,
    scale: 3,
    outDir: DIR_6_9,
  });

  // 2. Generate 6.5" Display (iPhone 14 Plus / 13 Pro Max: 1284 x 2778)
  await captureScreenSet(browser, {
    name: 'iPhone 6.5" Display',
    width: 428,
    height: 926,
    scale: 3,
    outDir: DIR_6_5,
  });

  await browser.close();
  server.close();

  // Copy to public/screenshots and docs/screenshots for website
  console.log('\nSyncing to public/screenshots and docs/screenshots...');
  const files = [
    { src: '01_production_checklist.png', dest: '01_welcome.png' },
    { src: '01_production_checklist.png', dest: '02_production_checklist.png' },
    { src: '03_projects_manager.png', dest: '03_interactive_roadmap.png' },
    { src: '04_app_launch_academy.png', dest: '04_app_launch_academy.png' },
    { src: '02_architecture_audit.png', dest: '05_production_playbook.png' },
  ];

  files.forEach(f => {
    const srcPath = path.join(DIR_6_5, f.src);
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, path.join(DIR_PUBLIC, f.dest));
      fs.copyFileSync(srcPath, path.join(DIR_DOCS, f.dest));
    }
  });

  console.log('All screenshots generated and verified successfully!');
}

run().catch((err) => {
  console.error('Fatal error generating screenshots:', err);
  process.exit(1);
});
