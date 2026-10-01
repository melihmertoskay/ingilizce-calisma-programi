/* Bölüm verisini doğrular: her kısmı üretir, alanları ve soru yapısını kontrol eder.
   Kullanım: node tools/dogrula.js <bölümNo> [çıktıKlasörü]
   Çıktı klasörü verilirse üretilen kısımlar k1.html … k7.html olarak oraya yazılır. */
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const bolum = Number(process.argv[2] || 1), out = process.argv[3];

global.window = {};
require(path.join(root, 'data/manifest.js'));
require(path.join(root, 'data/sablon.js'));
let kayit = null;
window.registerBolum = (n, k) => { if(n === bolum) kayit = k; };
require(path.join(root, 'data/bolum-' + bolum + '.js'));
if(!kayit){ console.error('Bölüm ' + bolum + ' kayıt olmadı'); process.exit(1); }

const hatalar = [];
const veriAl = html => JSON.parse(html.match(/\}\)\((\{[\s\S]*\})\);<\/script>/)[1]);

for(const k of Object.keys(kayit)){
  const html = kayit[k]();
  if(out) fs.writeFileSync(path.join(out, 'k' + k + '.html'), html);
  if(!html.includes('<html lang="tr">')) hatalar.push('k' + k + ': <html lang="tr"> eksik');
  for(const id of ['answered', 'totalTop', 'score', 'result'])
    if(!html.includes('id="' + id + '"')) hatalar.push('k' + k + ': #' + id + ' eksik');
}

/* Kısım 1–4: kelimeler */
const tum = [];
for(const k of [1, 2, 3, 4]){
  if(!kayit[k]) continue;
  const V = veriAl(kayit[k]());
  if(V.words.length !== 25) hatalar.push('k' + k + ': 25 kelime değil (' + V.words.length + ')');
  for(const w of V.words){
    tum.push(w.w);
    for(const f of ['no', 'w', 'pos', 'tr', 'syn', 'ex', 'trEx', 'q', 'trQ', 'clue'])
      if(!w[f]) hatalar.push('kelime ' + w.no + ': ' + f + ' eksik');
    if(!['verb', 'noun', 'adj', 'adv'].includes(w.pos)) hatalar.push(w.w + ': pos geçersiz');
    if(!/___/.test(w.q)) hatalar.push(w.w + ': q içinde ___ yok');
    if(w.q.replace('___', '').toLowerCase().includes(w.w.toLowerCase())) hatalar.push(w.w + ': q cevabı açık ediyor');
    if(!new RegExp('\\b' + w.w + '(s|es|d|ed|ing)?\\b', 'i').test(w.ex)) hatalar.push(w.w + ': ex içinde kelime bulunamadı (vurgulanamaz)');
    if(w.q.replace('___', w.w) === w.ex) hatalar.push(w.w + ': q, kart örneğiyle aynı');
    for(const h of (w.haric || [])) if(!V.words.some(x => x.w === h)) hatalar.push(w.w + ': haric "' + h + '" bu kısımda yok');
    const havuz = V.words.filter(x => x.no !== w.no && !(w.haric || []).includes(x.w) && !(x.haric || []).includes(w.w));
    if(havuz.length < 3) hatalar.push(w.w + ': yanlış seçenek havuzu 3’ten az');
  }
  const m = window.PROGRAM.hazir[bolum] && window.PROGRAM.hazir[bolum][k];
  if(!m || m.join(',') !== V.words.map(w => w.w).join(',')) hatalar.push('manifest k' + k + ' önizleme etiketleri kelimelerle aynı değil');
}
if(tum.length && new Set(tum).size !== tum.length) hatalar.push('tekrar eden kelime var');

/* Kısım 5–7: sorular */
for(const k of [5, 6, 7]){
  if(!kayit[k]) continue;
  const T = veriAl(kayit[k]());
  const dagilim = {};
  T.questions.forEach((q, i) => {
    const yer = 'k' + k + ' soru ' + (i + 1);
    if(!T.sections[q.s]) hatalar.push(yer + ': bölüm yok (' + q.s + ')');
    const beklenen = k === 7 ? 5 : 4;
    if(q.o.length !== beklenen) hatalar.push(yer + ': ' + q.o.length + ' seçenek (beklenen ' + beklenen + ')');
    if(!(q.a >= 0 && q.a < q.o.length)) hatalar.push(yer + ': a geçersiz');
    q.o.forEach((o, j) => { if(o.length !== 2 || !o[0] || !o[1]) hatalar.push(yer + ' seçenek ' + j + ': metin/açıklama eksik'); });
    if(!/^Doğru/.test(q.o[q.a][1])) hatalar.push(yer + ': doğru seçeneğin açıklaması "Doğru" ile başlamıyor');
    q.o.forEach((o, j) => { if(j !== q.a && /^Doğru/.test(o[1])) hatalar.push(yer + ': yanlış seçenek "Doğru" diyor'); });
    if(new Set(q.o.map(o => o[0])).size !== q.o.length) hatalar.push(yer + ': tekrar eden seçenek');
    dagilim[q.s] = (dagilim[q.s] || 0) + 1;
  });
  console.log('Kısım ' + k + ': ' + T.questions.length + ' soru ' + JSON.stringify(dagilim));
}

console.log(hatalar.length ? 'HATALAR:\n' + hatalar.join('\n') : 'Veri kontrolü: sorun yok');
process.exit(hatalar.length ? 1 : 0);
