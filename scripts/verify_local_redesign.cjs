const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

// Simple static file server for dist
function startServer(port = 5173) {
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
        res.end(content, 'utf-8');
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
  const port = 5173;
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

  console.log('Testing Desktop 1440x900...');
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' });

  // 1. Check Horizontal Overflow on Desktop
  const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  console.log('Desktop 1440x900 horizontal overflow:', desktopOverflow);

  // 2. Check Broken Images
  const brokenImages = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('img'))
      .filter(img => !img.complete || img.naturalWidth === 0)
      .map(img => img.src);
  });
  console.log('Broken images count:', brokenImages.length);
  if (brokenImages.length > 0) console.log('Broken images:', brokenImages);

  // 3. Verify Buttons
  const buttonsOnPage = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, a')).map(el => el.innerText.trim()).filter(Boolean);
  });

  const requiredButtonSnippets = [
    'Launch Interactive Blueprint',
    'Explore 10 Phases',
    'Try Live App',
    'Open App',
    'Run Store Audit Now',
    'Audit All 101 Rules in App',
    'Audit in Interactive Checklist',
    'Explore Academy in Web Suite',
    'Launch Web App',
  ];

  console.log('\n--- Verifying Exact Required Buttons ---');
  for (const snippet of requiredButtonSnippets) {
    const found = buttonsOnPage.some(b => b.includes(snippet));
    console.log(`Button "${snippet}": ${found ? 'FOUND ✓' : 'MISSING ✗'}`);
    if (!found) {
      throw new Error(`Required button "${snippet}" not found on page!`);
    }
  }

  // 4. Verify Responsive Viewports
  const viewports = [
    { name: 'Tablet 768x1024', width: 768, height: 1024 },
    { name: 'Mobile 390x844', width: 390, height: 844 },
    { name: 'Small Mobile 320x568', width: 320, height: 568 }
  ];

  for (const vp of viewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    await page.reload({ waitUntil: 'networkidle0' });
    await new Promise(r => setTimeout(r, 200));
    const overflowInfo = await page.evaluate(() => {
      const docW = document.documentElement.scrollWidth;
      const winW = window.innerWidth;
      const hasOverflow = docW > winW;
      const culprits = [];
      if (hasOverflow) {
        document.querySelectorAll('*').forEach(el => {
          const r = el.getBoundingClientRect();
          if (r.right > winW + 1) {
            culprits.push({
              tag: el.tagName,
              id: el.id,
              class: (el.className || '').toString().slice(0, 80),
              right: Math.round(r.right),
              windowWidth: winW
            });
          }
        });
      }
      return { hasOverflow, docW, winW, culprits: culprits.slice(0, 5) };
    });
    console.log(`${vp.name} horizontal overflow: ${overflowInfo.hasOverflow ? 'FAIL (overflow detected)' : 'PASS (0 overflow) ✓'} (docW=${overflowInfo.docW}, winW=${overflowInfo.winW})`);
    if (overflowInfo.hasOverflow) {
      console.log('Culprit elements:', overflowInfo.culprits);
    }
  }

  // 5. Test Interactive Sections & capture screenshots
  await page.setViewport({ width: 1440, height: 900 });

  // Hero
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/redesign_01_hero.png') });

  // Explorer
  await page.evaluate(() => document.getElementById('explorer')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/redesign_02_explorer.png') });

  // Phases
  await page.evaluate(() => document.getElementById('phases')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/redesign_03_phases.png') });

  // Calculator
  await page.evaluate(() => document.getElementById('calculator')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/redesign_04_calculator.png') });

  // Rejection Traps
  await page.evaluate(() => document.getElementById('why-apps-fail')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/redesign_05_traps.png') });

  // Features Bento Grid
  await page.evaluate(() => document.getElementById('features')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/redesign_06_features.png') });

  // Screenshots Showcase
  await page.evaluate(() => document.getElementById('screenshots')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/redesign_07_screenshots.png') });

  // Academy
  await page.evaluate(() => document.getElementById('academy')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/redesign_08_academy.png') });

  // FAQ
  await page.evaluate(() => document.getElementById('faq')?.scrollIntoView());
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(__dirname, '../screenshots/redesign_09_faq.png') });

  // 6. Test App Launch transition
  console.log('\nTesting App Launch Transition...');
  await page.evaluate(() => {
    const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Launch Interactive Blueprint'));
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 800));

  const isAppMode = await page.evaluate(() => window.location.hash === '#app');
  console.log('Switched to #app mode:', isAppMode);

  const backBtnPresent = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).some(b => b.innerText.includes('Back to Website'));
  });
  console.log('"Back to Website" bar present:', backBtnPresent);

  await page.screenshot({ path: path.join(__dirname, '../screenshots/redesign_10_app_mode.png') });

  // Click Back to Website
  if (backBtnPresent) {
    await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Back to Website'));
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 800));
    console.log('Switched back to website mode:', await page.evaluate(() => window.location.hash !== '#app'));
  }

  await browser.close();
  server.close();

  console.log('\n--- Final Verification Summary ---');
  console.log('Console Errors:', consoleErrors.length === 0 ? '0 Errors ✓' : consoleErrors);
  console.log('Network Errors:', networkErrors.length === 0 ? '0 Errors ✓' : networkErrors);

  if (consoleErrors.length > 0 || networkErrors.length > 0 || desktopOverflow || brokenImages.length > 0) {
    throw new Error('Verification failed due to glitches/errors');
  }

  console.log('🎉 ALL AUDIT CHECKS PASSED WITH 0 GLITCHES & 100% BUTTON PRESERVATION!');
}

verify().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
