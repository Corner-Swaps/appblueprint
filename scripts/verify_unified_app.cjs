const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

function startServer(port = 5175) {
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.webmanifest': 'application/manifest+json',
  };

  const distDir = path.join(__dirname, '../dist');

  const server = http.createServer((req, res) => {
    let reqUrl = req.url.split('?')[0].split('#')[0];
    if (reqUrl === '/') reqUrl = '/index.html';

    let filePath = path.join(distDir, reqUrl);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(distDir, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';

    fs.readFile(filePath, (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error reading file');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
      }
    });
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`Test server running at http://localhost:${port}`);
      resolve(server);
    });
  });
}

async function verify() {
  const port = 5175;
  const server = await startServer(port);

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  const networkErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('response', res => {
    if (res.status() >= 400) {
      networkErrors.push(`${res.status()} on ${res.url()}`);
    }
  });

  const screenshotsDir = path.join(__dirname, '../screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('\n--- 1. Testing Desktop Header & Centered Layout (1440x900) ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' });

  // 1. Verify Header: Centered title, subtext, widened progress bar, and NO refresh button
  const headerInfo = await page.evaluate(() => {
    const header = document.querySelector('header');
    const h1 = header ? header.querySelector('h1') : null;
    const p = header ? header.querySelector('p') : null;
    const progressBar = header ? header.querySelector('.bg-slate-200\\/90, .bg-slate-200') : null;
    const progressBarWidth = progressBar ? progressBar.getBoundingClientRect().width : 0;
    const rotateCcwBtn = header ? header.querySelector('button[title*="Reset"], svg.lucide-rotate-ccw') : null;
    const testOnPhone = Array.from(header ? header.querySelectorAll('button, a') : []).find(el => el.textContent.includes('Test on Phone'));

    return {
      h1Text: h1 ? h1.innerText : null,
      pText: p ? p.innerText : null,
      progressBarWidth,
      hasRotateCcw: !!rotateCcwBtn,
      hasTestOnPhone: !!testOnPhone,
    };
  });

  console.log('Header Title:', headerInfo.h1Text);
  console.log('Header Subtext:', headerInfo.pText);
  console.log('Progress Bar Width on 1440px viewport (should be > 600px):', headerInfo.progressBarWidth);
  console.log('Refresh / Reset button in Header (must be false):', headerInfo.hasRotateCcw);

  if (!headerInfo.h1Text || !headerInfo.h1Text.includes('Build, Audit')) {
    throw new Error(`Unexpected header title: ${headerInfo.h1Text}`);
  }
  if (headerInfo.hasRotateCcw) {
    throw new Error('RotateCcw / Refresh button is still in header next to progress bar!');
  }

  await page.screenshot({ path: path.join(screenshotsDir, 'unified_checklist_top.png'), fullPage: false });
  if (headerInfo.progressBarWidth < 500) {
    throw new Error(`Progress bar width is too narrow (${headerInfo.progressBarWidth}px, expected > 500px)!`);
  }

  // 2. Verify Left-side Project Title & Platform Switcher with Apple and Android logos
  console.log('\n--- 2. Testing Left-Side Project Title & Platform Switcher ---');
  const leftSidebarInfo = await page.evaluate(() => {
    const aside = document.querySelector('aside');
    if (!aside) return null;
    const buttons = Array.from(aside.querySelectorAll('button'));
    const projectBtn = buttons.find(b => b.textContent.includes('Active Project') || b.textContent.includes('My Mobile App'));
    const allBtn = buttons.find(b => b.textContent.includes('All (101)'));
    const iosBtn = buttons.find(b => b.textContent.includes('iOS'));
    const androidBtn = buttons.find(b => b.textContent.includes('Android'));
    const iosHasSvg = iosBtn ? !!iosBtn.querySelector('svg') : false;
    const androidHasSvg = androidBtn ? !!androidBtn.querySelector('svg') : false;

    // Check that projectBtn appears BEFORE the platform buttons in DOM order
    const projectIndex = projectBtn ? buttons.indexOf(projectBtn) : -1;
    const allIndex = allBtn ? buttons.indexOf(allBtn) : -1;

    // Check titles for ellipses (...)
    const phaseTitles = Array.from(aside.querySelectorAll('p.font-google')).map(p => p.innerText);
    const hasTruncatedTitles = phaseTitles.some(t => t.includes('...'));

    return {
      hasProjectBtn: !!projectBtn,
      projectIndex,
      allIndex,
      isProjectAboveAll: projectIndex >= 0 && projectIndex < allIndex,
      hasAllBtn: !!allBtn,
      hasIosBtn: !!iosBtn,
      hasAndroidBtn: !!androidBtn,
      iosHasSvg,
      androidHasSvg,
      phaseTitles,
      hasTruncatedTitles,
    };
  });

  console.log('Left Sidebar info:', leftSidebarInfo);
  if (!leftSidebarInfo || !leftSidebarInfo.hasProjectBtn) {
    throw new Error('Project Title button is missing from the top of the left sidebar!');
  }
  if (!leftSidebarInfo.isProjectAboveAll) {
    throw new Error('Project Title button must be placed directly ABOVE the platform switcher on the left side!');
  }
  if (!leftSidebarInfo.hasIosBtn || !leftSidebarInfo.hasAndroidBtn || !leftSidebarInfo.iosHasSvg || !leftSidebarInfo.androidHasSvg) {
    throw new Error('Left-side platform switcher with Apple and Android logos is missing or incomplete!');
  }
  if (leftSidebarInfo.hasTruncatedTitles) {
    throw new Error(`Detected ellipsis (...) in phase titles: ${JSON.stringify(leftSidebarInfo.phaseTitles)}`);
  }

  // 3. Verify NO "iOS HIG Only" badge in the right panel
  console.log('\n--- 3. Verifying NO "iOS HIG Only" badge ---');
  // Click iOS button
  await page.evaluate(() => {
    const aside = document.querySelector('aside');
    const buttons = Array.from(aside.querySelectorAll('button'));
    const iosBtn = buttons.find(b => b.textContent.includes('iOS'));
    if (iosBtn) iosBtn.click();
  });
  await new Promise(r => setTimeout(r, 300));

  const higCheck = await page.evaluate(() => {
    const allText = document.body.innerText;
    return {
      hasHigOnly: allText.includes('iOS HIG Only') || allText.includes('Higgs') || allText.includes('HIG Only'),
      hasAndroidOnly: allText.includes('Android Play Only'),
    };
  });
  console.log('Contains "iOS HIG Only" (must be false):', higCheck.hasHigOnly);
  if (higCheck.hasHigOnly) {
    throw new Error('"iOS HIG Only" badge is still appearing in the UI!');
  }

  // Reset to All platform
  await page.evaluate(() => {
    const aside = document.querySelector('aside');
    const buttons = Array.from(aside.querySelectorAll('button'));
    const allBtn = buttons.find(b => b.textContent.includes('All (101)'));
    if (allBtn) allBtn.click();
  });
  await new Promise(r => setTimeout(r, 200));

  // 4. Verify Single-Accordion Mode
  console.log('\n--- 4. Testing Single-Accordion Mode ---');
  const initialOpenCount = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll('[role="button"][aria-expanded]'));
    return sections.filter(s => s.getAttribute('aria-expanded') === 'true').length;
  });
  console.log('Initial open sections count (should be 1 for Set Up):', initialOpenCount);
  if (initialOpenCount !== 1) {
    throw new Error(`Expected exactly 1 open section on load, but found ${initialOpenCount}`);
  }

  // Click Step 1 header in the main panel
  const sectionTriggers = await page.$$('[role="button"][aria-expanded]');
  if (sectionTriggers.length > 1) {
    console.log('Clicking Step 1 header to open it...');
    await sectionTriggers[1].click();
    await new Promise(r => setTimeout(r, 450));

    const openCountAfterStep1 = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('[role="button"][aria-expanded]'));
      return sections.filter(s => s.getAttribute('aria-expanded') === 'true').length;
    });
    console.log('Open sections count after clicking Step 1 (should be 1):', openCountAfterStep1);
    if (openCountAfterStep1 !== 1) {
      throw new Error(`Expected exactly 1 open section after opening Step 1, found ${openCountAfterStep1}`);
    }
  }

  await page.screenshot({ path: path.join(screenshotsDir, 'unified_single_accordion.png'), fullPage: false });

  // 5. Verify Academy Resources 2-Column Experience & NO progress bar in header on Resources tab
  console.log('\n--- 5. Testing Academy Resources & Header Badge ---');
  // Click Resources Tab in bottom dock
  await page.evaluate(() => {
    const dockButtons = Array.from(document.querySelectorAll('nav button'));
    if (dockButtons.length >= 2) {
      dockButtons[1].click();
    }
  });
  await new Promise(r => setTimeout(r, 450));

  const resourcesHeaderAndLayout = await page.evaluate(() => {
    const header = document.querySelector('header');
    const headerProgressBar = header ? header.querySelector('.bg-slate-200\\/90, .bg-slate-200') : null;
    const headerAcademyBanner = header ? Array.from(header.querySelectorAll('span, div')).some(el => el.textContent.includes('Academy & Curated')) : false;

    const aside = document.querySelector('aside');
    const asideTitle = aside ? aside.querySelector('h2') : null;
    const categoryButtons = aside ? Array.from(aside.querySelectorAll('button')) : [];

    // Right panel in col-span-7
    const resourcesContainer = Array.from(document.querySelectorAll('main .lg\\:col-span-7 > div')).find(el => !el.classList.contains('hidden'));
    const rightPanelH2 = resourcesContainer ? resourcesContainer.querySelector('h2') : null;

    // Check resource tool cards for "Free Tier" badge
    const toolCards = resourcesContainer ? Array.from(resourcesContainer.querySelectorAll('.rounded-3xl.bg-white')) : [];
    const hasFreeTierBadge = toolCards.some(card => {
      const badges = Array.from(card.querySelectorAll('span')).map(s => s.innerText.toLowerCase());
      return badges.some(b => b.includes('free tier'));
    });

    // Check category titles in sidebar for ellipses (...)
    const catTitles = categoryButtons.map(b => b.innerText);
    const hasTruncatedCategories = catTitles.some(t => t.includes('...'));

    return {
      hasHeaderProgressBar: !!headerProgressBar,
      headerAcademyBanner,
      hasAside: !!aside,
      asideTitle: asideTitle ? asideTitle.innerText : null,
      categoryCount: categoryButtons.length,
      activeCategoryTitle: rightPanelH2 ? rightPanelH2.innerText : null,
      toolCardsCount: toolCards.length,
      hasFreeTierBadge,
      hasTruncatedCategories,
      catTitles,
    };
  });

  console.log('Resources Header & Layout:', resourcesHeaderAndLayout);
  if (resourcesHeaderAndLayout.hasHeaderProgressBar) {
    throw new Error('Progress bar is still showing in header on Academy Resources tab!');
  }
  if (!resourcesHeaderAndLayout.headerAcademyBanner) {
    throw new Error('Academy banner is missing from top header on Resources tab!');
  }
  if (!resourcesHeaderAndLayout.hasAside || !resourcesHeaderAndLayout.asideTitle) {
    throw new Error('Resources sidebar is missing!');
  }
  if (resourcesHeaderAndLayout.hasFreeTierBadge) {
    throw new Error('Found "Free Tier" badge on resource tool cards! User asked to remove it.');
  }
  if (resourcesHeaderAndLayout.hasTruncatedCategories) {
    throw new Error(`Detected ellipsis (...) in category titles: ${JSON.stringify(resourcesHeaderAndLayout.catTitles)}`);
  }

  await page.screenshot({ path: path.join(screenshotsDir, 'unified_resources_2column.png'), fullPage: false });

  // 6. Test Responsive Viewports & Horizontal Overflow
  console.log('\n--- 6. Testing Responsive Viewports & Horizontal Overflow ---');
  const viewports = [
    { name: 'Desktop 1440x900', width: 1440, height: 900, file: 'unified_desktop_1440.png' },
    { name: 'Tablet 768x1024', width: 768, height: 1024, file: 'unified_tablet_768.png' },
    { name: 'Mobile 390x844', width: 390, height: 844, file: 'unified_mobile_390.png' },
    { name: 'Small Mobile 320x568', width: 320, height: 568, file: 'unified_mobile_320.png' },
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 200));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    console.log(`${vp.name} horizontal overflow:`, overflow);
    if (overflow) {
      throw new Error(`Horizontal overflow detected on ${vp.name}!`);
    }
    await page.screenshot({ path: path.join(screenshotsDir, vp.file), fullPage: false });
  }

  console.log('\n--- 7. Errors Summary ---');
  console.log('Console Errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) console.log('Console Errors:', consoleErrors);
  console.log('Network Errors count:', networkErrors.length);
  if (networkErrors.length > 0) console.log('Network Errors:', networkErrors);

  await browser.close();
  server.close();

  if (consoleErrors.length > 0 || networkErrors.length > 0) {
    throw new Error('Errors encountered during verification!');
  }

  console.log('\nALL VERIFICATIONS PASSED WITH 100% SUCCESS! ✓\n');
}

verify().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
