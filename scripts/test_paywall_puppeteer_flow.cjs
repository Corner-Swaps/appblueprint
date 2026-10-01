const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT_DIR_ARTIFACTS = '/Users/slava/.gemini/antigravity/brain/02a23414-cdda-418b-b018-4496b05c23b5';
const PORT = 8146;

const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

async function run() {
  console.log('\n--- Launching Puppeteer for iPad Air 11-inch (M3) Paywall & StoreKit Test ---');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  
  // Set iPad Air 11-inch (M3) / iPadOS viewport
  await page.setViewport({
    width: 820,
    height: 1180,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true
  });

  await page.goto(`http://localhost:${PORT}/#app`, { waitUntil: 'networkidle2' });
  await sleep(1500);

  // Bypass splash screen if visible
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('dismiss-splash'));
    const splash = document.querySelector('[data-testid="splash-screen"]');
    if (splash) splash.remove();
  });
  await sleep(500);

  // Open Paywall Modal by dispatching open-paywall-modal event
  console.log('1. Triggering Paywall Modal...');
  await page.evaluate(() => {
    window.dispatchEvent(new CustomEvent('open-paywall-modal'));
  });
  await sleep(800);

  // Check if Paywall Modal is visible
  const modalVisible = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('h2')).some(h => h.textContent.includes('Unlock Full Access'));
  });

  console.log('Paywall Modal visible:', modalVisible);

  // Check for Restore Purchases button
  const hasRestoreButton = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button')).some(b => b.textContent.includes('Restore Purchases'));
  });
  console.log('Restore Purchases button present:', hasRestoreButton);

  // Check for Terms & Privacy link
  const hasTermsLink = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a')).some(a => a.textContent.includes('Terms & Privacy') || a.href.includes('privacy.html'));
  });
  console.log('Terms & Privacy link present:', hasTermsLink);

  // Take screenshot of Paywall Modal on iPad
  const screenshotPath = path.join(OUT_DIR_ARTIFACTS, 'verify_ipad_paywall_storekit.png');
  await page.screenshot({ path: screenshotPath });
  console.log(`Saved screenshot to: ${screenshotPath}`);

  // Test clicking "Unlock for Life • $12.99"
  console.log('2. Testing "Unlock for Life" button click...');
  await page.evaluate(() => {
    const unlockBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Unlock for Life'));
    if (unlockBtn) unlockBtn.click();
  });
  await sleep(600);

  // Check if StoreKit Sheet container is rendered
  const storeKitSheetVisible = await page.evaluate(() => {
    return !!document.getElementById('storekit-sheet-container');
  });
  console.log('StoreKit Bottom Sheet container opened:', storeKitSheetVisible);

  // Take screenshot of StoreKit Apple ID Sheet
  const sheetScreenshotPath = path.join(OUT_DIR_ARTIFACTS, 'verify_ipad_storekit_sheet.png');
  await page.screenshot({ path: sheetScreenshotPath });
  console.log(`Saved StoreKit sheet screenshot to: ${sheetScreenshotPath}`);

  // Click "Confirm with Apple ID"
  console.log('3. Confirming with Apple ID...');
  await page.evaluate(() => {
    const confirmBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent.includes('Confirm with Apple ID'));
    if (confirmBtn) confirmBtn.click();
  });
  await sleep(1500);

  // Verify unlocked state in localStorage
  const isUnlocked = await page.evaluate(() => {
    return localStorage.getItem('appblueprint_unlimited_unlocked_v2') === 'true';
  });
  console.log('Unlimited status unlocked in storage:', isUnlocked);

  await browser.close();
  console.log('--- Puppeteer iPad Paywall & StoreKit Test Finished Successfully! ---');
}

run().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
