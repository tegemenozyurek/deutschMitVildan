export type WFragenQuizOption = {
  id: string
  label: string
}

export type WFragenQuizQuestion = {
  id: string
  prompt: string
  promptHint: string
  options: WFragenQuizOption[]
  correctId: string
}

type PoolItem = {
  id: string
  prompt: string
  promptHint: string
  correct: string
  distractors: readonly [string, string, string]
}

/** Fixed pool of 90 MC items — each quiz draws 10 / 15 / 20 at random. */
export const wFragenQuizPool: readonly PoolItem[] = [
  // DE → TR (words)
  {
    id: 'p01',
    prompt: 'Was?',
    promptHint: 'Türkçesi hangisi?',
    correct: 'Ne?',
    distractors: ['Kim?', 'Nerede?', 'Nasıl?'],
  },
  {
    id: 'p02',
    prompt: 'Wer?',
    promptHint: 'Türkçesi hangisi?',
    correct: 'Kim?',
    distractors: ['Ne?', 'Ne zaman?', 'Neden?'],
  },
  {
    id: 'p03',
    prompt: 'Wann?',
    promptHint: 'Türkçesi hangisi?',
    correct: 'Ne zaman?',
    distractors: ['Nerede?', 'Nereye?', 'Nasıl?'],
  },
  {
    id: 'p04',
    prompt: 'Wie?',
    promptHint: 'Türkçesi hangisi?',
    correct: 'Nasıl?',
    distractors: ['Ne?', 'Kim?', 'Neden?'],
  },
  {
    id: 'p05',
    prompt: 'Warum?',
    promptHint: 'Türkçesi hangisi?',
    correct: 'Neden?',
    distractors: ['Ne zaman?', 'Hangisi?', 'Nereden?'],
  },
  {
    id: 'p06',
    prompt: 'Welche?',
    promptHint: 'Türkçesi hangisi?',
    correct: 'Hangisi?',
    distractors: ['Ne kadar?', 'Nasıl?', 'Kim?'],
  },
  {
    id: 'p07',
    prompt: 'Wo?',
    promptHint: 'Türkçesi hangisi?',
    correct: 'Nerede?',
    distractors: ['Nereye?', 'Nereden?', 'Ne zaman?'],
  },
  {
    id: 'p08',
    prompt: 'Wohin?',
    promptHint: 'Türkçesi hangisi?',
    correct: 'Nereye?',
    distractors: ['Nerede?', 'Nereden?', 'Ne?'],
  },
  {
    id: 'p09',
    prompt: 'Woher?',
    promptHint: 'Türkçesi hangisi?',
    correct: 'Nereden?',
    distractors: ['Nereye?', 'Nerede?', 'Neden?'],
  },
  {
    id: 'p10',
    prompt: 'Wie viel?',
    promptHint: 'Türkçesi hangisi?',
    correct: 'Ne kadar?',
    distractors: ['Kaç tane?', 'Hangisi?', 'Nasıl?'],
  },
  {
    id: 'p11',
    prompt: 'Wie viele?',
    promptHint: 'Türkçesi hangisi?',
    correct: 'Kaç tane?',
    distractors: ['Ne kadar?', 'Ne zaman?', 'Kim?'],
  },

  // TR → DE (words)
  {
    id: 'p12',
    prompt: 'Ne?',
    promptHint: 'Almancası hangisi?',
    correct: 'Was?',
    distractors: ['Wer?', 'Wo?', 'Wie?'],
  },
  {
    id: 'p13',
    prompt: 'Kim?',
    promptHint: 'Almancası hangisi?',
    correct: 'Wer?',
    distractors: ['Was?', 'Wann?', 'Warum?'],
  },
  {
    id: 'p14',
    prompt: 'Ne zaman?',
    promptHint: 'Almancası hangisi?',
    correct: 'Wann?',
    distractors: ['Wo?', 'Wie?', 'Welche?'],
  },
  {
    id: 'p15',
    prompt: 'Nasıl?',
    promptHint: 'Almancası hangisi?',
    correct: 'Wie?',
    distractors: ['Was?', 'Wer?', 'Warum?'],
  },
  {
    id: 'p16',
    prompt: 'Neden?',
    promptHint: 'Almancası hangisi?',
    correct: 'Warum?',
    distractors: ['Wann?', 'Welche?', 'Woher?'],
  },
  {
    id: 'p17',
    prompt: 'Hangisi?',
    promptHint: 'Almancası hangisi?',
    correct: 'Welche?',
    distractors: ['Wie viel?', 'Wie?', 'Wer?'],
  },
  {
    id: 'p18',
    prompt: 'Nerede?',
    promptHint: 'Almancası hangisi?',
    correct: 'Wo?',
    distractors: ['Wohin?', 'Woher?', 'Wann?'],
  },
  {
    id: 'p19',
    prompt: 'Nereye?',
    promptHint: 'Almancası hangisi?',
    correct: 'Wohin?',
    distractors: ['Wo?', 'Woher?', 'Was?'],
  },
  {
    id: 'p20',
    prompt: 'Nereden?',
    promptHint: 'Almancası hangisi?',
    correct: 'Woher?',
    distractors: ['Wohin?', 'Wo?', 'Warum?'],
  },
  {
    id: 'p21',
    prompt: 'Ne kadar?',
    promptHint: 'Almancası hangisi?',
    correct: 'Wie viel?',
    distractors: ['Wie viele?', 'Welche?', 'Wie?'],
  },
  {
    id: 'p22',
    prompt: 'Kaç tane?',
    promptHint: 'Almancası hangisi?',
    correct: 'Wie viele?',
    distractors: ['Wie viel?', 'Wann?', 'Wer?'],
  },

  // Which W-word fits?
  {
    id: 'p23',
    prompt: '___ ist das?',
    promptHint: 'Hangi W-kelimesi?',
    correct: 'Was',
    distractors: ['Wer', 'Wo', 'Wann'],
  },
  {
    id: 'p24',
    prompt: '___ bist du?',
    promptHint: 'Hangi W-kelimesi?',
    correct: 'Wer',
    distractors: ['Was', 'Wie', 'Wo'],
  },
  {
    id: 'p25',
    prompt: '___ beginnt der Kurs?',
    promptHint: 'Hangi W-kelimesi?',
    correct: 'Wann',
    distractors: ['Warum', 'Wo', 'Wie'],
  },
  {
    id: 'p26',
    prompt: '___ geht es dir?',
    promptHint: 'Hangi W-kelimesi?',
    correct: 'Wie',
    distractors: ['Was', 'Wer', 'Wann'],
  },
  {
    id: 'p27',
    prompt: '___ lernst du Deutsch?',
    promptHint: 'Hangi W-kelimesi?',
    correct: 'Warum',
    distractors: ['Wann', 'Welche', 'Woher'],
  },
  {
    id: 'p28',
    prompt: '___ Farbe magst du?',
    promptHint: 'Hangi W-kelimesi?',
    correct: 'Welche',
    distractors: ['Was', 'Wie', 'Wer'],
  },
  {
    id: 'p29',
    prompt: '___ wohnst du?',
    promptHint: 'Hangi W-kelimesi?',
    correct: 'Wo',
    distractors: ['Wohin', 'Woher', 'Wann'],
  },
  {
    id: 'p30',
    prompt: '___ gehst du?',
    promptHint: 'Hangi W-kelimesi?',
    correct: 'Wohin',
    distractors: ['Wo', 'Woher', 'Was'],
  },
  {
    id: 'p31',
    prompt: '___ kommst du?',
    promptHint: 'Hangi W-kelimesi?',
    correct: 'Woher',
    distractors: ['Wohin', 'Wo', 'Warum'],
  },
  {
    id: 'p32',
    prompt: '___ kostet das?',
    promptHint: 'Hangi ifade?',
    correct: 'Wie viel',
    distractors: ['Wie viele', 'Welche', 'Wie'],
  },
  {
    id: 'p33',
    prompt: '___ Geschwister hast du?',
    promptHint: 'Hangi ifade?',
    correct: 'Wie viele',
    distractors: ['Wie viel', 'Welche', 'Wann'],
  },

  // Full sentence meaning DE → TR
  {
    id: 'p34',
    prompt: 'Was ist das?',
    promptHint: 'Anlamı hangisi?',
    correct: 'Bu nedir?',
    distractors: ['Sen kimsin?', 'Nerede oturuyorsun?', 'Nasılsın?'],
  },
  {
    id: 'p35',
    prompt: 'Wer bist du?',
    promptHint: 'Anlamı hangisi?',
    correct: 'Sen kimsin?',
    distractors: ['Bu nedir?', 'Nereye gidiyorsun?', 'Neden?'],
  },
  {
    id: 'p36',
    prompt: 'Wo wohnst du?',
    promptHint: 'Anlamı hangisi?',
    correct: 'Nerede oturuyorsun?',
    distractors: ['Nereye gidiyorsun?', 'Nereden geliyorsun?', 'Ne zaman?'],
  },
  {
    id: 'p37',
    prompt: 'Wohin gehst du?',
    promptHint: 'Anlamı hangisi?',
    correct: 'Nereye gidiyorsun?',
    distractors: ['Nerede oturuyorsun?', 'Nereden geliyorsun?', 'Bu nedir?'],
  },
  {
    id: 'p38',
    prompt: 'Woher kommst du?',
    promptHint: 'Anlamı hangisi?',
    correct: 'Nereden geliyorsun?',
    distractors: ['Nereye gidiyorsun?', 'Nerede oturuyorsun?', 'Nasılsın?'],
  },
  {
    id: 'p39',
    prompt: 'Wie geht es dir?',
    promptHint: 'Anlamı hangisi?',
    correct: 'Nasılsın?',
    distractors: ['Ne kadar?', 'Hangisi?', 'Kimsin?'],
  },
  {
    id: 'p40',
    prompt: 'Warum lernst du Deutsch?',
    promptHint: 'Anlamı hangisi?',
    correct: 'Neden Almanca öğreniyorsun?',
    distractors: [
      'Ne zaman Almanca öğreniyorsun?',
      'Nerede Almanca öğreniyorsun?',
      'Kaç Almanca biliyorsun?',
    ],
  },

  // TR → DE sentence
  {
    id: 'p41',
    prompt: 'Bu nedir?',
    promptHint: 'Almancası hangisi?',
    correct: 'Was ist das?',
    distractors: ['Wer bist du?', 'Wo ist das?', 'Wie ist das?'],
  },
  {
    id: 'p42',
    prompt: 'Nasılsın?',
    promptHint: 'Almancası hangisi?',
    correct: 'Wie geht es dir?',
    distractors: ['Was machst du?', 'Wer bist du?', 'Wo bist du?'],
  },
  {
    id: 'p43',
    prompt: 'Bu ne kadar?',
    promptHint: 'Almancası hangisi?',
    correct: 'Wie viel kostet das?',
    distractors: [
      'Wie viele kostet das?',
      'Was kostet viel?',
      'Welche kostet das?',
    ],
  },

  // Which answer fits?
  {
    id: 'p44',
    prompt: 'Was ist das?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Das ist ein Buch.',
    distractors: [
      'Ich bin Anna.',
      'Ich wohne in Berlin.',
      'Mir geht es gut.',
    ],
  },
  {
    id: 'p45',
    prompt: 'Wer bist du?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Ich bin Anna.',
    distractors: [
      'Das ist ein Buch.',
      'Ich gehe zur Schule.',
      'Das kostet fünf Euro.',
    ],
  },
  {
    id: 'p46',
    prompt: 'Wo wohnst du?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Ich wohne in Berlin.',
    distractors: [
      'Ich komme aus der Türkei.',
      'Ich gehe zur Schule.',
      'Ich mag Blau.',
    ],
  },
  {
    id: 'p47',
    prompt: 'Wohin gehst du?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Ich gehe zur Schule.',
    distractors: [
      'Ich wohne in Berlin.',
      'Ich komme aus der Türkei.',
      'Mir geht es gut.',
    ],
  },
  {
    id: 'p48',
    prompt: 'Woher kommst du?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Ich komme aus der Türkei.',
    distractors: [
      'Ich gehe zur Schule.',
      'Ich wohne in Berlin.',
      'Das ist ein Buch.',
    ],
  },
  {
    id: 'p49',
    prompt: 'Wie geht es dir?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Mir geht es gut.',
    distractors: [
      'Ich bin Anna.',
      'Ich mag Blau.',
      'Das kostet fünf Euro.',
    ],
  },
  {
    id: 'p50',
    prompt: 'Wie viel kostet das?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Das kostet fünf Euro.',
    distractors: [
      'Ich habe zwei Geschwister.',
      'Ich mag Blau.',
      'Der Kurs beginnt um zehn Uhr.',
    ],
  },

  // Extra pool → 90
  {
    id: 'p51',
    prompt: 'Was machst du?',
    promptHint: 'Anlamı hangisi?',
    correct: 'Ne yapıyorsun?',
    distractors: ['Kimsin?', 'Neredesin?', 'Nasılsın?'],
  },
  {
    id: 'p52',
    prompt: 'Wann kommst du?',
    promptHint: 'Anlamı hangisi?',
    correct: 'Ne zaman geliyorsun?',
    distractors: ['Nereden geliyorsun?', 'Nereye gidiyorsun?', 'Neden geliyorsun?'],
  },
  {
    id: 'p53',
    prompt: 'Welche Stadt magst du?',
    promptHint: 'Anlamı hangisi?',
    correct: 'Hangi şehri seversin?',
    distractors: ['Nerede yaşıyorsun?', 'Ne kadar tutuyor?', 'Kim geliyor?'],
  },
  {
    id: 'p54',
    prompt: 'Wie heißt du?',
    promptHint: 'Anlamı hangisi?',
    correct: 'Adın ne?',
    distractors: ['Nasılsın?', 'Kimsin?', 'Nerelisin?'],
  },
  {
    id: 'p55',
    prompt: 'Wo ist der Bahnhof?',
    promptHint: 'Anlamı hangisi?',
    correct: 'Tren istasyonu nerede?',
    distractors: ['Tren istasyonuna nereye?', 'Tren istasyonundan nereden?', 'Tren ne zaman?'],
  },
  {
    id: 'p56',
    prompt: 'Wohin fährst du?',
    promptHint: 'Anlamı hangisi?',
    correct: 'Nereye gidiyorsun? (araçla)',
    distractors: ['Nerede oturuyorsun?', 'Nereden geliyorsun?', 'Ne zaman gidiyorsun?'],
  },
  {
    id: 'p57',
    prompt: 'Woher bist du?',
    promptHint: 'Anlamı hangisi?',
    correct: 'Nerelisin?',
    distractors: ['Neredesin?', 'Nereye gidiyorsun?', 'Kimsin?'],
  },
  {
    id: 'p58',
    prompt: 'Wie viele Personen?',
    promptHint: 'Anlamı hangisi?',
    correct: 'Kaç kişi?',
    distractors: ['Ne kadar?', 'Hangisi?', 'Ne zaman?'],
  },
  {
    id: 'p59',
    prompt: 'Wie viel Uhr ist es?',
    promptHint: 'Anlamı hangisi?',
    correct: 'Saat kaç?',
    distractors: ['Kaç tane?', 'Ne kadar tutuyor?', 'Ne zaman?'],
  },
  {
    id: 'p60',
    prompt: 'Warum bist du hier?',
    promptHint: 'Anlamı hangisi?',
    correct: 'Neden buradasın?',
    distractors: ['Nerede buradasın?', 'Ne zaman buradasın?', 'Kim buradadır?'],
  },

  {
    id: 'p61',
    prompt: 'Ne yapıyorsun?',
    promptHint: 'Almancası hangisi?',
    correct: 'Was machst du?',
    distractors: ['Wer bist du?', 'Wo bist du?', 'Wie geht es?'],
  },
  {
    id: 'p62',
    prompt: 'Adın ne?',
    promptHint: 'Almancası hangisi?',
    correct: 'Wie heißt du?',
    distractors: ['Was ist das?', 'Wer ist das?', 'Wo wohnst du?'],
  },
  {
    id: 'p63',
    prompt: 'Nerelisin?',
    promptHint: 'Almancası hangisi?',
    correct: 'Woher bist du?',
    distractors: ['Wo bist du?', 'Wohin gehst du?', 'Wer bist du?'],
  },
  {
    id: 'p64',
    prompt: 'Saat kaç?',
    promptHint: 'Almancası hangisi?',
    correct: 'Wie viel Uhr ist es?',
    distractors: ['Wie viele Uhr ist es?', 'Wann ist es?', 'Was Uhr ist es?'],
  },
  {
    id: 'p65',
    prompt: 'Kaç kişi?',
    promptHint: 'Almancası hangisi?',
    correct: 'Wie viele Personen?',
    distractors: ['Wie viel Personen?', 'Welche Personen?', 'Wer Personen?'],
  },
  {
    id: 'p66',
    prompt: 'Neden buradasın?',
    promptHint: 'Almancası hangisi?',
    correct: 'Warum bist du hier?',
    distractors: ['Wann bist du hier?', 'Wo bist du hier?', 'Wie bist du hier?'],
  },
  {
    id: 'p67',
    prompt: 'Hangi şehri seversin?',
    promptHint: 'Almancası hangisi?',
    correct: 'Welche Stadt magst du?',
    distractors: ['Was Stadt magst du?', 'Wo Stadt magst du?', 'Wie Stadt magst du?'],
  },
  {
    id: 'p68',
    prompt: 'Tren istasyonu nerede?',
    promptHint: 'Almancası hangisi?',
    correct: 'Wo ist der Bahnhof?',
    distractors: ['Wohin ist der Bahnhof?', 'Woher ist der Bahnhof?', 'Wann ist der Bahnhof?'],
  },

  {
    id: 'p69',
    prompt: '___ heißt du?',
    promptHint: 'Hangi W-kelimesi?',
    correct: 'Wie',
    distractors: ['Was', 'Wer', 'Wo'],
  },
  {
    id: 'p70',
    prompt: '___ machst du heute?',
    promptHint: 'Hangi W-kelimesi?',
    correct: 'Was',
    distractors: ['Wer', 'Wann', 'Wo'],
  },
  {
    id: 'p71',
    prompt: '___ ist der Supermarkt?',
    promptHint: 'Hangi W-kelimesi?',
    correct: 'Wo',
    distractors: ['Wohin', 'Woher', 'Was'],
  },
  {
    id: 'p72',
    prompt: '___ fährst du in den Urlaub?',
    promptHint: 'Hangi W-kelimesi?',
    correct: 'Wohin',
    distractors: ['Wo', 'Woher', 'Wann'],
  },
  {
    id: 'p73',
    prompt: '___ kommt dein Freund?',
    promptHint: 'Hangi W-kelimesi?',
    correct: 'Woher',
    distractors: ['Wohin', 'Wo', 'Wer'],
  },
  {
    id: 'p74',
    prompt: '___ Uhr ist es?',
    promptHint: 'Hangi ifade?',
    correct: 'Wie viel',
    distractors: ['Wie viele', 'Welche', 'Was'],
  },
  {
    id: 'p75',
    prompt: '___ Personen kommen?',
    promptHint: 'Hangi ifade?',
    correct: 'Wie viele',
    distractors: ['Wie viel', 'Welche', 'Wer'],
  },
  {
    id: 'p76',
    prompt: '___ Stadt magst du?',
    promptHint: 'Hangi W-kelimesi?',
    correct: 'Welche',
    distractors: ['Was', 'Wie', 'Wo'],
  },
  {
    id: 'p77',
    prompt: '___ bist du müde?',
    promptHint: 'Hangi W-kelimesi?',
    correct: 'Warum',
    distractors: ['Wann', 'Wie', 'Wo'],
  },
  {
    id: 'p78',
    prompt: '___ beginnt der Film?',
    promptHint: 'Hangi W-kelimesi?',
    correct: 'Wann',
    distractors: ['Warum', 'Wo', 'Was'],
  },

  {
    id: 'p79',
    prompt: 'Wie heißt du?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Ich heiße Vildan.',
    distractors: ['Mir geht es gut.', 'Ich wohne in Berlin.', 'Das ist ein Buch.'],
  },
  {
    id: 'p80',
    prompt: 'Was machst du?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Ich lerne Deutsch.',
    distractors: ['Ich bin Anna.', 'Ich komme aus Ankara.', 'Das kostet zwei Euro.'],
  },
  {
    id: 'p81',
    prompt: 'Wann kommst du?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Ich komme um drei Uhr.',
    distractors: ['Ich wohne in Köln.', 'Ich mag Rot.', 'Ich gehe zur Arbeit.'],
  },
  {
    id: 'p82',
    prompt: 'Welche Stadt magst du?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Ich mag Hamburg.',
    distractors: ['Ich habe eine Schwester.', 'Mir geht es gut.', 'Das ist Brot.'],
  },
  {
    id: 'p83',
    prompt: 'Wo ist der Bahnhof?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Der Bahnhof ist dort.',
    distractors: ['Ich fahre nach Hause.', 'Ich komme aus Izmir.', 'Es kostet zehn Euro.'],
  },
  {
    id: 'p84',
    prompt: 'Wohin fährst du?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Ich fahre nach Hause.',
    distractors: ['Ich wohne in München.', 'Ich komme aus Wien.', 'Ich heiße Ali.'],
  },
  {
    id: 'p85',
    prompt: 'Woher bist du?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Ich bin aus Ankara.',
    distractors: ['Ich gehe zur Schule.', 'Ich mag Grün.', 'Das ist Wasser.'],
  },
  {
    id: 'p86',
    prompt: 'Wie viele Personen?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Vier Personen.',
    distractors: ['Fünf Euro.', 'Um acht Uhr.', 'In Berlin.'],
  },
  {
    id: 'p87',
    prompt: 'Wie viel Uhr ist es?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Es ist zwei Uhr.',
    distractors: ['Zwei Personen.', 'Zwei Euro.', 'Zwei Bücher.'],
  },
  {
    id: 'p88',
    prompt: 'Warum bist du hier?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Weil ich Deutsch lerne.',
    distractors: ['Ich heiße Can.', 'Ich mag Gelb.', 'Das kostet acht Euro.'],
  },
  {
    id: 'p89',
    prompt: 'Welche Farbe magst du?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Ich mag Rot.',
    distractors: ['Ich wohne in Bonn.', 'Ich komme um fünf.', 'Das ist Tee.'],
  },
  {
    id: 'p90',
    prompt: 'Wie viele Geschwister hast du?',
    promptHint: 'Uygun cevap hangisi?',
    correct: 'Ich habe eine Schwester.',
    distractors: [
      'Das kostet drei Euro.',
      'Ich gehe nach Hause.',
      'Mir geht es schlecht.',
    ],
  },
] as const

function shuffle<T>(items: T[]): T[] {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

function toQuestion(item: PoolItem, index: number): WFragenQuizQuestion {
  const labels = shuffle([item.correct, ...item.distractors])
  const options = labels.map((label, optionIndex) => ({
    id: `${item.id}-o${optionIndex}`,
    label,
  }))
  const correctId = options.find((option) => option.label === item.correct)!.id

  return {
    id: `wf-${item.id}-${index}-${Math.random().toString(36).slice(2, 6)}`,
    prompt: item.prompt,
    promptHint: item.promptHint,
    options,
    correctId,
  }
}

export type WFragenQuizCount = 10 | 15 | 20

export const WFRAGEN_QUIZ_COUNTS: readonly WFragenQuizCount[] = [10, 15, 20]

/** Pick `count` random questions from the 90-item pool. */
export function generateWFragenQuiz(
  count: WFragenQuizCount = 10,
): WFragenQuizQuestion[] {
  if (wFragenQuizPool.length < count) {
    throw new Error(
      `W-Fragen pool has ${wFragenQuizPool.length} items, need ${count}`,
    )
  }
  return shuffle([...wFragenQuizPool])
    .slice(0, count)
    .map((item, index) => toQuestion(item, index))
}
