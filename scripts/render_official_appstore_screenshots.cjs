const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { execSync } = require('child_process');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DOCS_DIR = path.join(__dirname, '../docs');
const RAW_CACHE_DIR = path.join(__dirname, 'raw_captures');
const FRAMED_DEV_DIR = path.join(__dirname, '../appstore_screenshots_framed_devices');
const DIR_6_9 = path.join(__dirname, '../appstore_screenshots_6_9');
const DIR_IPAD = path.join(__dirname, '../appstore_screenshots_ipad');
const DIR_PUBLIC = path.join(__dirname, '../public/screenshots');
const DIR_DOCS = path.join(__dirname, '../docs/screenshots');

[RAW_CACHE_DIR, FRAMED_DEV_DIR, DIR_6_9, DIR_IPAD, DIR_PUBLIC, DIR_DOCS].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

function startServer(port = 3495) {
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

// 72% completed checklist items
let completedList = [];
try {
  completedList = JSON.parse(fs.readFileSync(path.join(__dirname, 'completed_72_ids.json'), 'utf8'));
} catch (e) {
  completedList = [];
}

// Injects iPhone status bar with 9:41 (center is left clear for official bezel Dynamic Island)
async function injectCleanIPhoneStatus(page, isScrolled = false) {
  await page.evaluate(({ scrolled }) => {
    // Hide website header launcher
    document.querySelectorAll('.bg-slate-900.text-white.text-xs, [aria-label="Back to Website"]').forEach(el => {
      const topBar = el.closest('div.sticky.top-0');
      if (topBar) topBar.style.display = 'none';
    });

    let styleTag = document.getElementById('ios-safe-area-style');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'ios-safe-area-style';
      styleTag.innerHTML = `
        .min-h-screen {
          padding-top: 56px !important;
          padding-bottom: 34px !important;
        }
      `;
      document.head.appendChild(styleTag);
    }

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
      padding: 0 30px;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
      font-size: 16px;
      font-weight: 600;
      color: #000000;
      ${scrolled ? 'background: rgba(250, 248, 246, 0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(0, 0, 0, 0.05);' : ''}
    `;

    // Left: 9:41
    const time = document.createElement('div');
    time.textContent = '9:41';
    time.style.cssText = 'letter-spacing: -0.3px; padding-left: 6px;';

    // Right: Signal, WiFi, Battery
    const rightGroup = document.createElement('div');
    rightGroup.style.cssText = 'display: flex; align-items: center; gap: 6px; padding-right: 4px;';
    rightGroup.innerHTML = `
      <svg width="18" height="12" viewBox="0 0 18 12" fill="#000000">
        <rect x="0" y="8" width="3" height="4" rx="1"/>
        <rect x="5" y="5.5" width="3" height="6.5" rx="1"/>
        <rect x="10" y="3" width="3" height="9" rx="1"/>
        <rect x="15" y="0.5" width="3" height="11.5" rx="1"/>
      </svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="#000000">
        <path d="M8 2.5C10.5 2.5 12.8 3.5 14.5 5.2L16 3.7C13.9 1.6 11.1 0.5 8 0.5C4.9 0.5 2.1 1.6 0 3.7L1.5 5.2C3.2 3.5 5.5 2.5 8 2.5ZM8 6.5C9.5 6.5 10.9 7.1 12 8.1L13.5 6.6C12 5.1 10.1 4.5 8 4.5C5.9 4.5 4 5.1 2.5 6.6L4 8.1C5.1 7.1 6.5 6.5 8 6.5ZM8 10C8.8 10 9.5 10.7 9.5 11.5C9.5 12.3 8.8 13 8 13C7.2 13 6.5 12.3 6.5 11.5C6.5 10.7 7.2 10 8 10Z"/>
      </svg>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
        <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#000000" stroke-opacity="0.35"/>
        <rect x="2" y="2" width="18" height="8" rx="2" fill="#000000"/>
        <path d="M23 4C23.6 4.3 24 5.1 24 6C24 6.9 23.6 7.7 23 8V4Z" fill="#000000" fill-opacity="0.4"/>
      </svg>
    `;

    overlay.appendChild(time);
    overlay.appendChild(rightGroup);
    document.body.appendChild(overlay);

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
        background: #000000;
        opacity: 0.3;
        border-radius: 9999px;
        z-index: 99999;
        pointer-events: none;
      `;
      document.body.appendChild(homeBar);
    }
  }, { scrolled: isScrolled });
}

// Injects iPad status bar
async function injectCleanIPadStatus(page, isScrolled = false) {
  await page.evaluate(({ scrolled }) => {
    document.querySelectorAll('.bg-slate-900.text-white.text-xs, [aria-label="Back to Website"]').forEach(el => {
      const topBar = el.closest('div.sticky.top-0');
      if (topBar) topBar.style.display = 'none';
    });

    let styleTag = document.getElementById('ipad-safe-area-style');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'ipad-safe-area-style';
      styleTag.innerHTML = `
        .min-h-screen {
          padding-top: 48px !important;
          padding-bottom: 28px !important;
        }
      `;
      document.head.appendChild(styleTag);
    }

    const existing = document.getElementById('ipad-statusbar-overlay');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'ipad-statusbar-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 44px;
      z-index: 99999;
      pointer-events: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 32px;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: #000000;
      ${scrolled ? 'background: rgba(250, 248, 246, 0.95); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(0, 0, 0, 0.05);' : ''}
    `;

    const leftGroup = document.createElement('div');
    leftGroup.textContent = '9:41 AM  Tue Sep 23';
    leftGroup.style.cssText = 'letter-spacing: -0.2px; font-size: 14px; font-weight: 600;';

    const rightGroup = document.createElement('div');
    rightGroup.style.cssText = 'display: flex; align-items: center; gap: 8px;';
    rightGroup.innerHTML = `
      <svg width="18" height="12" viewBox="0 0 18 12" fill="#000000">
        <rect x="0" y="8" width="3" height="4" rx="1"/>
        <rect x="5" y="5.5" width="3" height="6.5" rx="1"/>
        <rect x="10" y="3" width="3" height="9" rx="1"/>
        <rect x="15" y="0.5" width="3" height="11.5" rx="1"/>
      </svg>
      <svg width="16" height="12" viewBox="0 0 16 12" fill="#000000">
        <path d="M8 2.5C10.5 2.5 12.8 3.5 14.5 5.2L16 3.7C13.9 1.6 11.1 0.5 8 0.5C4.9 0.5 2.1 1.6 0 3.7L1.5 5.2C3.2 3.5 5.5 2.5 8 2.5ZM8 6.5C9.5 6.5 10.9 7.1 12 8.1L13.5 6.6C12 5.1 10.1 4.5 8 4.5C5.9 4.5 4 5.1 2.5 6.6L4 8.1C5.1 7.1 6.5 6.5 8 6.5ZM8 10C8.8 10 9.5 10.7 9.5 11.5C9.5 12.3 8.8 13 8 13C7.2 13 6.5 12.3 6.5 11.5C6.5 10.7 7.2 10 8 10Z"/>
      </svg>
      <span style="font-size: 13px; font-weight: 600; margin-left: 2px;">100%</span>
      <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
        <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#000000" stroke-opacity="0.35"/>
        <rect x="2" y="2" width="18" height="8" rx="2" fill="#000000"/>
        <path d="M23 4C23.6 4.3 24 5.1 24 6C24 6.9 23.6 7.7 23 8V4Z" fill="#000000" fill-opacity="0.4"/>
      </svg>
    `;

    overlay.appendChild(leftGroup);
    overlay.appendChild(rightGroup);
    document.body.appendChild(overlay);

    let homeBar = document.getElementById('ipad-home-indicator');
    if (!homeBar) {
      homeBar = document.createElement('div');
      homeBar.id = 'ipad-home-indicator';
      homeBar.style.cssText = `
        position: fixed;
        bottom: 8px;
        left: 50%;
        transform: translateX(-50%);
        width: 220px;
        height: 5px;
        background: #000000;
        opacity: 0.25;
        border-radius: 9999px;
        z-index: 99999;
        pointer-events: none;
      `;
      document.body.appendChild(homeBar);
    }
  }, { scrolled: isScrolled });
}

// 5 Curated Screens
const SCREENS = [
  {
    id: '01_production_checklist',
    badge: 'PRODUCTION READINESS',
    badgeColor: '#60A5FA', // Blue
    accentGlow: 'rgba(59, 130, 246, 0.28)',
    title: 'From Prototype to App Store',
    subtitle: 'Track 62+ Apple review guardrails, HIG compliance & submission steps'
  },
  {
    id: '02_architecture_audit',
    badge: 'APPLE HIG & LIQUID GLASS',
    badgeColor: '#818CF8', // Indigo
    accentGlow: 'rgba(99, 102, 241, 0.30)',
    title: 'Spatial Design & Fluid Physics',
    subtitle: 'Audit 44pt touch targets, spring mechanics & safe area clearances'
  },
  {
    id: '03_projects_manager',
    badge: 'MULTI-PROJECT WORKSPACE',
    badgeColor: '#34D399', // Emerald
    accentGlow: 'rgba(16, 185, 129, 0.28)',
    title: 'Manage All Your App Builds',
    subtitle: 'Seamlessly switch between iOS MVPs, companion apps & client releases'
  },
  {
    id: '04_app_launch_academy',
    badge: 'CURATED LAUNCH ACADEMY',
    badgeColor: '#C084FC', // Purple
    accentGlow: 'rgba(168, 85, 247, 0.28)',
    title: 'Avoid Costly App Rejections',
    subtitle: 'Battle-tested checklists, Apple guidelines & developer tools in one place'
  },
  {
    id: '05_config_generators',
    badge: 'AI AGENT DIRECTIVES',
    badgeColor: '#FBBF24', // Amber
    accentGlow: 'rgba(245, 158, 11, 0.28)',
    title: 'Supercharge AI Coding Agents',
    subtitle: 'One-tap directives for Google Antigravity, Claude Code & Cursor'
  }
];

async function captureRawScreens(browser, isIpad = false) {
  const prefix = isIpad ? 'ipad' : 'iphone';
  const page = await browser.newPage();

  if (isIpad) {
    // 1032 x 1376 @ 2x = 2064 x 2752 (Exact 13" iPad Pro resolution)
    await page.setViewport({ width: 1032, height: 1376, deviceScaleFactor: 2, isMobile: false, hasTouch: true });
  } else {
    // 440 x 956 @ 3x = 1320 x 2868 (Exact iPhone 18 Pro Max / 6.9" resolution)
    await page.setViewport({ width: 440, height: 956, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  }

  // Pre-seed storage
  const listLiteral = JSON.stringify(completedList);
  await page.evaluateOnNewDocument((listRaw) => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('appblueprint_legal_agreed_v1', 'true');
    localStorage.setItem('launchready_legal_agreed_v1', 'true');
    localStorage.setItem('appblueprint_visits_count', '5');

    const completedItems = JSON.parse(listRaw);
    const projects = [
      {
        id: 'proj-1',
        name: 'App Blueprint v1.0',
        color: '#3B82F6',
        createdAt: new Date().toISOString(),
        completedItemIds: completedItems
      },
      {
        id: 'proj-2',
        name: 'Fitness Tracker Pro',
        color: '#8B5CF6',
        createdAt: new Date().toISOString(),
        completedItemIds: ['p1-problem-solution', 'p2-liquid-glass', 'p2-touch-targets']
      },
      {
        id: 'proj-3',
        name: 'SaaS Mobile Companion',
        color: '#10B981',
        createdAt: new Date().toISOString(),
        completedItemIds: ['p1-problem-solution', 'p4-schema-models', 'p4-privacy-manifest']
      }
    ];

    localStorage.setItem('appblueprint_projects_v1', JSON.stringify(projects));
    localStorage.setItem('appblueprint_active_proj_id_v1', 'proj-1');
  }, listLiteral);

  await page.goto('http://localhost:3495/?mode=app#app', { waitUntil: 'networkidle0' });
  await sleep(3500);

  const injectChrome = isIpad ? injectCleanIPadStatus : injectCleanIPhoneStatus;

  for (let i = 0; i < SCREENS.length; i++) {
    const screen = SCREENS[i];
    console.log(`[${prefix}] Capturing Screen ${i + 1}/5: ${screen.id}...`);

    if (i === 0) {
      // 1. Production Checklist
      await page.evaluate(() => window.scrollTo(0, 0));
      await injectChrome(page, false);
      await sleep(600);
    } else if (i === 1) {
      // 2. Architecture & HIG Audit
      await page.evaluate(() => {
        window.scrollTo(0, 0);
        const step3Header = document.querySelector('#phase-3 .cursor-pointer');
        if (step3Header) step3Header.click();
      });
      await sleep(600);

      await page.evaluate(() => {
        const prevItem = document.getElementById('p2-design-inspiration');
        if (prevItem) prevItem.style.display = 'none';

        const lgHeader = document.querySelector('#p2-liquid-glass .cursor-pointer');
        if (lgHeader) lgHeader.click();
      });
      await sleep(600);

      await page.evaluate(({ ipad }) => {
        const el = document.getElementById('phase-3');
        if (el) {
          const rect = el.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const offset = ipad ? 50 : 60;
          window.scrollTo({ top: scrollTop + rect.top - offset, behavior: 'instant' });
        }
      }, { ipad: isIpad });
      await injectChrome(page, true);
      await sleep(500);
    } else if (i === 2) {
      // 3. Multi-Project Manager
      await page.evaluate(() => {
        window.scrollTo(0, 0);
        const projectsTab = document.querySelector('button[aria-label="Projects"]');
        if (projectsTab) projectsTab.click();
      });
      await sleep(700);
      await injectChrome(page, false);
      await sleep(500);
    } else if (i === 3) {
      // 4. App Launch Academy & Resources
      await page.evaluate(() => {
        window.scrollTo(0, 0);
        const resourcesTab = document.querySelector('button[aria-label="Academy and Resources"]');
        if (resourcesTab) resourcesTab.click();
      });
      await sleep(700);
      await injectChrome(page, false);
      await sleep(500);
    } else if (i === 4) {
      // 5. Config Generators & Prompts
      await page.evaluate(() => {
        const aiSec = document.querySelector('#ai_models .cursor-pointer');
        if (aiSec) aiSec.click();
      });
      await sleep(600);

      await page.evaluate(() => {
        const cursorHeader = document.querySelector('#ai-cursor .cursor-pointer');
        if (cursorHeader) cursorHeader.click();
      });
      await sleep(600);

      await page.evaluate(({ ipad }) => {
        const el = document.getElementById('ai-cursor');
        if (el) {
          const rect = el.getBoundingClientRect();
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          const offset = ipad ? 50 : 60;
          window.scrollTo({ top: scrollTop + rect.top - offset, behavior: 'instant' });
        }
      }, { ipad: isIpad });
      await injectChrome(page, true);
      await sleep(500);
    }

    const rawPath = path.join(RAW_CACHE_DIR, `raw_${prefix}_${screen.id}.png`);
    await page.screenshot({ path: rawPath });
    console.log(`Saved raw capture: ${rawPath}`);
  }

  await page.close();
}

// Composite raw screen into official Apple bezel using python
function compositeIntoOfficialBezel(isIpad = false) {
  const prefix = isIpad ? 'ipad' : 'iphone';
  const devType = isIpad ? 'ipad' : 'iphone';
  const outDevDir = path.join(FRAMED_DEV_DIR, isIpad ? 'ipad_13' : 'iphone_18');
  if (!fs.existsSync(outDevDir)) fs.mkdirSync(outDevDir, { recursive: true });

  console.log(`\nCompositing official Apple ${devType} bezels...`);

  for (const screen of SCREENS) {
    const rawPath = path.join(RAW_CACHE_DIR, `raw_${prefix}_${screen.id}.png`);
    const framedDevPath = path.join(outDevDir, `${screen.id}.png`);
    const cmd = `python3 "${path.join(__dirname, 'composite_device.py')}" "${rawPath}" "${devType}" "${framedDevPath}"`;
    execSync(cmd, { stdio: 'inherit' });
  }
}

// Render final App Store marketing posters with official Apple typography and framed devices
async function renderMarketingPosters(browser, isIpad = false) {
  const prefix = isIpad ? 'ipad' : 'iphone';
  const outDir = isIpad ? DIR_IPAD : DIR_6_9;
  const canvasWidth = isIpad ? 2064 : 1320;
  const canvasHeight = isIpad ? 2752 : 2868;
  const devDir = path.join(FRAMED_DEV_DIR, isIpad ? 'ipad_13' : 'iphone_18');

  console.log(`\nRendering App Store marketing posters for ${isIpad ? '13" iPad Pro' : 'iPhone 18 Pro Max'} (${canvasWidth}x${canvasHeight})...`);

  const page = await browser.newPage();
  await page.setViewport({ width: canvasWidth, height: canvasHeight, deviceScaleFactor: 1 });

  for (let i = 0; i < SCREENS.length; i++) {
    const screen = SCREENS[i];
    const framedDevPath = path.join(devDir, `${screen.id}.png`);
    const framedData = fs.readFileSync(framedDevPath).toString('base64');
    const framedSrc = `data:image/png;base64,${framedData}`;

    let html = '';
    if (!isIpad) {
      // iPhone 18 Pro Max (1320 x 2868)
      html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1320px;
      height: 2868px;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro", "Helvetica Neue", sans-serif;
      background: radial-gradient(110% 70% at 50% 10%, ${screen.accentGlow} 0%, rgba(8, 12, 18, 0) 70%),
                  linear-gradient(180deg, #090C12 0%, #030508 100%);
      color: #FFFFFF;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      -webkit-font-smoothing: antialiased;
    }
    .ambient-glow {
      position: absolute;
      top: -160px;
      left: 50%;
      transform: translateX(-50%);
      width: 1200px;
      height: 750px;
      background: radial-gradient(circle, ${screen.accentGlow} 0%, transparent 65%);
      filter: blur(80px);
      pointer-events: none;
      z-index: 1;
    }
    .header-container {
      position: relative;
      z-index: 10;
      width: 100%;
      padding: 95px 70px 0 70px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      height: 46px;
      padding: 0 24px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.16);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.3);
      font-size: 19px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: ${screen.badgeColor};
    }
    .badge-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: ${screen.badgeColor};
      box-shadow: 0 0 12px ${screen.badgeColor};
    }
    .title {
      margin-top: 24px;
      font-size: 72px;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.1;
      color: #FFFFFF;
      text-shadow: 0 4px 24px rgba(0, 0, 0, 0.6);
      max-width: 1180px;
    }
    .subtitle {
      margin-top: 16px;
      font-size: 33px;
      font-weight: 500;
      letter-spacing: -0.015em;
      line-height: 1.35;
      color: #94A3B8;
      max-width: 1080px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }
    .device-container {
      position: absolute;
      top: 570px;
      left: 50%;
      transform: translateX(-50%);
      width: 1180px;
      z-index: 10;
      filter: drop-shadow(0 45px 75px rgba(0, 0, 0, 0.95)) drop-shadow(0 15px 25px rgba(0, 0, 0, 0.7));
    }
    .device-img {
      width: 100%;
      height: auto;
      display: block;
    }
  </style>
</head>
<body>
  <div class="ambient-glow"></div>
  <div class="header-container">
    <div class="badge">
      <span class="badge-dot"></span>
      ${screen.badge}
    </div>
    <h1 class="title">${screen.title}</h1>
    <p class="subtitle">${screen.subtitle}</p>
  </div>
  <div class="device-container">
    <img class="device-img" src="${framedSrc}" />
  </div>
</body>
</html>
      `;
    } else {
      // 13" iPad Pro (2064 x 2752)
      html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 2064px;
      height: 2752px;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro", "Helvetica Neue", sans-serif;
      background: radial-gradient(110% 70% at 50% 10%, ${screen.accentGlow} 0%, rgba(8, 12, 18, 0) 70%),
                  linear-gradient(180deg, #090C12 0%, #030508 100%);
      color: #FFFFFF;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      -webkit-font-smoothing: antialiased;
    }
    .ambient-glow {
      position: absolute;
      top: -200px;
      left: 50%;
      transform: translateX(-50%);
      width: 1800px;
      height: 900px;
      background: radial-gradient(circle, ${screen.accentGlow} 0%, transparent 65%);
      filter: blur(100px);
      pointer-events: none;
      z-index: 1;
    }
    .header-container {
      position: relative;
      z-index: 10;
      width: 100%;
      padding: 105px 100px 0 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      height: 54px;
      padding: 0 30px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.16);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.3);
      font-size: 23px;
      font-weight: 700;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      color: ${screen.badgeColor};
    }
    .badge-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: ${screen.badgeColor};
      box-shadow: 0 0 14px ${screen.badgeColor};
    }
    .title {
      margin-top: 26px;
      font-size: 90px;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.1;
      color: #FFFFFF;
      text-shadow: 0 4px 24px rgba(0, 0, 0, 0.6);
      max-width: 1750px;
    }
    .subtitle {
      margin-top: 18px;
      font-size: 38px;
      font-weight: 500;
      letter-spacing: -0.015em;
      line-height: 1.35;
      color: #94A3B8;
      max-width: 1550px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }
    .device-container {
      position: absolute;
      top: 540px;
      left: 50%;
      transform: translateX(-50%);
      width: 1760px;
      z-index: 10;
      filter: drop-shadow(0 45px 85px rgba(0, 0, 0, 0.95)) drop-shadow(0 15px 30px rgba(0, 0, 0, 0.7));
    }
    .device-img {
      width: 100%;
      height: auto;
      display: block;
    }
  </style>
</head>
<body>
  <div class="ambient-glow"></div>
  <div class="header-container">
    <div class="badge">
      <span class="badge-dot"></span>
      ${screen.badge}
    </div>
    <h1 class="title">${screen.title}</h1>
    <p class="subtitle">${screen.subtitle}</p>
  </div>
  <div class="device-container">
    <img class="device-img" src="${framedSrc}" />
  </div>
</body>
</html>
      `;
    }

    await page.setContent(html, { waitUntil: 'load' });
    await sleep(400);

    const outPath = path.join(outDir, `${screen.id}.png`);
    await page.screenshot({ path: outPath, type: 'png' });
    console.log(`Saved App Store poster: ${outPath}`);

    // If iPhone, also mirror to public & docs screenshots
    if (!isIpad) {
      fs.copyFileSync(outPath, path.join(DIR_PUBLIC, `${screen.id}.png`));
      fs.copyFileSync(outPath, path.join(DIR_DOCS, `${screen.id}.png`));
    }
  }

  await page.close();
}

async function main() {
  console.log('Starting local server for clean UI capture...');
  const server = await startServer(3495);

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--font-render-hinting=none']
  });

  try {
    // 1. Capture raw screens for iPhone & iPad
    await captureRawScreens(browser, false); // iPhone 18 Pro Max
    await captureRawScreens(browser, true);  // 13" iPad Pro

    // 2. Composite raw captures into official Apple Bezel PNGs
    compositeIntoOfficialBezel(false); // iPhone
    compositeIntoOfficialBezel(true);  // iPad

    // 3. Render final marketing posters
    await renderMarketingPosters(browser, false); // iPhone
    await renderMarketingPosters(browser, true);  // iPad

    console.log('\nAll official App Store screenshots successfully generated!');
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
