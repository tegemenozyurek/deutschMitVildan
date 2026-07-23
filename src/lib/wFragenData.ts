export type WFragenWord = {
  id: string
  de: string
  tr: string
  /** Spoken form for TTS (defaults to `de`). */
  speak?: string
}

export type WFragenExample = {
  id: string
  /** W-word to color in the German question. */
  wWord: string
  de: string
  tr: string
  answerDe: string
  answerTr: string
}

export type WFragenExampleGroup = {
  headingTr: string
  headingDe: string
  examples: readonly WFragenExample[]
}

export type WFragenSection =
  | {
      id: string
      tr: string
      de: string
      kind: 'words'
      words: readonly WFragenWord[]
      columns?: 1 | 2
    }
  | {
      id: string
      tr: string
      de: string
      kind: 'examples'
      groups: readonly WFragenExampleGroup[]
    }

export const wFragenSections: readonly WFragenSection[] = [
  {
    id: 'temel',
    tr: 'Temel soru sözcükleri',
    de: 'Was, Wer, Wann, Wie, Warum, Welche',
    kind: 'words',
    columns: 2,
    words: [
      { id: 'was', de: 'Was?', tr: 'Ne?', speak: 'Was' },
      { id: 'wer', de: 'Wer?', tr: 'Kim?', speak: 'Wer' },
      { id: 'wann', de: 'Wann?', tr: 'Ne zaman?', speak: 'Wann' },
      { id: 'wie', de: 'Wie?', tr: 'Nasıl?', speak: 'Wie' },
      { id: 'warum', de: 'Warum?', tr: 'Neden?', speak: 'Warum' },
      { id: 'welche', de: 'Welche?', tr: 'Hangisi?', speak: 'Welche' },
    ],
  },
  {
    id: 'yer',
    tr: 'Yer ve yön',
    de: 'Wo, Wohin, Woher',
    kind: 'words',
    columns: 1,
    words: [
      { id: 'wo', de: 'Wo?', tr: 'Nerede?', speak: 'Wo' },
      { id: 'wohin', de: 'Wohin?', tr: 'Nereye?', speak: 'Wohin' },
      { id: 'woher', de: 'Woher?', tr: 'Nereden?', speak: 'Woher' },
    ],
  },
  {
    id: 'miktar',
    tr: 'Miktar sorma',
    de: 'Wie viel / Wie viele',
    kind: 'words',
    columns: 1,
    words: [
      {
        id: 'wieviel',
        de: 'Wie viel?',
        tr: 'Ne kadar? (ölçülemeyen)',
        speak: 'Wie viel',
      },
      {
        id: 'wieviele',
        de: 'Wie viele?',
        tr: 'Kaç tane? (sayılabilir)',
        speak: 'Wie viele',
      },
    ],
  },
  {
    id: 'ornekler',
    tr: 'Örnek sorular',
    de: 'Beispielfragen',
    kind: 'examples',
    groups: [
      {
        headingTr: 'Temel soru sözcükleri',
        headingDe: 'Was, Wer, Wann, Wie, Warum, Welche',
        examples: [
          {
            id: 'was',
            wWord: 'Was',
            de: 'Was ist das?',
            tr: 'Bu nedir?',
            answerDe: 'Das ist ein Buch.',
            answerTr: 'Bu bir kitap.',
          },
          {
            id: 'wer',
            wWord: 'Wer',
            de: 'Wer bist du?',
            tr: 'Sen kimsin?',
            answerDe: 'Ich bin Anna.',
            answerTr: 'Ben Anna’yım.',
          },
          {
            id: 'wann',
            wWord: 'Wann',
            de: 'Wann beginnt der Kurs?',
            tr: 'Kurs ne zaman başlıyor?',
            answerDe: 'Der Kurs beginnt um zehn Uhr.',
            answerTr: 'Kurs saat onda başlıyor.',
          },
          {
            id: 'wie',
            wWord: 'Wie',
            de: 'Wie geht es dir?',
            tr: 'Nasılsın?',
            answerDe: 'Mir geht es gut.',
            answerTr: 'İyiyim.',
          },
          {
            id: 'warum',
            wWord: 'Warum',
            de: 'Warum lernst du Deutsch?',
            tr: 'Neden Almanca öğreniyorsun?',
            answerDe: 'Weil ich in Deutschland arbeiten möchte.',
            answerTr: 'Çünkü Almanya’da çalışmak istiyorum.',
          },
          {
            id: 'welche',
            wWord: 'Welche',
            de: 'Welche Farbe magst du?',
            tr: 'Hangi rengi seversin?',
            answerDe: 'Ich mag Blau.',
            answerTr: 'Maviyi severim.',
          },
        ],
      },
      {
        headingTr: 'Yer ve yön',
        headingDe: 'Wo, Wohin, Woher',
        examples: [
          {
            id: 'wo',
            wWord: 'Wo',
            de: 'Wo wohnst du?',
            tr: 'Nerede oturuyorsun?',
            answerDe: 'Ich wohne in Berlin.',
            answerTr: 'Berlin’de oturuyorum.',
          },
          {
            id: 'wohin',
            wWord: 'Wohin',
            de: 'Wohin gehst du?',
            tr: 'Nereye gidiyorsun?',
            answerDe: 'Ich gehe zur Schule.',
            answerTr: 'Okula gidiyorum.',
          },
          {
            id: 'woher',
            wWord: 'Woher',
            de: 'Woher kommst du?',
            tr: 'Nereden geliyorsun?',
            answerDe: 'Ich komme aus der Türkei.',
            answerTr: 'Türkiye’den geliyorum.',
          },
        ],
      },
      {
        headingTr: 'Miktar sorma',
        headingDe: 'Wie viel / Wie viele',
        examples: [
          {
            id: 'wieviel',
            wWord: 'Wie viel',
            de: 'Wie viel kostet das?',
            tr: 'Bu ne kadar?',
            answerDe: 'Das kostet fünf Euro.',
            answerTr: 'Beş Euro tutuyor.',
          },
          {
            id: 'wieviele',
            wWord: 'Wie viele',
            de: 'Wie viele Geschwister hast du?',
            tr: 'Kaç kardeşin var?',
            answerDe: 'Ich habe zwei Geschwister.',
            answerTr: 'İki kardeşim var.',
          },
        ],
      },
    ],
  },
] as const

export function getWFragenSection(id: string): WFragenSection | undefined {
  return wFragenSections.find((section) => section.id === id)
}
