import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ARTIFACTS_DIR = '/Users/slava/.gemini/antigravity/brain/02a23414-cdda-418b-b018-4496b05c23b5';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 430, height: 932, deviceScaleFactor: 2 });

  await page.evaluateOnNewDocument(() => {
    localStorage.setItem('appblueprint_legal_agreed_v1', 'true');
    localStorage.setItem('launchready_legal_agreed_v1', 'true');
  });

  await page.goto('http://127.0.0.1:4182/?mode=app', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));

  // Switch to Resources tab
  await page.evaluate(() => {
    const dockButtons = Array.from(document.querySelectorAll('nav button, div[role="navigation"] button, .fixed button'));
    if (dockButtons.length >= 3) {
      dockButtons[2].click();
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  // Find Typography, scroll it into view, and expand it
  await page.evaluate(() => {
    const h2s = Array.from(document.querySelectorAll('h2'));
    const typeHeader = h2s.find(t => t.textContent && t.textContent.includes('Typography'));
    if (typeHeader) {
      typeHeader.scrollIntoView({ behavior: 'instant', block: 'start' });
      const card = typeHeader.closest('.rounded-3xl');
      if (card) {
        // click the header or expand arrow
        const btn = card.querySelector('button');
        if (btn) btn.click();
        else card.click();
      }
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify_typography_items_scrolled.png'),
    fullPage: false
  });

  // Expand Typewolf
  await page.evaluate(() => {
    const h3s = Array.from(document.querySelectorAll('h3'));
    const wolf = h3s.find(t => t.textContent && t.textContent.includes('Typewolf'));
    if (wolf) {
      wolf.scrollIntoView({ behavior: 'instant', block: 'start' });
      const card = wolf.closest('.rounded-3xl') || wolf;
      card.click();
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify_typewolf_expanded_before_copy.png'),
    fullPage: false
  });

  // Click Copy Prompt
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const copyBtn = btns.find(b => b.textContent && b.textContent.includes('Copy Prompt'));
    if (copyBtn) {
      copyBtn.scrollIntoView({ behavior: 'instant', block: 'center' });
      copyBtn.click();
    }
  });
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify_typewolf_expanded_after_copy.png'),
    fullPage: false
  });

  await browser.close();
  console.log('Scroll screenshots captured successfully!');
}

run().catch(console.error);
