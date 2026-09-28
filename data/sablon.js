/* Ortak çalışma şablonu.
   Bölüm dosyaları (data/bolum-<no>.js) yalnızca veri verir; her kısmın iframe içinde
   tek başına çalışan HTML belgesi burada üretilir. Böylece bütün bölümler aynı
   görünümü, aynı etkileşimi ve kabukla aynı köprü kimliklerini
   (#answered, #totalTop, #score, #result) kullanır.

   window.Sablon.kelimeKismi(ayar)  → Kısım 1–4: kelime kartları + boşluk doldurma
   window.Sablon.testKismi(ayar)    → Kısım 5–7: konu anlatımı, karma çalışma, sınav

   Soru metinlerinde kullanılabilecek küçük işaretler (açıklamalarda da geçerli):
     [[metin]]  altı çizili     ==metin==  vurgulu     **metin**  kalın     \n  yeni satır
   lesson, passage ve intro alanları doğrudan HTML olarak yazılır. */
(function(){
  'use strict';

  const ORTAK_CSS = `
:root{--ink:#19324a;--muted:#63788d;--paper:#fff;--bg:#edf7f3;--blue:#2867d7;--green:#15966a;--green-soft:#dcf8ec;--red:#d64b55;--red-soft:#ffe8ea;--line:#dbe7e3;--yellow:#ffcf56;--purple:#7c3aad;--purple-soft:#f6e9ff;--exam:#9f3140;--exam-soft:#fff1f2}
*{box-sizing:border-box}html{scroll-behavior:smooth}
body{margin:0;font-family:system-ui,-apple-system,"Segoe UI",sans-serif;color:var(--ink);background:var(--bg);min-height:100vh}
.wrap{width:min(920px,calc(100% - 28px));margin:26px auto 60px}
.stats{display:grid;grid-template-columns:1fr auto;gap:14px;align-items:center;margin:8px 0 16px;background:#ffffffdc;padding:13px 16px;border:1px solid #fff;border-radius:16px;box-shadow:0 8px 24px #224c6520}
.progress{height:10px;background:#d8e6e3;border-radius:99px;overflow:hidden}
.bar{height:100%;width:0;background:linear-gradient(90deg,var(--green),#54c796);transition:width .35s ease}
.score{font-weight:800;white-space:nowrap;font-size:13px}
.timer{font-weight:700;color:var(--muted)}
.intro{background:linear-gradient(135deg,#f5f9ff,#f3fbf7);border:1px solid var(--line);border-radius:16px;padding:16px 18px;margin-bottom:16px}
.intro h2{font-size:18px;margin:0 0 6px}.intro p{font-size:13px;line-height:1.6;color:#496477;margin:0 0 6px}.intro p:last-child{margin-bottom:0}
.section-title{display:flex;align-items:center;gap:10px;margin:24px 4px 10px}
.section-title span{display:grid;place-items:center;min-width:34px;height:34px;border-radius:10px;background:#dfeaff;color:var(--blue);font-weight:900}
.section-title h2{margin:0;font-size:18px;color:#284b66}.section-title p{margin:2px 0 0;color:var(--muted);font-size:12px}
.badge{display:inline-block;vertical-align:middle;margin-left:6px;font-size:10.5px;font-weight:850;letter-spacing:.02em;padding:3px 8px;border-radius:999px;background:var(--exam-soft);color:var(--exam)}
.instructions{font-size:12px;color:var(--muted);font-style:italic;margin:4px 3px 8px}
.passage{background:#f8fbff;border:1px solid #cfdff4;border-left:5px solid var(--blue);border-radius:14px;padding:15px 17px;margin:8px 0 12px;font-size:14px;line-height:1.75}
.passage b{color:var(--blue)}
.question mark,.passage mark{background:#fff1b8;color:#4b3b00;border-radius:4px;padding:0 2px}
.bosluk{white-space:nowrap}
.lesson{background:linear-gradient(145deg,#fff,#f8fbff);border:1px solid #d6e3ef;border-radius:16px;margin:8px 0 14px;padding:16px;box-shadow:0 7px 22px #284d610d}
.lesson-lead{margin:0 0 10px;line-height:1.6;color:#35566b;font-size:13px}.lesson-lead:last-child{margin-bottom:0}
.viewpoint{background:#eef7ff;border-left:4px solid var(--blue);border-radius:10px;padding:10px 12px;margin:0 0 12px;line-height:1.5;font-size:12.5px}
.tense-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.tense-card{background:#fff;border:1px solid var(--line);border-radius:12px;padding:11px}
.tense-card h3{font-size:14px;margin:0 0 4px;color:#234f72}
.formula{display:inline-block;background:#e8f0ff;color:#2459ad;border-radius:7px;padding:3px 7px;margin:0 0 5px;font-size:11.5px;font-weight:850}
.tense-card p{font-size:12px;line-height:1.48;margin:3px 0;color:#405a70}.tense-card .example{color:#173f58;font-style:italic}
.question{background:var(--paper);border:1px solid var(--line);border-radius:15px;margin:9px 0;padding:15px;box-shadow:0 8px 30px #284d6110}
.qtop{display:flex;gap:12px;align-items:flex-start}
.num{display:grid;place-items:center;min-width:30px;height:30px;border-radius:8px;background:#e6efff;color:var(--blue);font-weight:900;font-size:12px}
.question h3{font-size:14.5px;line-height:1.6;margin:3px 0 11px;font-weight:700}
.options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}
.options.tek{grid-template-columns:1fr}
button.option{font:inherit;text-align:left;border:2px solid var(--line);border-radius:10px;background:#fff;padding:9px 11px;color:var(--ink);cursor:pointer;min-height:42px;font-size:13px;line-height:1.45}
button.option:hover{border-color:#84a8e8;background:#f5f8ff}
button.option.correct{border-color:var(--green);background:var(--green-soft);font-weight:800}
button.option.wrong{border-color:var(--red);background:var(--red-soft)}
.feedback{display:none;margin-top:9px;padding:10px 12px;border-radius:11px;line-height:1.55;font-size:12.5px}
.feedback.show{display:block}
.feedback.good{background:var(--green-soft);border-left:5px solid var(--green)}
.feedback.bad{background:var(--red-soft);border-left:5px solid var(--red)}
.feedback strong{display:block;margin-bottom:3px}
.rule{display:block;margin-top:6px;color:#35566b}
.result{display:none;background:#183e67;color:#fff;border-radius:20px;padding:24px;margin-top:24px}
.result.show{display:block}.result-head{text-align:center}
.result .big{font-size:40px;font-weight:900;margin:5px 0}
.result-note{margin-top:6px;font-size:13px;color:#d6e6ed}
.diagnosis{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:17px 0}
.diag{background:#ffffff13;border:1px solid #ffffff25;border-radius:11px;padding:9px 11px}
.diag-top{display:flex;justify-content:space-between;gap:8px;font-weight:800;font-size:12px}
.diag small{display:block;color:#d6e6ed;margin-top:3px}
.actions{display:flex;justify-content:center;flex-wrap:wrap;gap:10px;margin-top:18px}
.action{border:0;background:var(--yellow);color:#463400;font-weight:900;border-radius:13px;padding:12px 18px;cursor:pointer}
.action.secondary{background:#fff;color:#183e67}
.tip{font-size:12px;color:var(--muted);margin:16px 3px;text-align:center;line-height:1.55}
.card-grid{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}
.card{perspective:1200px;height:250px}
.card-inner{position:relative;width:100%;height:100%;transition:transform .5s cubic-bezier(.4,.2,.2,1);transform-style:preserve-3d;cursor:pointer}
.card.flipped .card-inner{transform:rotateY(180deg)}
.card-face{position:absolute;inset:0;backface-visibility:hidden;border-radius:12px;padding:11px;display:flex;flex-direction:column}
.card-front{background:#fff;border:1px solid var(--line);align-items:flex-start;justify-content:space-between}
.card-back{background:#f3fbf7;border:1px solid #b9ddc9;transform:rotateY(180deg);justify-content:center;gap:6px;overflow:auto}
.pos-tag{font-size:10px;font-weight:800;padding:3px 7px;border-radius:7px}
.pos-tag.verb{background:#e6f0ff;color:#2459ad}.pos-tag.noun{background:#dff5ea;color:#0d7a55}
.pos-tag.adj{background:#fff1e2;color:#a15d0c}.pos-tag.adv{background:#f6e9ff;color:#7c3aad}
.card-word{font-size:16px;font-weight:850;margin-top:auto}
.card-hint{font-size:11px;color:#a5b4bd;align-self:flex-end}
.card-meaning{font-weight:800;color:#0d7a55;font-size:13px;text-align:center}
.card-example{font-size:11.5px;color:#3c5b6c;line-height:1.4;text-align:center}
.card-example b{color:#0d7a55}
.card-synonyms,.card-other{font-size:10.5px;color:#5c7484;line-height:1.35;text-align:center}
.card-other{color:#8a5d00}
@media(max-width:700px){.options,.diagnosis,.tense-grid{grid-template-columns:1fr}.stats{grid-template-columns:1fr}.score{white-space:normal}.card-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.card{height:230px}.passage{font-size:13px}.question{padding:13px}}
@media(max-width:400px){.card-grid{grid-template-columns:1fr}.card{height:210px}}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
`;

  function esc(v){
    return String(v).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  }

  /* Veriyi <script> içine güvenle gömmek için "<" karakterleri kaçırılır. */
  function gomuluVeri(v){
    return JSON.stringify(v).replace(/</g, '\\u003c');
  }

  function belge(baslik, govde, calistirici, veri){
    return '<!doctype html>\n<html lang="tr">\n<head>\n<meta charset="utf-8">\n'
      + '<meta name="viewport" content="width=device-width, initial-scale=1">\n'
      /* Kabukla aynı renk şeması: aksi hâlde koyu sistemde iframe beyaz zeminle çizilir. */
      + '<meta name="color-scheme" content="light dark">\n'
      + '<title>' + esc(baslik) + '</title>\n<style>' + ORTAK_CSS + '</style>\n</head>\n<body>\n'
      + '<main class="wrap">\n' + govde + '\n</main>\n'
      + '<script>(' + calistirici.toString() + ')(' + gomuluVeri(veri) + ');<\/script>\n'
      + '</body>\n</html>\n';
  }

  function sonucBolumu(baslik, toplam, ekstra){
    return '<section class="result" id="result" aria-live="polite"><div class="result-head"><div>' + esc(baslik)
      + '</div><div class="big" id="finalScore">0/' + toplam + '</div><div id="finalMessage"></div>'
      + '<div class="result-note" id="finalNote"></div></div>' + (ekstra || '')
      + '<div class="actions"><button class="action" type="button" id="retryMistakes">↻ Yalnız yanlışları çöz</button>'
      + '<button class="action secondary" type="button" id="retryAll">Tümünü yeniden çöz</button></div></section>';
  }

  /* ------------------------------------------------------------------
     Kısım 1–4: kelime kartları + boşluk doldurma
     Kelime alanları:
       no, w (sözlük biçimi), pos (verb|noun|adj|adv), tr, syn,
       ex / trEx  → kartın arkasındaki örnek cümle ve Türkçesi
       q / trQ    → alıştırma cümlesi (kartınkinden farklı; boşluk "___")
       clue       → alıştırma cümlesinde doğru kelimeyi gösteren ipucu
       diger      → (isteğe bağlı) sınavda karşına çıkabilecek diğer anlam/kullanım
       haric      → (isteğe bağlı) bu cümlede de doğru olabileceği için
                    yanlış seçenek olarak gösterilmeyecek kelimeler
     ------------------------------------------------------------------ */
  function kelimeCalistir(V){
    var words = V.words;
    var posLabel = {verb:'fiil', noun:'isim', adj:'sıfat', adv:'zarf'};
    function esc(v){ return String(v).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
    function shuffle(a){ var o = a.slice(); for(var i = o.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var t = o[i]; o[i] = o[j]; o[j] = t; } return o; }
    function haricMi(a, b){ return (a.haric || []).indexOf(b.w) >= 0 || (b.haric || []).indexOf(a.w) >= 0; }
    function secenekler(t){
      var secilen = shuffle(words.filter(function(x){ return x.no !== t.no && x.pos === t.pos && !haricMi(t, x); })).slice(0, 3);
      if(secilen.length < 3){
        var diger = words.filter(function(x){ return x.no !== t.no && x.pos !== t.pos && !haricMi(t, x); });
        secilen = secilen.concat(shuffle(diger).slice(0, 3 - secilen.length));
      }
      return shuffle(secilen.concat([t]));
    }
    function vurgula(item){
      var re = new RegExp('\\b' + item.w + '(s|es|d|ed|ing)?\\b', 'i');
      return esc(item.ex).replace(re, function(m){ return '<b>' + m + '</b>'; });
    }

    var cardGrid = document.getElementById('cardGrid');
    cardGrid.innerHTML = words.map(function(item){
      return '<div class="card" tabindex="0" role="button" aria-label="' + esc(item.w) + ' kelime kartını çevir">'
        + '<div class="card-inner"><div class="card-face card-front"><span class="pos-tag ' + item.pos + '">' + posLabel[item.pos] + '</span>'
        + '<span class="card-word">' + esc(item.w) + '</span><span class="card-hint">dokun</span></div>'
        + '<div class="card-face card-back"><span class="card-meaning">' + esc(item.tr) + '</span>'
        + '<span class="card-example">' + vurgula(item) + '</span>'
        + '<span class="card-synonyms"><b>Synonyms:</b> ' + esc(item.syn) + '</span>'
        + (item.diger ? '<span class="card-other"><b>Diğer:</b> ' + esc(item.diger) + '</span>' : '')
        + '</div></div></div>';
    }).join('');
    cardGrid.querySelectorAll('.card').forEach(function(card){
      var flip = function(){ card.classList.toggle('flipped'); };
      card.addEventListener('click', flip);
      card.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); flip(); } });
    });

    var active, score, answered, firstMistakes;
    var quiz = document.getElementById('quiz');

    function baslat(liste){
      active = shuffle(liste).map(function(t){ return {t: t, options: secenekler(t)}; });
      score = 0; answered = 0; firstMistakes = new Set();
      document.getElementById('score').textContent = '0';
      document.getElementById('answered').textContent = '0';
      document.getElementById('bar').style.width = '0';
      document.getElementById('result').classList.remove('show');
      render();
    }

    function render(){
      quiz.innerHTML = active.map(function(item, i){
        return '<article class="question" data-q="' + i + '"><div class="qtop"><span class="num">' + (i + 1) + '</span><div style="flex:1">'
          + '<h3>' + esc(item.t.q) + '</h3><div class="options">'
          + item.options.map(function(opt, j){ return '<button class="option" type="button" data-i="' + j + '">' + String.fromCharCode(65 + j) + '. ' + esc(opt.w) + '</button>'; }).join('')
          + '</div><div class="feedback" role="status"></div></div></div></article>';
      }).join('');
      quiz.querySelectorAll('.option').forEach(function(b){ b.addEventListener('click', choose); });
      document.getElementById('totalTop').textContent = active.length;
    }

    function choose(event){
      var btn = event.currentTarget, card = btn.closest('.question'), item = active[Number(card.dataset.q)];
      var sel = item.options[Number(btn.dataset.i)], t = item.t, fb = card.querySelector('.feedback');
      card.querySelectorAll('.option').forEach(function(b){ b.classList.remove('wrong'); });
      if(sel.no !== t.no){
        if(!card.dataset.solved){ card.dataset.mistake = '1'; firstMistakes.add(t.no); }
        btn.classList.add('wrong');
        fb.className = 'feedback show bad';
        fb.innerHTML = '<strong>✗ Bu seçenek olmaz.</strong><b>' + esc(sel.w) + '</b> = ' + esc(sel.tr) + '. İpucu: ' + esc(t.clue);
        return;
      }
      if(!card.dataset.solved){
        card.dataset.solved = '1'; answered++;
        if(!card.dataset.mistake) score++;
        document.getElementById('score').textContent = score;
        document.getElementById('answered').textContent = answered;
        document.getElementById('bar').style.width = (answered / active.length * 100) + '%';
      }
      btn.classList.add('correct');
      fb.className = 'feedback show good';
      fb.innerHTML = '<strong>✓ Doğru!</strong><b>' + esc(t.w) + '</b> = ' + esc(t.tr) + '. ' + esc(t.clue)
        + '<span class="rule"><b>Cümlenin Türkçesi:</b> ' + esc(t.trQ) + '</span>'
        + '<span class="rule"><b>Synonyms:</b> ' + esc(t.syn) + '</span>'
        + (t.diger ? '<span class="rule"><b>Diğer anlam/kullanım:</b> ' + esc(t.diger) + '</span>' : '');
      if(answered === active.length) finish();
    }

    function finish(){
      var total = active.length, pct = Math.round(score / total * 100);
      document.getElementById('finalScore').textContent = score + '/' + total + ' · %' + pct;
      document.getElementById('finalMessage').textContent = pct >= 90 ? 'Bu kelimeleri çok iyi öğrenmişsin. Sonraki kısma geçebilirsin.'
        : pct >= 70 ? 'İyi gidiyor. Yanlışlarını bir kez daha çözüp sonraki kısma geç.'
        : 'Kartlara dönüp kelimelere bir kez daha bakman, sonra yanlışları çözmen faydalı olur.';
      document.getElementById('retryMistakes').style.display = firstMistakes.size ? 'inline-block' : 'none';
      document.getElementById('result').classList.add('show');
      setTimeout(function(){ document.getElementById('result').scrollIntoView({behavior:'smooth', block:'start'}); }, 250);
    }

    document.getElementById('retryMistakes').addEventListener('click', function(){
      baslat(words.filter(function(w){ return firstMistakes.has(w.no); }));
      window.scrollTo({top:0, behavior:'smooth'});
    });
    document.getElementById('retryAll').addEventListener('click', function(){
      baslat(words);
      window.scrollTo({top:0, behavior:'smooth'});
    });
    baslat(words);
  }

  function kelimeKismi(ayar){
    const ilk = ayar.words[0].no, son = ayar.words[ayar.words.length - 1].no;
    const govde = '<header><h1>Hedef Kelimeler ' + ilk + '–' + son + '</h1></header>'
      + '<div class="stats" aria-live="polite"><div class="progress" aria-label="İlerleme"><div class="bar" id="bar"></div></div>'
      + '<div class="score"><span id="answered">0</span>/<span id="totalTop">' + ayar.words.length + '</span> · <span id="score">0</span> ilk denemede doğru</div></div>'
      + '<div class="section-title"><span>1</span><div><h2>Kelime Kartları</h2><p>Kartlara dokunarak anlamı, örnek cümleyi, eş anlamlıları ve diğer anlamları gör.</p></div></div>'
      + '<div class="card-grid" id="cardGrid"></div>'
      + '<div class="section-title"><span>2</span><div><h2>Alıştırma</h2><p>Kelimeleri bu kez yeni cümlelerde gör: her boşluğa en uygun kelimeyi seç.</p></div></div>'
      + '<section id="quiz"></section>'
      + sonucBolumu('Alıştırma tamamlandı!', ayar.words.length)
      + '<p class="tip">Puanlama yalnızca ilk seçimine göre yapılır. Doğru cevabı bulana kadar seçenekleri deneyebilirsin; her yanlış seçimde bir ipucu çıkar.</p>';
    return belge('Bölüm ' + ayar.bolum + ' · ' + ayar.kisim + '. Kısım — Hedef Kelimeler ' + ilk + '–' + son,
      govde, kelimeCalistir, {words: ayar.words});
  }

  /* ------------------------------------------------------------------
     Kısım 5–7: bölümlere ayrılmış çoktan seçmeli çalışma
     ayar:
       baslik, intro (HTML), sonucBasligi, tip, kuralEtiketi,
       sections: {anahtar: {title, sub, badge?, lesson? (HTML), instructions?, passage? (HTML), tekSutun?}}
                 (anahtarların sırası bölümlerin sırasıdır)
       questions: [{s, q, o: [[seçenek, açıklama], ...], a, tr?, rule? (ya da tag), focus?, sabit?}]
                 tr, rule/tag ve focus (hedef kelimeler) yalnız doğru cevaptan sonra gösterilir
                 a → doğru seçeneğin o içindeki sırası (seçenekler ekranda karıştırılır;
                     sabit: true ise karıştırılmaz, ör. altı çizili bölümler, I–V)
       soruKaristir: bölüm içinde soru sırası karıştırılsın mı
       sabitBolumler: soru sırası hiç değişmeyecek bölümler (ör. paragraf/cloze)
       tekSutun: seçenekler tek sütunda gösterilsin mi
       sure: önerilen süre (dakika) → süre sayacı gösterilir
       mesajlar: [[enAzYuzde, metin], ...] büyükten küçüğe
     ------------------------------------------------------------------ */
  function testCalistir(T){
    var sections = T.sections, questions = T.questions, sirali = Object.keys(sections);
    function esc(v){ return String(v).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
    function zengin(v){
      return esc(v).replace(/\[\[(.+?)\]\]/g, '<u>$1</u>').replace(/==(.+?)==/g, '<mark>$1</mark>')
        .replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/-{4,}/g, '<span class="bosluk">$&</span>')
        .split('\n').join('<br>');
    }
    /* Başlıkta zaten “✓ Doğru!” yazdığı için açıklamanın başındaki “Doğru.” tekrarlanmaz. */
    function dogruAciklamasi(v){ return v.replace(/^Doğru( seçim)?\.\s*/, ''); }
    function shuffle(a){ var o = a.slice(); for(var i = o.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)); var t = o[i]; o[i] = o[j]; o[j] = t; } return o; }
    function sureYaz(sn){ var d = Math.floor(sn / 60), s = sn % 60; return (d < 10 ? '0' : '') + d + ':' + (s < 10 ? '0' : '') + s; }

    var active, score, answered, firstMistakes, baslangic, sayac = null;
    var quiz = document.getElementById('quiz');

    function hazirla(liste){
      var out = [];
      sirali.forEach(function(k){
        var grup = liste.filter(function(q){ return q.s === k; });
        if(T.soruKaristir && (T.sabitBolumler || []).indexOf(k) < 0) grup = shuffle(grup);
        out = out.concat(grup);
      });
      return out.map(function(soru){
        var sira = soru.o.map(function(_, i){ return i; });
        return {soru: soru, sira: soru.sabit ? sira : shuffle(sira)};
      });
    }

    function sureBaslat(){
      if(!T.sure) return;
      baslangic = Date.now();
      if(sayac) clearInterval(sayac);
      var alan = document.getElementById('sure');
      var yaz = function(){ alan.textContent = sureYaz(Math.floor((Date.now() - baslangic) / 1000)); };
      yaz(); sayac = setInterval(yaz, 1000);
    }

    function baslat(liste){
      active = hazirla(liste);
      score = 0; answered = 0; firstMistakes = new Set();
      document.getElementById('score').textContent = '0';
      document.getElementById('answered').textContent = '0';
      document.getElementById('bar').style.width = '0';
      document.getElementById('result').classList.remove('show');
      render();
      sureBaslat();
    }

    function baslikHtml(k){
      var b = sections[k];
      return '<div class="section-title"><span>' + (sirali.indexOf(k) + 1) + '</span><div><h2>' + esc(b.title)
        + (b.badge ? ' <small class="badge">' + esc(b.badge) + '</small>' : '') + '</h2>'
        + (b.sub ? '<p>' + esc(b.sub) + '</p>' : '') + '</div></div>'
        + (b.lesson || '')
        + (b.instructions ? '<p class="instructions">' + esc(b.instructions) + '</p>' : '')
        + (b.passage ? '<div class="passage">' + b.passage + '</div>' : '');
    }

    function render(){
      var last = '', html = '';
      active.forEach(function(item, i){
        var s = item.soru;
        if(s.s !== last){ html += baslikHtml(s.s); last = s.s; }
        html += '<article class="question" data-q="' + i + '"><div class="qtop"><span class="num">' + (i + 1) + '</span><div style="flex:1">'
          + '<h3>' + zengin(s.q) + '</h3><div class="options' + (T.tekSutun || sections[s.s].tekSutun ? ' tek' : '') + '">'
          + item.sira.map(function(orj, konum){ return '<button class="option" type="button" data-i="' + orj + '">' + String.fromCharCode(65 + konum) + '. ' + zengin(s.o[orj][0]) + '</button>'; }).join('')
          + '</div><div class="feedback" role="status"></div></div></div></article>';
      });
      quiz.innerHTML = html;
      quiz.querySelectorAll('.option').forEach(function(b){ b.addEventListener('click', choose); });
      document.getElementById('totalTop').textContent = active.length;
    }

    function choose(event){
      var btn = event.currentTarget, card = btn.closest('.question'), item = active[Number(card.dataset.q)], s = item.soru;
      var selected = Number(btn.dataset.i), fb = card.querySelector('.feedback');
      card.querySelectorAll('.option').forEach(function(b){ b.classList.remove('wrong'); });
      if(selected !== s.a){
        if(!card.dataset.solved){ card.dataset.mistake = '1'; firstMistakes.add(questions.indexOf(s)); }
        btn.classList.add('wrong');
        fb.className = 'feedback show bad';
        fb.innerHTML = '<strong>✗ Bu seçenek olmaz.</strong>' + zengin(s.o[selected][1]);
        return;
      }
      if(!card.dataset.solved){
        card.dataset.solved = '1'; answered++;
        if(!card.dataset.mistake) score++;
        document.getElementById('score').textContent = score;
        document.getElementById('answered').textContent = answered;
        document.getElementById('bar').style.width = (answered / active.length * 100) + '%';
      }
      btn.classList.add('correct');
      fb.className = 'feedback show good';
      fb.innerHTML = '<strong>✓ Doğru!</strong>' + zengin(dogruAciklamasi(s.o[selected][1]))
        + (s.tr ? '<span class="rule"><b>Türkçesi:</b> ' + esc(s.tr) + '</span>' : '')
        + ((s.rule || s.tag) ? '<span class="rule"><b>' + esc(T.kuralEtiketi || 'Not') + ':</b> ' + esc(s.rule || s.tag) + '</span>' : '')
        + (s.focus ? '<span class="rule"><b>Hedef kelimeler:</b> ' + esc(s.focus) + '</span>' : '');
      if(answered === active.length) finish();
    }

    function finish(){
      var total = active.length, pct = Math.round(score / total * 100), mesaj = '';
      (T.mesajlar || []).some(function(m){ if(pct >= m[0]){ mesaj = m[1]; return true; } return false; });
      document.getElementById('finalScore').textContent = score + '/' + total + ' · %' + pct;
      document.getElementById('finalMessage').textContent = mesaj;
      var not = '';
      if(T.sure){
        clearInterval(sayac); sayac = null;
        var gecen = Math.floor((Date.now() - baslangic) / 1000);
        var hedef = Math.round(T.sure * total / questions.length * 60);
        not = 'Süren: ' + sureYaz(gecen) + ' · Sınav temposu için önerilen: ' + sureYaz(hedef);
      }
      document.getElementById('finalNote').textContent = not;
      var grup = {};
      active.forEach(function(item, i){
        var k = item.soru.s;
        if(!grup[k]) grup[k] = {total: 0, correct: 0};
        grup[k].total++;
        var card = quiz.querySelector('.question[data-q="' + i + '"]');
        if(card && !card.dataset.mistake) grup[k].correct++;
      });
      document.getElementById('diagnosis').innerHTML = sirali.filter(function(k){ return grup[k]; }).map(function(k){
        var g = grup[k], p = Math.round(g.correct / g.total * 100);
        var etiket = p >= 80 ? 'Güçlü' : p >= 60 ? 'Biraz tekrar et' : 'Öncelikli tekrar';
        return '<div class="diag"><div class="diag-top"><span>' + esc(sections[k].title) + '</span><span>' + g.correct + '/' + g.total + '</span></div><small>' + etiket + ' · İlk deneme başarısı %' + p + '</small></div>';
      }).join('');
      document.getElementById('retryMistakes').style.display = firstMistakes.size ? 'inline-block' : 'none';
      document.getElementById('result').classList.add('show');
      setTimeout(function(){ document.getElementById('result').scrollIntoView({behavior:'smooth', block:'start'}); }, 250);
    }

    document.getElementById('retryMistakes').addEventListener('click', function(){
      baslat(Array.from(firstMistakes).sort(function(a, b){ return a - b; }).map(function(i){ return questions[i]; }));
      window.scrollTo({top:0, behavior:'smooth'});
    });
    document.getElementById('retryAll').addEventListener('click', function(){
      baslat(questions);
      window.scrollTo({top:0, behavior:'smooth'});
    });
    baslat(questions);
  }

  function testKismi(ayar){
    const toplam = ayar.questions.length;
    const sure = ayar.sure ? ' · <span class="timer">⏱ <span id="sure">00:00</span> / ' + ayar.sure + ' dk</span>' : '';
    const govde = '<header><h1>' + esc(ayar.baslik) + '</h1></header>'
      + '<div class="stats" aria-live="polite"><div class="progress" aria-label="İlerleme"><div class="bar" id="bar"></div></div>'
      + '<div class="score"><span id="answered">0</span>/<span id="totalTop">' + toplam + '</span> · <span id="score">0</span> ilk denemede doğru' + sure + '</div></div>'
      + (ayar.intro ? '<section class="intro">' + ayar.intro + '</section>' : '')
      + '<section id="quiz"></section>'
      + sonucBolumu(ayar.sonucBasligi || 'Çalışma tamamlandı!', toplam, '<div class="diagnosis" id="diagnosis"></div>')
      + '<p class="tip">' + esc(ayar.tip || 'Puanlama yalnızca ilk seçimine göre yapılır. Yanlış seçimde açıklamayı okuyup doğru cevabı bulana kadar yeniden deneyebilirsin.') + '</p>';
    const veri = {
      sections: ayar.sections, questions: ayar.questions, soruKaristir: !!ayar.soruKaristir,
      sabitBolumler: ayar.sabitBolumler || [], tekSutun: !!ayar.tekSutun, sure: ayar.sure || 0,
      mesajlar: ayar.mesajlar || [], kuralEtiketi: ayar.kuralEtiketi || 'Not'
    };
    return belge(ayar.baslik, govde, testCalistir, veri);
  }

  window.Sablon = {kelimeKismi, testKismi};
})();
