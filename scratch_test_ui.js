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

  // 1. Click Academy and Resources dock tab
  await page.waitForSelector('button[aria-label="Academy and Resources"]');
  await page.click('button[aria-label="Academy and Resources"]');
  await new Promise(r => setTimeout(r, 800));

  // 2. Expand Typography category
  await page.evaluate(() => {
    const h2s = Array.from(document.querySelectorAll('h2'));
    const typeHeader = h2s.find(t => t.textContent && t.textContent.includes('Typography'));
    if (typeHeader) {
      typeHeader.scrollIntoView({ behavior: 'instant', block: 'center' });
      const parent = typeHeader.closest('.space-y-2\\.5') || typeHeader.parentElement;
      if (parent) parent.click();
    }
  });
  await new Promise(r => setTimeout(r, 800));

  // 3. Expand Typewolf item
  await page.evaluate(() => {
    const h3s = Array.from(document.querySelectorAll('h3'));
    const wolf = h3s.find(t => t.textContent && t.textContent.includes('Typewolf'));
    if (wolf) {
      wolf.scrollIntoView({ behavior: 'instant', block: 'start' });
      const headerDiv = wolf.closest('.space-y-2') || wolf.parentElement;
      if (headerDiv) headerDiv.click();
    }
  });
  await new Promise(r => setTimeout(r, 800));

  // 4. Scroll copy button into view
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const copyBtn = btns.find(b => b.textContent && b.textContent.includes('Copy Prompt'));
    if (copyBtn) {
      copyBtn.scrollIntoView({ behavior: 'instant', block: 'center' });
    }
  });
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify_typewolf_prompt_before_click.png'),
    fullPage: false
  });

  // 5. Click Copy Prompt button
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const copyBtn = btns.find(b => b.textContent && b.textContent.includes('Copy Prompt'));
    if (copyBtn) {
      copyBtn.click();
    }
  });
  await new Promise(r => setTimeout(r, 500));

  await page.screenshot({
    path: path.join(ARTIFACTS_DIR, 'verify_typewolf_prompt_after_click.png'),
    fullPage: false
  });

  await browser.close();
  console.log('Done!');
}

run().catch(console.error);
