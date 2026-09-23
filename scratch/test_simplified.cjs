const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 393, height: 852, deviceScaleFactor: 2 });

  await page.goto('http://localhost:5173/?mode=app#app', { waitUntil: 'networkidle0' });

  // Wait 3.5s for splash dismissal and mount
  await new Promise(r => setTimeout(r, 3500));

  // 1. Academy Tab
  console.log('Navigating to Academy tab...');
  const academyTabBtn = await page.waitForSelector('button[aria-label="Academy and Resources"]');
  await academyTabBtn.click();
  await new Promise(r => setTimeout(r, 800));

  // Open the first category pill (e.g., Typography or AI Models)
  console.log('Clicking first category pill in Academy...');
  const firstCategory = await page.waitForSelector('[id^="sec-"]');
  await firstCategory.click();
  await new Promise(r => setTimeout(r, 700));

  // Click the first resource item by its container ID
  console.log('Expanding first resource item...');
  const firstResource = await page.waitForSelector('div[id^="type-"], div[id^="ai-"]');
  await firstResource.click();
  await new Promise(r => setTimeout(r, 700));

  // Scroll down so the expanded drawer is visible
  await page.evaluate(() => window.scrollBy(0, 300));
  await new Promise(r => setTimeout(r, 400));

  await page.screenshot({ path: '/Users/slava/.gemini/antigravity/brain/24076258-0334-4783-a5da-ea69c5bcd70f/screenshot_academy_non_coder_friendly.png' });
  console.log('Saved screenshot_academy_non_coder_friendly.png');

  const academyHeaders = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.apple-drawer-content span.font-bold.uppercase')).map(el => el.textContent.trim());
  });
  console.log('Drawer subsection headers found in Academy:', academyHeaders);

  await browser.close();
  console.log('Verification script complete.');
})();
