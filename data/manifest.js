/* Program künyesi: bölüm/kısım listesi ve hazır içeriklerin önizleme etiketleri.
   Ana sayfa bu dosyayla çizilir; bölüm içerikleri ayrıca data/bolum-<no>.js dosyalarından
   yalnızca ilgili kısım açıldığında yüklenir. */
window.PROGRAM = {
  /* Her bölüm aynı 7 kısımdan oluşur. */
  kisimTanimlari: [
    {tip:'kelime', tipLabel:'KELİME ÇALIŞMASI', label:'1–25. Hedef Kelimeler'},
    {tip:'kelime', tipLabel:'KELİME ÇALIŞMASI', label:'26–50. Hedef Kelimeler'},
    {tip:'kelime', tipLabel:'KELİME ÇALIŞMASI', label:'51–75. Hedef Kelimeler'},
    {tip:'kelime', tipLabel:'KELİME ÇALIŞMASI', label:'76–100. Hedef Kelimeler'},
    {tip:'grammar', tipLabel:'GRAMMAR ÇALIŞMASI', label:'Grammar Çalışması (50 Soru)'},
    {tip:'karma', tipLabel:'KARMA ÇALIŞMA', label:'Grammar + 100 Kelime (Karma, Zorlaştırılmış)'},
    {tip:'sinav', tipLabel:'SINAV FORMATINDA SORULAR', label:'YDS / YÖKDİL Formatı (25 Soru)'}
  ],

  /* 15 bölümün grammar konuları. */
  bolumler: [
    {no:1, konu:'Tenses & Subject–Verb Agreement', ozet:'Temel zamanlar, zamanların birbiriyle ilişkisi ve özne–yüklem uyumu.'},
    {no:2, konu:'Modals', ozet:'Can, could, may, might, must, should, have to ve geçmiş modal yapıları.'},
    {no:3, konu:'Active & Passive Voice', ozet:'Etken ve edilgen cümleler; tense ve modal yapılarda passive kullanımı.'},
    {no:4, konu:'Conditionals', ozet:'Type 0–1–2–3, mixed conditionals, wish ve if only yapıları.'},
    {no:5, konu:'Conjunctions, Linking Words & Adverbial Clauses', ozet:'Neden, sonuç, karşıtlık, amaç, koşul ve zaman bildiren bağlayıcı yapılar.'},
    {no:6, konu:'Nouns, Articles & Determiners', ozet:'İsim türleri, sayılabilen–sayılamayan isimler, a/an/the ve belirleyiciler.'},
    {no:7, konu:'Pronouns & Dummy Subjects', ozet:'Kişi, iyelik, dönüşlülük ve belirsizlik zamirleri; dummy it ve there.'},
    {no:8, konu:'Quantifiers', ozet:'Much, many, few, little, some, any, each, both ve benzeri miktar ifadeleri.'},
    {no:9, konu:'Adjectives, Adverbs & Comparison', ozet:'Sıfat ve zarfların kullanımı; comparative, superlative ve eşitlik yapıları.'},
    {no:10, konu:'Gerunds & Infinitives', ozet:'Verb + -ing, to-infinitive, bare infinitive ve anlamı değişen fiiller.'},
    {no:11, konu:'Prepositions & Collocations', ozet:'Temel edatlar ile isim, sıfat ve fiillerin doğal kelime birliktelikleri.'},
    {no:12, konu:'Phrasal Verbs', ozet:'Ayrılabilen ve ayrılamayan phrasal verb yapıları ile yaygın kullanımlar.'},
    {no:13, konu:'Noun Clauses', ozet:'That, whether/if ve question words ile kurulan isim cümlecikleri.'},
    {no:14, konu:'Relative (Adjective) Clauses', ozet:'Who, which, that, whose ve where; defining ve non-defining clauses.'},
    {no:15, konu:'Reduction', ozet:'Relative ve adverbial clause kısaltmaları ile participle yapıları.'}
  ],

  /* hazir[bölümNo][kısımNo] = ana sayfada gösterilecek önizleme etiketleri.
     Burada yer almayan kısımlar "Yakında" olarak listelenir. */
  hazir: {
    1: {
      1: ['necessary', 'occur', 'penetrate', 'supply', 'matter', 'launch', 'influence', 'growth', 'flexibility', 'eventually', 'useful', 'magnify', 'formerly', 'vague', 'enable', 'vanish', 'wilderness', 'enhance', 'celestial', 'extinction', 'gain', 'initially', 'pursue', 'reasonable', 'state'],
      2: ['prove', 'discard', 'knowledge', 'precaution', 'repair', 'primary', 'reduce', 'disease', 'accessible', 'agriculture', 'annual', 'recommend', 'vary', 'approximately', 'principle', 'monitor', 'scarce', 'fluctuation', 'product', 'invent', 'exceptional', 'illustrate', 'opportunity', 'investigate', 'likelihood'],
      3: ['primitive', 'regulation', 'reason', 'especially', 'decade', 'purpose', 'significantly', 'survey', 'detect', 'emerge', 'diverse', 'pesticide', 'intensify', 'familiar', 'particularly', 'inadequate', 'drift', 'prevention', 'observation', 'demonstrate', 'compound', 'grow', 'harsh', 'sample', 'discovery'],
      4: ['eliminate', 'link', 'increase', 'outcome', 'reliability', 'heighten', 'gather', 'desert', 'layer', 'plausible', 'contain', 'policy', 'menace', 'save', 'combine', 'obtain', 'fume', 'strict', 'improve', 'determine', 'relatively', 'mild', 'affect', 'currently', 'evaluate'],
      5: ['12 Tenses', 'Özne–Yüklem Uyumu', 'Yardımcı Fiiller', 'Zaman İfadeleri', 'Karşılaştırmalı Seçim', '50 Soru'],
      6: ['Tenses + 100 Kelime', 'Cümle Tamamlama', 'Kısa Diyalog', 'Paragraf', 'Hata Bulma', 'Kısa Okuma', '28 Soru'],
      7: ['YDS / YÖKDİL', 'Gerçek Sınav Seviyesi', '5 Seçenek', 'Süre Takibi', '10 Soru Türü', '25 Soru']
    },
    2: {
      1: ['ignore', 'common', 'hazardous', 'obvious', 'pollution', 'partially', 'enormous', 'develop', 'task', 'decrease', 'impact', 'solely', 'regulate', 'lack of', 'benefit', 'condition', 'available', 'assemble', 'focus on', 'precipitation', 'fail', 'severe', 'prone to', 'alignment', 'proper'],
      2: ['support', 'crucial', 'trait', 'concerned', 'requirement', 'deteriorate', 'flourish', 'adequate', 'give rise to', 'attempt', 'deadly', 'consequence', 'wreck', 'constructive', 'promote', 'drought', 'incidence', 'release', 'accurately', 'essential', 'application', 'biodiversity', 'gradually', 'rapid', 'component'],
      3: ['ignition', 'alter', 'disappear', 'acquire', 'moderate', 'emit', 'inconsistent', 'implement', 'highlight', 'facilitate', 'exist', 'melt', 'entirely', 'indefinitely', 'debate', 'protect', 'lunar', 'incredible', 'outbreak', 'neglect', 'disrupt', 'aid', 'remarkable', 'cease', 'cut down on'],
      4: ['discover', 'faulty', 'damage', 'prevent', 'comprise', 'plentiful', 'confine', 'provide', 'planet', 'distinguish', 'consensus', 'delay', 'efficient', 'exposure', 'fragile', 'majority', 'notorious', 'contribute to', 'shortage', 'generate', 'poisonous', 'create', 'previous', 'tremendous', 'irrigation'],
      5: ['Modals', 'Can · Could · May · Might', 'Must · Have to · Should', 'Geçmiş Modaller', 'Karşılaştırmalı Seçim', '50 Soru']
    }
  }
};
