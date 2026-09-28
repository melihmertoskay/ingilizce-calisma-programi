# ingilizce-calisma-programi

15 bölümlük interaktif İngilizce çalışma programı (YDS ve YÖKDİL-Fen hazırlığı).
GitHub Pages üzerinde tek sayfalık bir web sitesi olarak çalışır.

Her bölüm 100 hedef kelime ve bir grammar konusu üzerine kuruludur; yedi kısımdan oluşur:

| Kısım | İçerik | Amaç |
|---|---|---|
| 1–4 | 25'erli hedef kelime çalışması: kelime kartları + yeni cümlelerde boşluk doldurma | Öğretici |
| 5 | Grammar konu anlatımı + 50 soru (cümleler hedef kelimelerle kurulur) | Öğretici |
| 6 | Grammar + 100 kelime karma çalışma ve kısa okuma parçası (28 soru) | Öğretici |
| 7 | YDS / YÖKDİL mini denemesi: gerçek sınav seviyesi, 5 seçenek, süre takibi (25 soru) | Ölçme |

Kısım 1–6 öğretmek için tasarlanmıştır: kolaydan zora ilerler, her seçeneğin açıklaması
ve doğru cevaptan sonra cümlenin Türkçesi gösterilir. Yalnız Kısım 7 gerçek sınav
zorluğundadır: bütün seçenekler dilbilgisi açısından kuralıdır ve yalnız anlam, zaman
ilişkisi ve mantıkla ayrılır.

## Dosya düzeni

```
index.html         Kabuk: menü, ana sayfa, tema, ilerleme kaydı, içerik çerçevesi
data/manifest.js   Bölüm/kısım künyesi ve hazır kısımların önizleme etiketleri
data/sablon.js     Ortak şablon: kısımların HTML'ini ve etkileşimini üretir
data/bolum-1.js    Bölüm 1 verisi (yalnız veri)
```

`index.html` yalnızca kabuğu içerir. Bir kısım ilk kez açıldığında ilgili
`data/bolum-<no>.js` dosyası indirilir, böylece açılışta tüm program indirilmez.

Bölüm dosyaları yalnızca veri içerir; her kısmın iframe içinde tek başına çalışan
HTML belgesi `data/sablon.js` tarafından üretilir. Böylece bütün bölümler aynı
görünümü ve davranışı paylaşır. Kabuk bu belgeye yalnızca sunum katmanı ekler:
gömülü görünüm CSS'i, koyu tema değişkenleri ve yükseklik/ilerleme/tema köprüleri.

## Yeni bölüm eklerken

1. `data/bolum-1.js` dosyasını örnek alarak `data/bolum-<no>.js` dosyasını oluştur:
   - Kısım 1–4: `window.Sablon.kelimeKismi({bolum, kisim, words})`. Her kelimede
     `w` (sözlük biçimi), `pos`, `tr`, `syn`, `ex`/`trEx` (kart örneği), `q`/`trQ`
     (karttakinden **farklı** alıştırma cümlesi, boşluk `___`), `clue`, isteğe bağlı
     `diger` (diğer anlamlar) ve `haric` (o cümlede de doğru olabileceği için yanlış
     seçenek yapılmayacak kelimeler) bulunur.
   - Kısım 5–7: `window.Sablon.testKismi({...})`. Alanlar `data/sablon.js` içinde
     açıklanmıştır. Seçenekler ekranda karıştırılır; `a` yalnızca doğru seçeneğin
     veri içindeki sırasıdır. Doğru seçeneğin açıklaması "Doğru" ile başlar.
   - Dosyanın sonunda `window.registerBolum(<no>, { 1: () => ..., ... })` çağır.
2. `data/manifest.js` içindeki `hazir` nesnesine bölümü ve her hazır kısmın
   önizleme etiketlerini ekle. Burada listelenmeyen kısımlar ana sayfada
   "Yakında" görünür.

İçerik kuralları:
- Kısım 1–6'da öğretilen kelimeler yalnızca o bölümün hedef kelimeleridir.
- Kısım 5'teki anlatım örnekleri ve sorular hedef kelimelerle kurulur.
- Kısım 6 ve 7'de sorulan her grammar kuralı Kısım 5'te anlatılmış olmalıdır.
- Kısım 7'de "Yalnız YDS" etiketli türler (diyalog, yakın anlam) YÖKDİL'de çıkmaz.

## İlerleme ve tema

Çözülen çalışmaların sonuçları tarayıcıda `localStorage` içinde tutulur
(`ecp.ilerleme.v1`); ana sayfada kısım rozetleri ve üstteki ilerleme çubuğu bu
kayıtla çizilir. "İlerlemeyi sıfırla" düğmesi kaydı temizler.

Tema varsayılan olarak sistem ayarını izler, üst çubuktaki düğmeyle değiştirilebilir
ve seçim `ecp.tema` anahtarında saklanır.
