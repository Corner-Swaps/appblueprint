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

  console.log('\n--- 1. Testing Desktop (1440x900) ---');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' });

  // 1. Verify Header & Explainer Title
  const titleText = await page.$eval('h1', el => el.innerText).catch(() => null);
  console.log('Main Page H1 Title:', titleText);
  if (!titleText || !titleText.includes('Build, Audit')) {
    throw new Error(`Unexpected or missing H1 title: "${titleText}"`);
  }

  // 2. Verify Desktop Side-by-Side: Sidebar on left, big panel on right
  const hasSidebar = await page.evaluate(() => !!document.querySelector('aside'));
  console.log('Sidebar Directory present:', hasSidebar);
  if (!hasSidebar) {
    throw new Error('Sidebar roadmap is missing on desktop view!');
  }

  // 3. Check Horizontal Overflow on Desktop
  const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log('Desktop 1440x900 horizontal overflow:', desktopOverflow);
  if (desktopOverflow) {
    throw new Error('Horizontal overflow detected on desktop 1440x900!');
  }

  await page.screenshot({ path: path.join(screenshotsDir, 'unified_desktop_1440.png'), fullPage: false });

  // 4. Test clicking section on the right side to expand dropdown accordion
  console.log('\n--- 2. Testing Dropdown Section Accordion Interaction ---');
  const sectionPill = await page.$('[role="button"][aria-expanded]');
  if (!sectionPill) {
    throw new Error('Could not find phase section dropdown trigger!');
  }

  const initialExpanded = await page.evaluate(el => el.getAttribute('aria-expanded'), sectionPill);
  console.log('Initial section expanded state:', initialExpanded);

  console.log('Clicking phase section header to expand dropdown accordion...');
  await sectionPill.click();
  await new Promise(r => setTimeout(r, 450));

  const afterClickExpanded = await page.evaluate(el => el.getAttribute('aria-expanded'), sectionPill);
  console.log('After-click section expanded state:', afterClickExpanded);
  if (afterClickExpanded !== 'true') {
    throw new Error('Section did not expand after clicking!');
  }

  await page.screenshot({ path: path.join(screenshotsDir, 'unified_section_expanded.png'), fullPage: false });

  // 5. Test clicking a phase in the left directory to jump and expand
  console.log('\n--- 3. Testing Left Sidebar Phase Navigation ---');
  const sidebarButtons = await page.$$('aside button');
  console.log(`Found ${sidebarButtons.length} sidebar buttons`);
  if (sidebarButtons.length > 2) {
    console.log('Clicking Phase 2 in sidebar...');
    await sidebarButtons[2].click();
    await new Promise(r => setTimeout(r, 450));
  }

  // 6. Test Responsive Viewports
  console.log('\n--- 4. Testing Responsive Viewports ---');
  const viewports = [
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

  console.log('\n--- 5. Errors Summary ---');
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
