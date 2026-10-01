/* Bir bölümün bütün kısımlarını gerçek tarayıcıda (Chromium/Playwright) uçtan uca çözer.
   Kullanım: node tools/tarayici.js <bölümNo> <ekranGörüntüsüKlasörü>
   Her soruda doğruyu bulana kadar seçeneklere tıklar; sonuç ekranını, ilerleme kaydını,
   doğru cevapların A–E dağılımını, konsol hatalarını ve mobil/koyu görünümü kontrol eder. */
const path = require('path');
const {execSync} = require('child_process');
const {chromium} = require(execSync('npm root -g').toString().trim() + '/playwright');

(async () => {
  const root = path.join(__dirname, '..');
  const bolum = Number(process.argv[2] || 1), out = process.argv[3] || '.';
  const url = k => 'file://' + path.join(root, 'index.html') + '#bolum-' + bolum + '-kisim-' + k;
  const browser = await chromium.launch();
  const hatalar = [];

  const ctx = await browser.newContext({viewport: {width: 1100, height: 900}});
  const page = await ctx.newPage();
  page.on('pageerror', e => hatalar.push('pageerror: ' + e.message));
  page.on('console', m => { if(m.type() === 'error') hatalar.push('console: ' + m.text()); });

  for(const k of (process.env.KISIMLAR||"1,2,3,4,5,6,7").split(",").map(Number)){
    await page.goto('about:blank');
    await page.goto(url(k));
    const frameEl = await page.waitForSelector('#contentFrame');
    const frame = await frameEl.contentFrame();
    try { await frame.waitForSelector('.question', {timeout: 5000}); }
    catch(e){ console.log('Kısım ' + k + ': soru bulunamadı (hazır değil mi?)'); continue; }
    for(const q of await frame.$$('.question')){
      for(const b of await q.$$('.option')){
        await b.click();
        if((await b.getAttribute('class')).includes('correct')) break;
      }
    }
    await frame.waitForSelector('#result.show');
    const skor = await frame.$eval('#finalScore', e => e.textContent);
    const konum = await frame.$$eval('.question', qs => qs.map(q => [...q.querySelectorAll('.option')].findIndex(b => b.classList.contains('correct'))));
    const say = [0, 0, 0, 0, 0]; konum.forEach(i => say[i]++);
    const ham = await frame.evaluate(() => /<u>|\[\[|==/.test(document.body.innerText));
    await page.waitForTimeout(300);
    const kayit = await page.evaluate(b => JSON.parse(localStorage.getItem('ecp.ilerleme.v1') || '{}'), bolum);
    console.log(`Kısım ${k}: ${konum.length} soru, sonuç ${skor}, doğru cevap A–E ${JSON.stringify(say)}, ham işaret görünüyor: ${ham}, kayıt: ${JSON.stringify(kayit[bolum + '-' + k] || null)}`);
    await frameEl.screenshot({path: path.join(out, 'b' + bolum + '-k' + k + '.png')});
  }
  await ctx.close();

  const mobil = await browser.newContext({viewport: {width: 390, height: 844}, colorScheme: 'dark'});
  const mp = await mobil.newPage();
  for(const k of [1, 5, 7]){
    await mp.goto('about:blank');
    await mp.goto(url(k));
    const frame = await (await mp.waitForSelector('#contentFrame')).contentFrame();
    await frame.waitForSelector('.question').catch(() => {});
    await mp.waitForTimeout(400);
    const tasma = await mp.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    await mp.screenshot({path: path.join(out, 'b' + bolum + '-mobil-koyu-k' + k + '.png')});
    console.log(`Mobil koyu kısım ${k}: yatay taşma ${tasma}`);
  }
  await browser.close();
  console.log(hatalar.length ? 'TARAYICI HATALARI:\n' + hatalar.join('\n') : 'Tarayıcı hatası yok');
})();
