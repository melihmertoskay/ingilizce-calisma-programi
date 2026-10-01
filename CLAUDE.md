# Proje: İngilizce Çalışma Programı (YDS / YÖKDİL-Fen)

Bu dosya yeni bir oturumun işe hiçbir şey sormadan devam edebilmesi için yazıldı.
Teknik ayrıntılar `README.md` ve `data/sablon.js` başındaki yorumlarda; içerik için
örnek her zaman `data/bolum-1.js`.

## Kullanıcı ve hedef

- YDS'ye ve **YÖKDİL-Fen**'e giriyor. YÖKDİL'de en yüksek notu 55 (genelde 45–55),
  YDS'de daha düşük. Hedef **85+**.
- Hem **öğrenmesi** hem sınava çalışması gerekiyor. Doğrudan ağır başlarsa anlamayabilir;
  **özgüvenini düşürecek bir çalışma olmamalı.**
- Türkçe konuşur; arayüz, açıklamalar ve mesajlar Türkçe.

## Çalışma kuralları (kullanıcının talimatları)

- **Yayınlama:** Site GitHub Pages ile `main` dalından yayınlanır. Bir değişiklik bitip
  test edildiğinde **kullanıcıya sormadan** `main`'e birleştir ve yayınla (PR açıp
  birleştirmek ya da doğrudan `main`'e göndermek). Kullanıcı içerikleri ancak yayında
  kontrol edebiliyor; yayınlamadan "bitti" deme. Yayından sonra Pages yayınının
  başladığını kontrol et (Actions → "pages build and deployment", ~1 dk sürer).
- Her bölümde **yalnız o bölümün hedef 100 kelimesi** öğretilir. Kelime listesi
  kullanıcının kitabından gelir; **kelimeler değiştirilmez**, yalnız çekimli yazılmışsa
  sözlük biçimine çevrilebilir (decades → decade). Başka kelime öğretilmez.
- **Bölümler arası tekrar sistemi istenmiyor.** Kullanıcı unuttuğu kelimeleri kendisi
  not alıp 15 bölümden sonra ayrı çalışacak. Kelimeler Kısım 1–4'te öğretilir, 5–7'de
  yeniden karşısına çıkar; bu yeterli.
- Kullanıcı limitini düşünüyor: gereksiz uzun açıklama, tekrar okuma ve deneme
  yapmadan, verimli çalış. Büyük bölümlerde işi ikiye bölmek kabul (Kısım 1–4, sonra 5–7);
  her parça kendi başına yayınlanabilir.

## Bölüm yapısı (15 bölüm × 7 kısım)

Kullanıcının yöntemi: **1)** 100 kelime öğren → **2)** bir grammar öğren (grammar örnekleri
ve soruları hedef kelimelerle kurulur) → **3)** bu kelime ve grammar'a yönelik sınavda
çıkabilecek soruları çöz.

| Kısım | İçerik | Seviye |
|---|---|---|
| 1–4 | 25'er kelime: kart (anlam, örnek, synonyms, diğer anlamlar) + boşluk doldurma | Öğretici, kolay |
| 5 | Konu anlatımı + 50 soru, **tamamı hedef kelimelerle** | Öğretici |
| 6 | Grammar + 100 kelime karma (cümle, diyalog, paragraf, hata bulma, anlam) + kısa okuma | Öğretici, biraz daha zor |
| 7 | YDS/YÖKDİL mini denemesi, 25 soru, 5 seçenek, süre sayacı | **Gerçek sınav seviyesi** |

Bölüm konuları `data/manifest.js` içinde (2: Modals, 3: Passive, 4: Conditionals,
5: Conjunctions/Adverbial Clauses, 6: Nouns/Articles, 7: Pronouns, 8: Quantifiers,
9: Adjectives/Adverbs/Comparison, 10: Gerunds & Infinitives, 11: Prepositions,
12: Phrasal Verbs, 13: Noun Clauses, 14: Relative Clauses, 15: Reduction).

## İçerik kalite kuralları (Bölüm 1'den öğrenilenler)

**Kısım 1–4**
- `q` (alıştırma cümlesi) karttaki `ex` cümlesinden **farklı** olmalı; aynı cümle
  kelimeyi değil cümleyi ezberletir. Kolay, günlük ya da bilim bağlamlı cümleler.
- Boşluk, kelimenin **sözlük biçimini** almalı (to ___, can ___, the ___); aynı türden
  bütün seçenekler dilbilgisi olarak oturmalı. Boşluktan hemen önce a/an kullanma
  (artikel cevabı ele verir).
- Aynı cümlede başka bir hedef kelime de doğru olabiliyorsa onu `haric` listesine ekle
  (ör. necessary ↔ useful/reasonable, increase ↔ heighten/improve).
- `clue` alıştırma cümlesindeki ipucunu anlatır (yanlış seçimde gösterilir).
- `diger`: sınavda karşılaşılabilecek diğer anlam/kullanım ve karıştırılan kelimeler
  (state = belirtmek, compound = kötüleştirmek, affect/effect…). Yalnız gerekiyorsa.
- `trEx`, `trQ` her kelimede zorunlu.

**Kısım 5**
- Anlatım örnekleri ve soruların hepsi hedef kelimelerle kurulur; diğer kelimeler
  temel düzeyde kalır.
- Kısım 6–7'de sorulacak **her kural Kısım 5'te anlatılmış olmalı** (öğretilmeyen şeyi
  sorma). Henüz işlenmemiş konuları (ör. Bölüm 2'de passive, relative clause) soru
  konusu yapma; metinde geçmeleri sorun değil.
- Her soruda `tr` (Türkçesi) ve `tag` (yapı adı) olsun. Tartışmalı/çift doğrulu kurallar
  sorma (Bölüm 1'de "data appears" ve "said she will" bu yüzden çıkarıldı).
- 4 seçenek; doğru seçeneğin açıklaması "Doğru." ile başlar, yanlışların açıklaması
  neden yanlış olduğunu öğretir.

**Kısım 6**
- Hata bulma sorularında dört bölüm de `[[…]]` ile altı çizilir ve `sabit: true`.
- Kısa okuma parçası hedef kelimelerle (≈100–130 kelime), 3 kolay soru. Parçalar
  ilerleyen bölümlerde yavaş yavaş uzar (≈ Bölüm 10'da sınav uzunluğu).
- Paragraf ve okuma metinlerinde hedef kelimeleri **vurgulama** (`<mark>`, `==…==`
  kullanma). Kullanıcı metinlerin sınavdaki gibi düz görünmesini istedi.

**Kısım 7 (gerçek sınav)**
- 5 seçenek; **bütün seçenekler dilbilgisi açısından kurallı** olmalı, yalnız anlam,
  zaman ilişkisi ve mantıkla ayrılmalı. Kelime sorularında yanlış seçenekler de hedef
  kelimelerden, aynı türden.
- Anlam bütünlüğünü bozan cümle aynı konudan olmalı ama ana fikre hizmet etmemeli.
- Okuma parçası ≈200 kelime, 4 soru; cloze 5 boşluk.
- Diyalog ve yakın anlam soruları `badge: 'Yalnız YDS'` (YÖKDİL'de yok).
- YÖKDİL-Fen için metinler bilim/fen konulu olsun.
- Bölüm 1 dağılımı: kelime 4, dilbilgisi 3, cloze 5, cümle tamamlama 3, çeviri 2
  (1 İng→Tr, 1 Tr→İng), paragraf tamamlama 1, ayrık cümle 1, diyalog 1, yakın anlam 1,
  okuma 4.
- "Hedef" etiketi (`focus`) yalnız cevaptan sonra görünür; soruya cevabı yazma.

## Yeni bölüm ekleme adımları

1. Kullanıcıdan 100 kelimeyi al (sırasıyla 1–25 → Kısım 1, 26–50 → Kısım 2, …).
2. `data/bolum-<no>.js` dosyasını `data/bolum-1.js` yapısını kopyalayarak yaz:
   `kelimeler` (1–4), `kisim5`, `kisim6`, `kisim7` ve sonda `window.registerBolum(<no>, …)`.
   Büyük dosyayı tek seferde yazmak yerine önce iskeleti, sonra her kısmı ayrı ayrı ekle.
3. `data/manifest.js` → `hazir[<no>]`: Kısım 1–4 için kelime listeleri (veriyle **aynı
   sırada**), Kısım 5–7 için önizleme etiketleri.
4. Doğrula ve test et:
   - `node --check data/bolum-<no>.js`
   - `node tools/dogrula.js <no>` (alanlar, seçenek sayıları, "Doğru" açıklamaları,
     manifest uyumu, `haric` havuzu)
   - `node tools/tarayici.js <no> <scratchpad-klasörü>` (bütün kısımları Chromium'da çözer,
     konsol hatası, ilerleme kaydı, mobil/koyu görünüm; ekran görüntülerine göz at)
5. Commit et, `main`'e birleştirip yayınla, Pages yayınını kontrol et, kullanıcıya
   kısaca ne eklendiğini söyle.

## Teknik notlar

- `index.html` kabuk; `data/sablon.js` bütün kısımların HTML'ini ve etkileşimini üretir;
  bölüm dosyaları yalnız veri. Kabukla köprü kimlikleri: `#answered`, `#totalTop`,
  `#score`, `#result.show`.
- Soru/açıklama metinlerinde işaretler: `[[altı çizili]]`, `==vurgu==`, `**kalın**`,
  `\n` yeni satır, `----` sınav boşluğu (satır sonunda bölünmez). `lesson`, `passage`,
  `intro` alanları doğrudan HTML.
- Seçenekler ekranda karıştırılır; `a` doğru seçeneğin veri içindeki sırasıdır.
- Türkçe metinlerde kesme işareti için `’` kullan (tek tırnaklı JS dizelerini bozmaz).
- Ortamda Bash izin denetimi zaman zaman "no verdict" hatası verir; aynı komutu bir kez
  daha denemek genelde yeterli.
- Chromium/Playwright kurulu (`npm root -g`/playwright); `playwright install` çalıştırma.

## Durum (2026-10-01)

- Bölüm 1 ve Bölüm 2 (Modals) tamam ve yayında (7 kısım).
- **Sıradaki iş: Bölüm 3 — Active & Passive Voice.** Kullanıcı kitabındaki 100 kelimeyi gönderecek.
- Bölüm 2 notları: çok kelimeli kelimelerde (`lack of`, `focus on`, `prone to`, `give rise to`,
  `cut down on`, `contribute to`) kart örneği (`ex`) ifadeyi aynen içermeli. `tools/tarayici.js`
  `KISIMLAR=5,6 node tools/tarayici.js <no> <klasör>` ile yalnız seçili kısımları çözer.
  Not: dosyalar CRLF olabilir (`data/manifest.js`); düzenlerken satır sonlarına dikkat et.
