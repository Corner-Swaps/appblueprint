const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const svgLogoPath = path.join(__dirname, '../public/logo.svg');
const svgRaw = fs.readFileSync(svgLogoPath, 'utf8');

// The solid black background requested by user
const SOLID_BG = '#000000';

// 15% bigger icon transformation: scaled centered at (512.5, 501)
const SVG_15_PERCENT_BIGGER = svgRaw.replace(
  '<g fill="#FFFFFF">',
  '<g fill="#FFFFFF" transform="matrix(1.15 0 0 1.15 -76.875 -75.15)">'
);

async function generateAssets() {
  console.log('Launching Chrome to render razor-sharp vector assets...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Render AppIcon-512@2x.png (1024x1024) - Solid Black with Crisp White Logo (15% bigger)
  console.log('Rendering 1024x1024 master AppIcon-512@2x.png (black background, 15% bigger white logo)...');
  await page.setViewport({ width: 1024, height: 1024, deviceScaleFactor: 1 });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { width: 1024px; height: 1024px; overflow: hidden; background: ${SOLID_BG}; }
          svg { width: 1024px; height: 1024px; display: block; }
        </style>
      </head>
      <body>
        ${SVG_15_PERCENT_BIGGER}
      </body>
    </html>
  `);

  const appIconPath = path.join(__dirname, '../ios/App/App/Assets.xcassets/AppIcon.appiconset/AppIcon-512@2x.png');
  await page.screenshot({ path: appIconPath, omitBackground: false });
  console.log('Saved:', appIconPath);

  // 2. Render public/icon-512.png
  console.log('Rendering public/icon-512.png...');
  await page.setViewport({ width: 512, height: 512, deviceScaleFactor: 1 });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { width: 512px; height: 512px; overflow: hidden; background: ${SOLID_BG}; }
          svg { width: 512px; height: 512px; display: block; }
        </style>
      </head>
      <body>
        ${SVG_15_PERCENT_BIGGER}
      </body>
    </html>
  `);
  const icon512Path = path.join(__dirname, '../public/icon-512.png');
  await page.screenshot({ path: icon512Path, omitBackground: false });
  console.log('Saved:', icon512Path);

  // 3. Render transparent pure white logo: public/logo.png, public/logo_composite.png, public/logo_solid_white.png (1024x1024)
  console.log('Rendering transparent pure white logo (1024x1024)...');
  await page.setViewport({ width: 1024, height: 1024, deviceScaleFactor: 1 });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { width: 1024px; height: 1024px; overflow: hidden; background: transparent; }
          svg { width: 1024px; height: 1024px; display: block; }
        </style>
      </head>
      <body>
        ${SVG_15_PERCENT_BIGGER}
      </body>
    </html>
  `);
  const logoPngPath = path.join(__dirname, '../public/logo.png');
  await page.screenshot({ path: logoPngPath, omitBackground: true });
  console.log('Saved:', logoPngPath);

  const logoCompPath = path.join(__dirname, '../public/logo_composite.png');
  await page.screenshot({ path: logoCompPath, omitBackground: true });
  console.log('Saved:', logoCompPath);

  const logoSolidWhitePath = path.join(__dirname, '../public/logo_solid_white.png');
  await page.screenshot({ path: logoSolidWhitePath, omitBackground: true });
  console.log('Saved:', logoSolidWhitePath);

  // 4. Render public/icon-192.png
  console.log('Rendering public/icon-192.png...');
  await page.setViewport({ width: 192, height: 192, deviceScaleFactor: 1 });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { width: 192px; height: 192px; overflow: hidden; background: ${SOLID_BG}; }
          svg { width: 192px; height: 192px; display: block; }
        </style>
      </head>
      <body>
        ${SVG_15_PERCENT_BIGGER}
      </body>
    </html>
  `);
  const icon192Path = path.join(__dirname, '../public/icon-192.png');
  await page.screenshot({ path: icon192Path, omitBackground: false });
  console.log('Saved:', icon192Path);

  // 5. Render public/apple-touch-icon.png (180x180)
  console.log('Rendering public/apple-touch-icon.png...');
  await page.setViewport({ width: 180, height: 180, deviceScaleFactor: 1 });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { width: 180px; height: 180px; overflow: hidden; background: ${SOLID_BG}; }
          svg { width: 180px; height: 180px; display: block; }
        </style>
      </head>
      <body>
        ${SVG_15_PERCENT_BIGGER}
      </body>
    </html>
  `);
  const appleTouchPath = path.join(__dirname, '../public/apple-touch-icon.png');
  await page.screenshot({ path: appleTouchPath, omitBackground: false });
  console.log('Saved:', appleTouchPath);

  // 6. Render public/favicon.png (64x64)
  console.log('Rendering public/favicon.png...');
  await page.setViewport({ width: 64, height: 64, deviceScaleFactor: 1 });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { width: 64px; height: 64px; overflow: hidden; background: ${SOLID_BG}; }
          svg { width: 64px; height: 64px; display: block; }
        </style>
      </head>
      <body>
        ${SVG_15_PERCENT_BIGGER}
      </body>
    </html>
  `);
  const faviconPath = path.join(__dirname, '../public/favicon.png');
  await page.screenshot({ path: faviconPath, omitBackground: false });
  console.log('Saved:', faviconPath);

  // 7. Render iOS native launch images in Splash.imageset (2732x2732) - Solid Black
  console.log('Rendering iOS native launch images (2732x2732) on solid black...');
  await page.setViewport({ width: 2732, height: 2732, deviceScaleFactor: 1 });
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            width: 2732px;
            height: 2732px;
            overflow: hidden;
            background: ${SOLID_BG};
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .logo-container {
            width: 820px;
            height: 820px;
          }
          svg { width: 100%; height: 100%; display: block; }
        </style>
      </head>
      <body>
        <div class="logo-container">
          ${SVG_15_PERCENT_BIGGER}
        </div>
      </body>
    </html>
  `);

  const splashDir = path.join(__dirname, '../ios/App/App/Assets.xcassets/Splash.imageset');
  if (fs.existsSync(splashDir)) {
    const s1 = path.join(splashDir, 'splash-2732x2732.png');
    const s2 = path.join(splashDir, 'splash-2732x2732-1.png');
    const s3 = path.join(splashDir, 'splash-2732x2732-2.png');
    await page.screenshot({ path: s1, omitBackground: false });
    fs.copyFileSync(s1, s2);
    fs.copyFileSync(s1, s3);
    console.log('Saved native splash images:', s1, s2, s3);
  }

  await browser.close();
  console.log('ALL ASSETS GENERATED WITH CRISP VECTOR PRECISION AND 15% EXPANSION!');
}

generateAssets().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
