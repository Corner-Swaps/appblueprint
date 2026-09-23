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
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.woff2': 'font/woff2',
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
    server.listen(port, () => resolve(server));
  });
}

async function audit() {
  const port = 5175;
  const server = await startServer(port);

  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  try {
    const screenshotsDir = path.join(__dirname, '../screenshots/audit');
    if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

    // ==========================================
    // 1. DESKTOP 1440x900 FULL SECTION CAPTURES
    // ==========================================
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' });

    console.log('--- 1. Capturing Desktop Sections ---');

    // Hero Section
    await page.screenshot({ path: path.join(screenshotsDir, '01_hero.png') });

    // Explorer Section & Full Card View
    await page.evaluate(() => {
      const el = document.getElementById('explorer');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, '02_explorer_grid.png') });

    // Open Inspector Modal on first card
    console.log('Testing Inspector Modal on Desktop...');
    await page.evaluate(() => {
      const card = document.querySelector('#explorer .group.relative.bg-white');
      if (card) card.click();
    });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(screenshotsDir, '03_modal_desktop.png') });

    // Check if modal is visible and verify z-index
    const modalZIndex = await page.evaluate(() => {
      const modal = document.querySelector('.fixed.inset-0');
      const header = document.querySelector('header');
      return {
        modalZ: modal ? window.getComputedStyle(modal).zIndex : null,
        headerZ: header ? window.getComputedStyle(header).zIndex : null,
      };
    });
    console.log('Modal & Header z-index:', modalZIndex);

    // Close modal
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 300));

    // Phases Section
    await page.evaluate(() => {
      const el = document.getElementById('phases');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, '04_phases.png') });

    // Calculator Section
    await page.evaluate(() => {
      const el = document.getElementById('calculator');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, '05_calculator.png') });

    // Traps Section
    await page.evaluate(() => {
      const el = document.getElementById('why-apps-fail');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, '06_traps.png') });

    // Features Section
    await page.evaluate(() => {
      const el = document.getElementById('features');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, '07_features.png') });

    // Screenshot Flows Section
    await page.evaluate(() => {
      const el = document.getElementById('screenshots');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, '08_flows.png') });

    // Academy Section
    await page.evaluate(() => {
      const el = document.getElementById('academy');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, '09_academy.png') });

    // FAQ Section
    await page.evaluate(() => {
      const el = document.getElementById('faq');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, '10_faq.png') });

    // ==========================================
    // 2. MOBILE 390x844 AUDIT (iPhone 14/15/16)
    // ==========================================
    console.log('--- 2. Auditing Mobile 390x844 ---');
    await page.setViewport({ width: 390, height: 844 });
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' });

    // Mobile Top & Hero
    await page.screenshot({ path: path.join(screenshotsDir, '11_mobile_hero.png') });

    // Mobile Hamburger Menu Click
    console.log('Testing Mobile Hamburger Menu...');
    await page.evaluate(() => {
      const menuBtn = document.querySelector('header button[aria-label="Toggle Menu"]');
      if (menuBtn) menuBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, '12_mobile_menu_open.png') });

    // Close menu
    await page.evaluate(() => {
      const menuBtn = document.querySelector('header button[aria-label="Toggle Menu"]');
      if (menuBtn) menuBtn.click();
    });
    await new Promise(r => setTimeout(r, 300));

    // Mobile Explorer
    await page.evaluate(() => {
      const el = document.getElementById('explorer');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, '13_mobile_explorer.png') });

    // Open Inspector Modal on Mobile
    console.log('Testing Inspector Modal on Mobile...');
    await page.evaluate(() => {
      const card = document.querySelector('#explorer .group.relative.bg-white');
      if (card) card.click();
    });
    await new Promise(r => setTimeout(r, 500));
    await page.screenshot({ path: path.join(screenshotsDir, '14_modal_mobile.png') });

    // Scroll down inside the mobile modal
    await page.evaluate(() => {
      const modalBox = document.querySelector('.fixed.inset-0 > div');
      if (modalBox) modalBox.scrollTop = 450;
    });
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: path.join(screenshotsDir, '14b_modal_mobile_scrolled.png') });

    // Close modal
    await page.keyboard.press('Escape');

    // ==========================================
    // 3. TABLET 768x1024 AUDIT (iPad Mini / Air)
    // ==========================================
    console.log('--- 3. Auditing Tablet 768x1024 ---');
    await page.setViewport({ width: 768, height: 1024 });
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(screenshotsDir, '15_tablet_hero.png') });

    console.log('Console Errors:', consoleErrors.length);
    if (consoleErrors.length > 0) console.log(consoleErrors);
    console.log('Audit complete! Check screenshots/audit/');
  } finally {
    await browser.close();
    server.close();
  }
}

audit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
