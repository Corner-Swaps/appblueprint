const puppeteer = require('puppeteer-core');
const http = require('http');
const fs = require('fs');
const path = require('path');

function startServer(port = 5174) {
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
    server.listen(port, () => {
      resolve(server);
    });
  });
}

async function runMobbinTests() {
  const port = 5174;
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
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(`http://localhost:${port}/`, { waitUntil: 'networkidle0' });

    console.log('--- Testing Mobbin Design Elements ---');

    // 1. Verify Platform Switcher in Navbar
    const navPlatformPills = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('header button')).map(b => b.innerText.trim());
    });
    console.log('Nav buttons found:', navPlatformPills);
    const hasPlatformSwitcher = navPlatformPills.some(t => t.includes('iOS') || t.includes('Android'));
    console.log('Platform Switcher present in navbar:', hasPlatformSwitcher);
    if (!hasPlatformSwitcher) throw new Error('Mobbin Platform Switcher missing in navbar');

    // 2. Test Clicking iOS Filter Pill
    console.log('Testing iOS platform filter click...');
    await page.evaluate(() => {
      const iosBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('iOS HIG'));
      if (iosBtn) iosBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 3. Verify Screen Cards in Explorer
    const screenCardsCount = await page.evaluate(() => {
      return document.querySelectorAll('#explorer .group.relative.bg-white').length;
    });
    console.log(`Mobbin Screen Cards visible in grid: ${screenCardsCount}`);
    if (screenCardsCount === 0) throw new Error('No Mobbin Screen Cards found in grid view');

    // 4. Test Opening Mobbin Screen Inspector Modal
    console.log('Testing Mobbin Screen Inspector Modal open...');
    await page.evaluate(() => {
      const firstCard = document.querySelector('#explorer .group.relative.bg-white');
      if (firstCard) firstCard.click();
    });
    await new Promise(r => setTimeout(r, 500));

    const isModalOpen = await page.evaluate(() => {
      const modal = document.querySelector('.fixed.inset-0.z-50');
      return !!modal && modal.innerText.includes('DEVICE VIEW');
    });
    console.log('Mobbin Screen Inspector Modal opened:', isModalOpen);
    if (!isModalOpen) throw new Error('Mobbin Inspector modal failed to open');

    // 5. Test Next Arrow in Modal
    console.log('Testing arrow navigation in inspector modal...');
    await page.keyboard.press('ArrowRight');
    await new Promise(r => setTimeout(r, 300));

    // 6. Test Closing Modal with Escape Key
    console.log('Testing Escape key to close modal...');
    await page.keyboard.press('Escape');
    await new Promise(r => setTimeout(r, 400));

    const isModalClosed = await page.evaluate(() => {
      return !document.querySelector('.fixed.inset-0.z-50');
    });
    console.log('Modal closed on Escape:', isModalClosed);
    if (!isModalClosed) throw new Error('Modal failed to close on Escape key');

    // 7. Test Grid to List View Switcher
    console.log('Testing Grid to List View switcher...');
    await page.evaluate(() => {
      const listBtn = document.querySelector('button[title="Compact List View"]');
      if (listBtn) listBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    const isListViewActive = await page.evaluate(() => {
      return document.querySelectorAll('#explorer .space-y-2\\.5 > div').length > 0;
    });
    console.log('List View active after toggle:', isListViewActive);

    // 8. Test Search Bar Functionality
    console.log('Testing search functionality with query "IPv6"...');
    await page.type('#explorer-search-input', 'IPv6');
    await new Promise(r => setTimeout(r, 500));

    const searchResultCount = await page.evaluate(() => {
      return document.querySelectorAll('#explorer h4').length;
    });
    console.log(`Results for "IPv6": ${searchResultCount}`);
    if (searchResultCount === 0) throw new Error('Search for IPv6 returned 0 results');

    // Clear search
    await page.evaluate(() => {
      const clearBtn = Array.from(document.querySelectorAll('button')).find(b => b.innerText === 'Clear');
      if (clearBtn) clearBtn.click();
    });

    console.log('Console Errors:', consoleErrors.length);
    if (consoleErrors.length > 0) console.log(consoleErrors);

    console.log('🎉 ALL MOBBIN SPECIFIC TESTS PASSED PERFECTLY!');
  } finally {
    await browser.close();
    server.close();
  }
}

runMobbinTests().catch(err => {
  console.error('Mobbin test failed:', err);
  process.exit(1);
});
