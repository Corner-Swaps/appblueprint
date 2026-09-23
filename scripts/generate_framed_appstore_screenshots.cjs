const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const http = require('http');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const DOCS_DIR = path.join(__dirname, '../docs');
const DIR_6_9 = path.join(__dirname, '../appstore_screenshots_6_9');
const DIR_IPAD = path.join(__dirname, '../appstore_screenshots_ipad');
const CACHE_DIR = path.join(__dirname, '.screenshot_cache');

[DIR_6_9, DIR_IPAD, CACHE_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

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

// Read the curated list of completed item IDs for 72% overall completion
let completedList = [];
try {
  completedList = JSON.parse(fs.readFileSync(path.join(__dirname, 'completed_72_ids.json'), 'utf8'));
} catch (e) {
  completedList = [
    'setup-model', 'setup-developer-accounts', 'setup-xcode-android-studio', 'setup-github-repo', 'setup-connect-phone', 'setup-typescript-swift', 'setup-agent-commands', 'setup-clear-caches',
    'p1-problem-solution', 'p1-scope-pruning', 'p1-tech-stack', 'p1-developer-accounts', 'p1-monetization-model', 'p1-duns-organization', 'p1-bundle-id-naming',
    'p2-screen-inventory', 'p2-screen-anatomy', 'p2-spatial-grid', 'p2-nav-hierarchy', 'p2-touch-targets', 'p2-safe-areas', 'p2-dynamic-type', 'p2-dark-mode', 'p2-app-icon', 'p2-launch-splash',
    'p4-schema-models', 'p4-local-persistence', 'p4-state-restoration', 'p4-privacy-manifest', 'p4-keychain-keystore', 'p4-transit-security',
    'p3-offline-sync', 'p3-network-resilience', 'p3-sign-in-apple', 'p3-haptic-feedback', 'p4-permissions-hygiene', 'p4-privacy-logging', 'p5-cold-start', 'p5-memory-leaks',
    'p6-screenshots', 'p6-privacy-nutrition', 'p6-export-compliance', 'p7-testflight-internal'
  ];
}

// Injects iPhone status bar with 9:41, Dynamic Island, and Home Indicator
async function injectIPhoneChrome(page, isScrolled = false) {
  await page.evaluate(({ scrolled }) => {
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
          padding-top: 58px !important;
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
      padding: 0 28px;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif;
      font-size: 15px;
      font-weight: 600;
      color: #000000;
      ${scrolled ? 'background: rgba(250, 248, 246, 0.94); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(0, 0, 0, 0.05);' : ''}
    `;

    const time = document.createElement('div');
    time.textContent = '9:41';
    time.style.cssText = 'letter-spacing: -0.2px; padding-left: 6px;';

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
    overlay.appendChild(island);
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

// Injects iPad status bar (no Dynamic Island, wide spacing, iPadOS 9:41)
async function injectIPadChrome(page, isScrolled = false) {
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
          padding-top: 44px !important;
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
      height: 42px;
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
      ${scrolled ? 'background: rgba(250, 248, 246, 0.94); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(0, 0, 0, 0.05);' : ''}
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

// Screen titles and marketing subtitles
const SCREENS = [
  {
    id: '01_production_checklist',
    badge: 'PRODUCTION READINESS',
    badgeColor: '#60A5FA', // Blue
    accentGlow: 'rgba(59, 130, 246, 0.22)',
    title: 'From Prototype to App Store',
    subtitle: 'Track 62+ Apple review guardrails, HIG compliance & submission steps'
  },
  {
    id: '02_architecture_audit',
    badge: 'APPLE HIG & LIQUID GLASS',
    badgeColor: '#818CF8', // Indigo
    accentGlow: 'rgba(99, 102, 241, 0.24)',
    title: 'Spatial Design & Fluid Physics',
    subtitle: 'Audit 44pt touch targets, spring mechanics & safe area clearances'
  },
  {
    id: '03_projects_manager',
    badge: 'MULTI-PROJECT WORKSPACE',
    badgeColor: '#34D399', // Emerald
    accentGlow: 'rgba(16, 185, 129, 0.22)',
    title: 'Manage All Your App Builds',
    subtitle: 'Seamlessly switch between iOS MVPs, companion apps & client releases'
  },
  {
    id: '04_app_launch_academy',
    badge: 'CURATED LAUNCH ACADEMY',
    badgeColor: '#C084FC', // Purple
    accentGlow: 'rgba(168, 85, 247, 0.22)',
    title: 'Avoid Costly App Rejections',
    subtitle: 'Battle-tested checklists, Apple guidelines & developer tools in one place'
  },
  {
    id: '05_config_generators',
    badge: 'AI AGENT DIRECTIVES',
    badgeColor: '#FBBF24', // Amber
    accentGlow: 'rgba(245, 158, 11, 0.22)',
    title: 'Supercharge AI Coding Agents',
    subtitle: 'One-tap directives for Google Antigravity, Claude Code & Cursor'
  }
];

// Captures raw app screens for a device type
async function captureRawScreens(browser, isIpad = false) {
  const prefix = isIpad ? 'raw_ipad' : 'raw_iphone';
  console.log(`\n========================================`);
  console.log(`Capturing Raw App Screens for ${isIpad ? 'iPad' : 'iPhone'}...`);
  console.log(`========================================`);

  const page = await browser.newPage();
  
  if (isIpad) {
    // iPad 13" aspect ratio: 960 x 1280 @ 2x
    await page.setViewport({
      width: 960,
      height: 1280,
      deviceScaleFactor: 2,
      isMobile: false,
      hasTouch: true,
    });
  } else {
    // iPhone 6.9": 440 x 956 @ 3x
    await page.setViewport({
      width: 440,
      height: 956,
      deviceScaleFactor: 3,
      isMobile: true,
      hasTouch: true,
    });
  }

  // Pre-seed storage
  await page.evaluateOnNewDocument((completedItems) => {
    localStorage.clear();
    sessionStorage.clear();
    localStorage.setItem('appblueprint_legal_agreed_v1', 'true');
    localStorage.setItem('launchready_legal_agreed_v1', 'true');
    localStorage.setItem('appblueprint_visits_count', '5');

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
  }, completedList);

  await page.goto('http://localhost:3456/?mode=app#app', { waitUntil: 'networkidle0' });
  await sleep(3500);

  const injectChrome = isIpad ? injectIPadChrome : injectIPhoneChrome;

  // 1. Production Checklist
  console.log(`[${prefix}] 1. Capturing 01_production_checklist...`);
  await page.evaluate(() => window.scrollTo(0, 0));
  await injectChrome(page, false);
  await sleep(500);
  const raw1 = path.join(CACHE_DIR, `${prefix}_01.png`);
  await page.screenshot({ path: raw1 });

  // 2. Architecture & HIG Audit
  console.log(`[${prefix}] 2. Capturing 02_architecture_audit...`);
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
      const offset = ipad ? 50 : 62;
      window.scrollTo({ top: scrollTop + rect.top - offset, behavior: 'instant' });
    }
  }, { ipad: isIpad });
  await injectChrome(page, true);
  await sleep(400);
  const raw2 = path.join(CACHE_DIR, `${prefix}_02.png`);
  await page.screenshot({ path: raw2 });

  await page.evaluate(() => {
    const prevItem = document.getElementById('p2-design-inspiration');
    if (prevItem) prevItem.style.display = '';
  });

  // 3. Multi-Project Manager
  console.log(`[${prefix}] 3. Capturing 03_projects_manager...`);
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    const projectsTab = document.querySelector('button[aria-label="Projects"]');
    if (projectsTab) projectsTab.click();
  });
  await sleep(700);
  await injectChrome(page, false);
  await sleep(400);
  const raw3 = path.join(CACHE_DIR, `${prefix}_03.png`);
  await page.screenshot({ path: raw3 });

  // 4. App Launch Academy & Resources
  console.log(`[${prefix}] 4. Capturing 04_app_launch_academy...`);
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    const resourcesTab = document.querySelector('button[aria-label="Academy and Resources"]');
    if (resourcesTab) resourcesTab.click();
  });
  await sleep(700);
  await injectChrome(page, false);
  await sleep(400);
  const raw4 = path.join(CACHE_DIR, `${prefix}_04.png`);
  await page.screenshot({ path: raw4 });

  // 5. Config Generators & Prompts
  console.log(`[${prefix}] 5. Capturing 05_config_generators...`);
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
      const offset = ipad ? 50 : 62;
      window.scrollTo({ top: scrollTop + rect.top - offset, behavior: 'instant' });
    }
  }, { ipad: isIpad });
  await injectChrome(page, true);
  await sleep(400);
  const raw5 = path.join(CACHE_DIR, `${prefix}_05.png`);
  await page.screenshot({ path: raw5 });

  await page.close();
}

// Generate framed marketing screenshot using an HTML canvas template
async function compositeFramedScreenshot(browser, config) {
  const {
    isIpad,
    screen,
    rawImagePath,
    outPath
  } = config;

  const canvasWidth = isIpad ? 2064 : 1320;
  const canvasHeight = isIpad ? 2752 : 2868;

  // Read raw image as base64 data URL
  const rawBase64 = fs.readFileSync(rawImagePath).toString('base64');
  const rawDataUrl = `data:image/png;base64,${rawBase64}`;

  // Build high-aesthetic Apple Marketing HTML
  let html = '';

  if (!isIpad) {
    // iPhone 18 Framing: 1320 x 2868
    html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      width: ${canvasWidth}px;
      height: ${canvasHeight}px;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro", "Helvetica Neue", sans-serif;
      background: radial-gradient(110% 70% at 50% 12%, ${screen.accentGlow} 0%, rgba(13, 17, 23, 0) 70%),
                  linear-gradient(180deg, #0A0D14 0%, #030508 100%);
      color: #FFFFFF;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      -webkit-font-smoothing: antialiased;
    }

    /* Ambient Subtle Grid / Mesh Texture */
    .ambient-glow {
      position: absolute;
      top: -200px;
      left: 50%;
      transform: translateX(-50%);
      width: 1200px;
      height: 800px;
      background: radial-gradient(circle, ${screen.accentGlow} 0%, transparent 65%);
      filter: blur(80px);
      pointer-events: none;
      z-index: 1;
    }

    /* Top Marketing Typography Header */
    .header-container {
      position: relative;
      z-index: 10;
      width: 100%;
      padding: 110px 80px 0 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    /* Apple Glass Pill Badge */
    .badge {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      height: 48px;
      padding: 0 24px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.16);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.3);
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
      box-shadow: 0 0 10px ${screen.badgeColor};
    }

    /* Headline Title */
    .title {
      margin-top: 26px;
      font-size: 70px;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.1;
      color: #FFFFFF;
      text-shadow: 0 4px 24px rgba(0, 0, 0, 0.6);
      max-width: 1160px;
    }

    /* Subtitle */
    .subtitle {
      margin-top: 18px;
      font-size: 33px;
      font-weight: 500;
      letter-spacing: -0.015em;
      line-height: 1.35;
      color: #94A3B8;
      max-width: 1060px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }

    /* iPhone 18 Titanium Device Frame */
    .device-wrapper {
      position: absolute;
      top: 610px;
      left: 50%;
      transform: translateX(-50%);
      width: 1120px;
      height: 2434px;
      z-index: 10;
      border-radius: 70px;
      padding: 14px;
      background: linear-gradient(135deg, #44474B 0%, #1A1C1E 45%, #2B2E32 100%);
      box-shadow: 
        0 60px 120px -20px rgba(0, 0, 0, 0.95),
        0 30px 60px -10px rgba(0, 0, 0, 0.8),
        inset 0 1.5px 2px rgba(255, 255, 255, 0.4),
        inset 0 -1.5px 2px rgba(0, 0, 0, 0.8),
        0 0 0 1px rgba(0, 0, 0, 0.9);
      display: flex;
      flex-direction: column;
    }

    /* Inner Screen Mask */
    .screen-container {
      width: 100%;
      height: 100%;
      border-radius: 56px;
      overflow: hidden;
      position: relative;
      background: #000000;
      box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.85);
    }

    .screen-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      display: block;
    }

    /* Physical Dynamic Island cutout overlay */
    .dynamic-island {
      position: absolute;
      top: 14px;
      left: 50%;
      transform: translateX(-50%);
      width: 322px;
      height: 92px;
      background: #000000;
      border-radius: 9999px;
      z-index: 30;
      box-shadow: 0 0 2px rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-right: 24px;
    }

    .camera-lens {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #1C2333 0%, #060910 100%);
      border: 1px solid rgba(255, 255, 255, 0.15);
      position: relative;
    }

    .camera-reflection {
      position: absolute;
      top: 4px;
      left: 4px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
    }
  </style>
</head>
<body>
  <div class="ambient-glow"></div>

  <div class="header-container">
    <div class="badge">
      <span class="badge-dot"></span>
      <span>${screen.badge}</span>
    </div>
    <h1 class="title">${screen.title}</h1>
    <p class="subtitle">${screen.subtitle}</p>
  </div>

  <div class="device-wrapper">
    <div class="screen-container">
      <div class="dynamic-island">
        <div class="camera-lens">
          <div class="camera-reflection"></div>
        </div>
      </div>
      <img class="screen-img" src="${rawDataUrl}" alt="${screen.title}" />
    </div>
  </div>
</body>
</html>
    `;
  } else {
    // iPad Pro 13" Framing: 2064 x 2752
    html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      width: ${canvasWidth}px;
      height: ${canvasHeight}px;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro", "Helvetica Neue", sans-serif;
      background: radial-gradient(110% 70% at 50% 10%, ${screen.accentGlow} 0%, rgba(13, 17, 23, 0) 70%),
                  linear-gradient(180deg, #0A0D14 0%, #030508 100%);
      color: #FFFFFF;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      -webkit-font-smoothing: antialiased;
    }

    .ambient-glow {
      position: absolute;
      top: -240px;
      left: 50%;
      transform: translateX(-50%);
      width: 1600px;
      height: 900px;
      background: radial-gradient(circle, ${screen.accentGlow} 0%, transparent 65%);
      filter: blur(100px);
      pointer-events: none;
      z-index: 1;
    }

    /* Top Marketing Typography Header */
    .header-container {
      position: relative;
      z-index: 10;
      width: 100%;
      padding: 100px 100px 0 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      height: 52px;
      padding: 0 28px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.16);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.3);
      font-size: 22px;
      font-weight: 700;
      letter-spacing: 2.2px;
      text-transform: uppercase;
      color: ${screen.badgeColor};
    }

    .badge-dot {
      width: 9px;
      height: 9px;
      border-radius: 50%;
      background: ${screen.badgeColor};
      box-shadow: 0 0 12px ${screen.badgeColor};
    }

    .title {
      margin-top: 26px;
      font-size: 80px;
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
      max-width: 1600px;
      text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
    }

    /* iPad Pro 13" Aluminum Bezel Frame */
    .device-wrapper {
      position: absolute;
      top: 570px;
      left: 50%;
      transform: translateX(-50%);
      width: 1820px;
      height: 2360px;
      z-index: 10;
      border-radius: 52px;
      padding: 22px;
      background: linear-gradient(135deg, #33363B 0%, #151618 50%, #25272B 100%);
      box-shadow: 
        0 65px 130px -25px rgba(0, 0, 0, 0.95),
        0 35px 70px -15px rgba(0, 0, 0, 0.8),
        inset 0 1.5px 2px rgba(255, 255, 255, 0.35),
        inset 0 -1.5px 2px rgba(0, 0, 0, 0.8),
        0 0 0 1px rgba(0, 0, 0, 0.9);
      display: flex;
      flex-direction: column;
    }

    /* iPad Front Camera in top bezel */
    .ipad-camera {
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #08090C;
      border: 1px solid rgba(255, 255, 255, 0.15);
      z-index: 20;
    }

    /* Inner Screen Mask */
    .screen-container {
      width: 100%;
      height: 100%;
      border-radius: 34px;
      overflow: hidden;
      position: relative;
      background: #000000;
      box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.85);
    }

    .screen-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: top center;
      display: block;
    }
  </style>
</head>
<body>
  <div class="ambient-glow"></div>

  <div class="header-container">
    <div class="badge">
      <span class="badge-dot"></span>
      <span>${screen.badge}</span>
    </div>
    <h1 class="title">${screen.title}</h1>
    <p class="subtitle">${screen.subtitle}</p>
  </div>

  <div class="device-wrapper">
    <div class="ipad-camera"></div>
    <div class="screen-container">
      <img class="screen-img" src="${rawDataUrl}" alt="${screen.title}" />
    </div>
  </div>
</body>
</html>
    `;
  }

  // Open page in puppeteer at 1:1 scale
  const page = await browser.newPage();
  await page.setViewport({
    width: canvasWidth,
    height: canvasHeight,
    deviceScaleFactor: 1,
  });

  await page.setContent(html, { waitUntil: 'networkidle0' });
  await sleep(300);

  await page.screenshot({ path: outPath });
  console.log(`Saved framed: ${outPath} (${canvasWidth} x ${canvasHeight})`);

  await page.close();
}

async function run() {
  console.log('Starting local server on port 3456...');
  const server = await startServer(3456);

  console.log('Launching headless Chrome...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  // Step 1: Capture Raw iPhone screens
  await captureRawScreens(browser, false);

  // Step 2: Capture Raw iPad screens
  await captureRawScreens(browser, true);

  // Step 3: Composite Framed iPhone 18 screenshots (1320 x 2868)
  console.log(`\n========================================`);
  console.log('Compositing Framed iPhone 18 Screenshots (1320 x 2868)...');
  console.log(`========================================`);
  for (let i = 0; i < SCREENS.length; i++) {
    const screen = SCREENS[i];
    const rawPath = path.join(CACHE_DIR, `raw_iphone_0${i + 1}.png`);
    const outPath = path.join(DIR_6_9, `${screen.id}.png`);
    await compositeFramedScreenshot(browser, {
      isIpad: false,
      screen,
      rawImagePath: rawPath,
      outPath
    });
  }

  // Step 4: Composite Framed iPad Pro 13" screenshots (2064 x 2752)
  console.log(`\n========================================`);
  console.log('Compositing Framed iPad Pro 13" Screenshots (2064 x 2752)...');
  console.log(`========================================`);
  for (let i = 0; i < SCREENS.length; i++) {
    const screen = SCREENS[i];
    const rawPath = path.join(CACHE_DIR, `raw_ipad_0${i + 1}.png`);
    const outPath = path.join(DIR_IPAD, `${screen.id}.png`);
    await compositeFramedScreenshot(browser, {
      isIpad: true,
      screen,
      rawImagePath: rawPath,
      outPath
    });
  }

  await browser.close();
  server.close();

  console.log('\nAll iPhone 18 and iPad Pro screenshots successfully created!');
}

run().catch((err) => {
  console.error('Fatal error generating screenshots:', err);
  process.exit(1);
});
