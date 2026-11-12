const puppeteer = require('d:/Work/skechersmiendong/web/node_modules/puppeteer');
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function test() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  // 1. Test user: PHẠM MINH TÙNG
  await page.goto('https://skechersmiendong.tbsgroup2026.workers.dev/work/gemba', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('tbs_current_user', JSON.stringify({
      empCode: '200405004',
      name: 'PHẠM MINH TÙNG',
      roleCode: 'TONG_GIAM_DOC'
    }));
    localStorage.removeItem('gemba_active_user_override');
  });

  await page.reload({ waitUntil: 'networkidle2' });
  await sleep(1500);

  const uName = await page.$eval('#sidebarUserName', el => el.innerText).catch(e => e.message);
  const uRole = await page.$eval('#sidebarUserRole', el => el.innerText).catch(e => e.message);
  console.log('[TEST 1 - PHẠM MINH TÙNG]:', { uName, uRole });

  // 2. Test user: DƯ THỊ THANH TÌNH
  await page.evaluate(() => {
    localStorage.setItem('tbs_current_user', JSON.stringify({
      empCode: '222102020',
      name: 'DƯ THỊ THANH TÌNH',
      roleCode: 'GIAM_DOC'
    }));
    localStorage.removeItem('gemba_active_user_override');
  });
  await page.reload({ waitUntil: 'networkidle2' });
  await sleep(1500);

  const uName2 = await page.$eval('#sidebarUserName', el => el.innerText).catch(e => e.message);
  const uRole2 = await page.$eval('#sidebarUserRole', el => el.innerText).catch(e => e.message);
  console.log('[TEST 2 - DƯ THỊ THANH TÌNH]:', { uName2, uRole2 });

  // 3. Test user: NGUYỄN VĂN TÌNH (MSNV 211206004)
  await page.evaluate(() => {
    localStorage.setItem('tbs_current_user', JSON.stringify({
      empCode: '211206004',
      name: 'NGUYỄN VĂN TÌNH',
      roleCode: 'TRUONG_PHONG'
    }));
    localStorage.removeItem('gemba_active_user_override');
  });
  await page.reload({ waitUntil: 'networkidle2' });
  await sleep(1500);

  const uName3 = await page.$eval('#sidebarUserName', el => el.innerText).catch(e => e.message);
  const uRole3 = await page.$eval('#sidebarUserRole', el => el.innerText).catch(e => e.message);
  const isDenied3 = await page.evaluate(() => document.body.innerText.includes('Từ chối quyền truy cập'));
  console.log('[TEST 3 - NGUYỄN VĂN TÌNH]:', { uName: uName3, uRole: uRole3, isAccessDenied: isDenied3 });

  // 4. Test unauthorized user: NGUYỄN VĂN A
  await page.evaluate(() => {
    localStorage.setItem('tbs_current_user', JSON.stringify({
      empCode: '999999999',
      name: 'NGUYỄN VĂN A',
      roleCode: 'CBCNV'
    }));
    localStorage.removeItem('gemba_active_user_override');
  });
  await page.reload({ waitUntil: 'networkidle2' });
  await sleep(1500);

  const bodyText = await page.evaluate(() => document.body.innerText);
  const hasDenied = bodyText.includes('Từ chối quyền truy cập') || bodyText.includes('Danh sách nhân sự được cấp quyền');
  console.log('[TEST 4 - NGUYỄN VĂN A (Access Denied)]:', hasDenied);

  await browser.close();
}

test().catch(err => {
  console.error('Test error:', err);
  process.exit(1);
});
