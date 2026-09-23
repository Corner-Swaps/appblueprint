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

  // 1. Verify Header: Centered title and subtext
  const headerInfo = await page.evaluate(() => {
    const h1 = document.querySelector('header h1');
    const p = document.querySelector('header p');
    const testOnPhone = Array.from(document.querySelectorAll('header button, header a')).find(el => el.textContent.includes('Test on Phone'));
    const higDocs = Array.from(document.querySelectorAll('header a')).find(el => el.textContent.includes('HIG Docs'));
    return {
      h1Text: h1 ? h1.innerText : null,
      pText: p ? p.innerText : null,
      hasTestOnPhone: !!testOnPhone,
      hasHigDocs: !!higDocs,
    };
  });

  console.log('Header Title:', headerInfo.h1Text);
  console.log('Header Subtext:', headerInfo.pText);
  console.log('Test on Phone in Header (should be false):', headerInfo.hasTestOnPhone);
  console.log('HIG Docs in Header (should be false):', headerInfo.hasHigDocs);

  if (!headerInfo.h1Text || !headerInfo.h1Text.includes('Build, Audit')) {
    throw new Error(`Unexpected header title: ${headerInfo.h1Text}`);
  }
  if (headerInfo.hasTestOnPhone) {
    throw new Error('Test on Phone button is still in header!');
  }
  if (headerInfo.hasHigDocs) {
    throw new Error('HIG Docs link is still in header!');
  }

  // 2. Verify Left-side Platform Switcher with Apple and Android logos
  console.log('\n--- 2. Testing Left-Side Platform Switcher with Apple & Android Logos ---');
  const platformButtons = await page.evaluate(() => {
    const aside = document.querySelector('aside');
    if (!aside) return null;
    const buttons = Array.from(aside.querySelectorAll('button'));
    const allBtn = buttons.find(b => b.textContent.includes('All (101)'));
    const iosBtn = buttons.find(b => b.textContent.includes('iOS'));
    const androidBtn = buttons.find(b => b.textContent.includes('Android'));
    const iosHasSvg = iosBtn ? !!iosBtn.querySelector('svg') : false;
    const androidHasSvg = androidBtn ? !!androidBtn.querySelector('svg') : false;
    return {
      hasAllBtn: !!allBtn,
      hasIosBtn: !!iosBtn,
      hasAndroidBtn: !!androidBtn,
      iosHasSvg,
      androidHasSvg,
    };
  });

  console.log('Platform Switcher on left:', platformButtons);
  if (!platformButtons || !platformButtons.hasIosBtn || !platformButtons.hasAndroidBtn || !platformButtons.iosHasSvg || !platformButtons.androidHasSvg) {
    throw new Error('Left-side platform switcher with Apple and Android logos is missing or incomplete!');
  }

  // 3. Verify Single-Accordion Mode
  console.log('\n--- 3. Testing Single-Accordion Mode (Only ONE section open at a time) ---');
  // Check initial open sections: only Set Up should be open
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
  console.log(`Found ${sectionTriggers.length} section triggers`);
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

    // Now click Step 2 in left sidebar
    console.log('Clicking Phase 2 in left sidebar...');
    const phase2SidebarBtn = await page.evaluateHandle(() => {
      const aside = document.querySelector('aside');
      const buttons = Array.from(aside.querySelectorAll('button'));
      return buttons.find(b => b.textContent.includes('Phase 2') || b.textContent.includes('Step 2') || b.textContent.includes('Wireframes'));
    });
    if (phase2SidebarBtn) {
      await phase2SidebarBtn.click();
      await new Promise(r => setTimeout(r, 450));

      const openCountAfterPhase2 = await page.evaluate(() => {
        const sections = Array.from(document.querySelectorAll('[role="button"][aria-expanded]'));
        return sections.filter(s => s.getAttribute('aria-expanded') === 'true').length;
      });
      console.log('Open sections count after clicking Phase 2 in sidebar (should be 1):', openCountAfterPhase2);
      if (openCountAfterPhase2 !== 1) {
        throw new Error(`Expected exactly 1 open section after clicking Phase 2 in sidebar, found ${openCountAfterPhase2}`);
      }
    }
  }

  await page.screenshot({ path: path.join(screenshotsDir, 'unified_single_accordion.png'), fullPage: false });

  // 4. Verify Academy Resources 2-Column Experience
  console.log('\n--- 4. Testing Academy Resources 2-Column Experience ---');
  // Click Resources Tab in bottom dock
  await page.evaluate(() => {
    const dockButtons = Array.from(document.querySelectorAll('nav button'));
    // 2nd button is resources
    if (dockButtons.length >= 2) {
      dockButtons[1].click();
    }
  });
  await new Promise(r => setTimeout(r, 450));

  const resourcesLayout = await page.evaluate(() => {
    const aside = document.querySelector('aside');
    const asideTitle = aside ? aside.querySelector('h2') : null;
    const categoryButtons = aside ? Array.from(aside.querySelectorAll('button')) : [];
    // Target the h2 inside the active resources container
    const resourcesContainer = Array.from(document.querySelectorAll('main .lg\\:col-span-8 > div')).find(el => !el.classList.contains('hidden'));
    const rightPanelH2 = resourcesContainer ? resourcesContainer.querySelector('h2') : null;
    const hasExpandAll = Array.from(document.querySelectorAll('button')).some(b => b.textContent.toLowerCase().includes('expand all'));

    return {
      hasAside: !!aside,
      asideTitle: asideTitle ? asideTitle.innerText : null,
      categoryCount: categoryButtons.length,
      activeCategoryTitle: rightPanelH2 ? rightPanelH2.innerText : null,
      hasExpandAll,
    };
  });

  console.log('Resources Layout on Desktop:', resourcesLayout);
  if (!resourcesLayout.hasAside || !resourcesLayout.asideTitle || !resourcesLayout.asideTitle.toLowerCase().includes('academy')) {
    throw new Error('Resources sidebar directory on left is missing or incorrect!');
  }
  if (!resourcesLayout.activeCategoryTitle) {
    throw new Error('Right panel active category is missing!');
  }
  if (resourcesLayout.hasExpandAll) {
    throw new Error('Expand All button was found on Resources tab!');
  }

  // Click another category on the left (e.g. Design Systems)
  console.log('Clicking "Design Systems" category on left sidebar...');
  await page.evaluate(() => {
    const aside = document.querySelector('aside');
    const buttons = Array.from(aside.querySelectorAll('button'));
    const designBtn = buttons.find(b => b.textContent.includes('Design Systems') || b.textContent.includes('Design'));
    if (designBtn) designBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));

  const updatedRightPanelTitle = await page.evaluate(() => {
    const resourcesContainer = Array.from(document.querySelectorAll('main .lg\\:col-span-8 > div')).find(el => !el.classList.contains('hidden'));
    const rightPanelH2 = resourcesContainer ? resourcesContainer.querySelector('h2') : null;
    return rightPanelH2 ? rightPanelH2.innerText : null;
  });
  console.log('Right Panel Active Category after clicking Design on left:', updatedRightPanelTitle);
  if (!updatedRightPanelTitle || !updatedRightPanelTitle.toLowerCase().includes('design')) {
    throw new Error(`Expected right panel to switch to Design Systems, got: "${updatedRightPanelTitle}"`);
  }

  await page.screenshot({ path: path.join(screenshotsDir, 'unified_resources_2column.png'), fullPage: false });

  // 5. Test Responsive Viewports & Horizontal Overflow
  console.log('\n--- 5. Testing Responsive Viewports & Horizontal Overflow ---');
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

  console.log('\n--- 6. Errors Summary ---');
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
