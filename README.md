# ingilizce-calisma-programi

15 bölümlük interaktif İngilizce çalışma programı. GitHub Pages üzerinde tek sayfalık
bir web sitesi olarak çalışır.

Her bölüm 100 hedef kelime ve bir grammar konusu üzerine kuruludur; yedi kısımdan oluşur:

| Kısım | İçerik |
|---|---|
| 1–4 | 25'erli hedef kelime çalışması (kelime kartları + boşluk doldurma) |
| 5 | Grammar çalışması (50 soru) |
| 6 | Grammar + 100 kelime karma çalışma (25 soru) |
| 7 | YDS / YÖKDİL formatında sorular (25 soru) |

## Dosya düzeni

```
index.html         Kabuk: menü, ana sayfa, tema, ilerleme kaydı, içerik çerçevesi
data/manifest.js   Bölüm/kısım künyesi ve hazır kısımların önizleme etiketleri
data/bolum-1.js    Bölüm 1 içerikleri
```

`index.html` yalnızca kabuğu içerir. Bir kısım ilk kez açıldığında ilgili
`data/bolum-<no>.js` dosyası indirilir, böylece açılışta tüm program indirilmez.

Her kısım, iframe içinde tek başına çalışabilen tam bir HTML belgesidir. Kabuk bu
belgeye yalnızca sunum katmanı ekler: gömülü görünüm CSS'i, koyu tema değişkenleri ve
yükseklik/ilerleme/tema köprüleri. Çalışmaların kendi kodu değiştirilmez.

## Yeni bölüm eklerken

1. `data/bolum-<no>.js` dosyasını oluştur ve sonunda
   `window.registerBolum(<no>, { 1: () => html, ... })` çağır.
   Değerler, HTML metnini döndüren fonksiyonlardır (içerik ancak açıldığında üretilir).
2. `data/manifest.js` içindeki `hazir` nesnesine bölümü ve her hazır kısmın
   önizleme etiketlerini ekle. Burada listelenmeyen kısımlar ana sayfada
   "Yakında" görünür.

Çalışmaların kabukla konuşabilmesi için şu kimlikleri kullanması yeterlidir:
`#answered`, `#totalTop`, `#score` ve tamamlandığında `show` sınıfı alan `#result`.
İlerleme bu değerlerden okunur ve tarayıcıda saklanır.

## İlerleme ve tema

Çözülen çalışmaların sonuçları tarayıcıda `localStorage` içinde tutulur
(`ecp.ilerleme.v1`); ana sayfada kısım rozetleri ve üstteki ilerleme çubuğu bu
kayıtla çizilir. "İlerlemeyi sıfırla" düğmesi kaydı temizler.

Tema varsayılan olarak sistem ayarını izler, üst çubuktaki düğmeyle değiştirilebilir
ve seçim `ecp.tema` anahtarında saklanır.
