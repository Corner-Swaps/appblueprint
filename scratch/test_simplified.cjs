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

  // Academy Tab
  console.log('Navigating to Academy tab...');
  const academyTabBtn = await page.waitForSelector('button[aria-label="Academy and Resources"]');
  await academyTabBtn.click();
  await new Promise(r => setTimeout(r, 800));

  // Open the Typography category pill
  console.log('Clicking Typography category pill in Academy...');
  const typographyCat = await page.waitForSelector('#typography');
  await typographyCat.click();
  await new Promise(r => setTimeout(r, 800));

  // Expand the first tool (Typewolf)
  console.log('Expanding Typewolf item...');
  const typewolfItem = await page.waitForSelector('#type-typewolf');
  await typewolfItem.click();
  await new Promise(r => setTimeout(r, 800));

  // Scroll down so the expanded drawer is visible
  await page.evaluate(() => window.scrollBy(0, 300));
  await new Promise(r => setTimeout(r, 400));

  await page.screenshot({ path: '/Users/slava/.gemini/antigravity/brain/24076258-0334-4783-a5da-ea69c5bcd70f/screenshot_academy_item_expanded.png' });
  console.log('Saved screenshot_academy_item_expanded.png');

  const academyHeaders = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('#type-typewolf .apple-drawer-content span.font-bold.uppercase')).map(el => el.textContent.trim());
  });
  console.log('Drawer subsection headers found in Typewolf:', academyHeaders);

  await browser.close();
  console.log('Verification script complete.');
})();
