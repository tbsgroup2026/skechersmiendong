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
  const uAvatar = await page.$eval('#sidebarUserAvatar', el => el.innerText).catch(e => e.message);
  console.log('[TEST 1 - PHẠM MINH TÙNG]:', { uName, uRole, uAvatar });

  // 2. Test user: ĐỖ ĐẮC MIỀN
  await page.evaluate(() => {
    localStorage.setItem('tbs_current_user', JSON.stringify({
      empCode: '249507002',
      name: 'ĐỖ ĐẮC MIỀN',
      roleCode: 'TONG_GIAM_DOC'
    }));
    localStorage.removeItem('gemba_active_user_override');
  });
  await page.reload({ waitUntil: 'networkidle2' });
  await sleep(1500);

  const uName2 = await page.$eval('#sidebarUserName', el => el.innerText).catch(e => e.message);
  const uRole2 = await page.$eval('#sidebarUserRole', el => el.innerText).catch(e => e.message);
  console.log('[TEST 2 - ĐỖ ĐẮC MIỀN]:', { uName2, uRole2 });

  // 3. Test user: DƯ THỊ THANH TÌNH
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

  const uName3 = await page.$eval('#sidebarUserName', el => el.innerText).catch(e => e.message);
  const uRole3 = await page.$eval('#sidebarUserRole', el => el.innerText).catch(e => e.message);
  console.log('[TEST 3 - DƯ THỊ THANH TÌNH]:', { uName3, uRole3 });

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