const puppeteer = require('d:/Work/skechersmiendong/web/node_modules/puppeteer');
const sleep = ms => new Promise(r => setTimeout(r, ms));

async function verify() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  page.on('console', msg => console.log('[BROWSER CONSOLE]', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('[BROWSER PAGE ERROR]', err.message));

  await page.goto('https://skechersmiendong.tbsgroup2026.workers.dev/work/gemba', { waitUntil: 'domcontentloaded' });
  await page.evaluate(() => {
    localStorage.setItem('tbs_current_user', JSON.stringify({
      empCode: '202608001',
      name: 'PHẠM NGUYỄN ANH HUY',
      roleCode: 'SUPER_ADMIN'
    }));
    localStorage.removeItem('gemba_active_user_override');
  });

  await page.reload({ waitUntil: 'networkidle2' });
  await sleep(2500);

  const kpis = await page.evaluate(() => {
    return {
      kpiTotal: document.getElementById('kpiTotal')?.innerText,
      kpiOpen: document.getElementById('kpiOpen')?.innerText,
      kpiInProgress: document.getElementById('kpiInProgress')?.innerText,
      kpiDone: document.getElementById('kpiDone')?.innerText,
      kpiOverdue: document.getElementById('kpiOverdue')?.innerText,
      kpiThisMonth: document.getElementById('kpiThisMonth')?.innerText,
      user: document.getElementById('sidebarUserName')?.innerText
    };
  });

  console.log('[DASHBOARD VERIFICATION]:', kpis);
  await page.screenshot({ path: 'gas_gemba/dashboard_verified.png' });
  await browser.close();
}

verify().catch(console.error);
