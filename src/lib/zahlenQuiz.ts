import {
  randomThreeDigitMixed,
  randomTwoDigitMixed,
  threeDigitGerman,
  twoDigitGerman,
} from './germanNumbers'

export type QuizOption = {
  id: string
  label: string
}

export type QuizQuestion = {
  id: string
  prompt: string
  promptHint: string
  options: QuizOption[]
  correctId: string
}

type Pair = { n: number; de: string }

const FIXED_1_20: Pair[] = [
  { n: 1, de: 'eins' },
  { n: 2, de: 'zwei' },
  { n: 3, de: 'drei' },
  { n: 4, de: 'vier' },
  { n: 5, de: 'fünf' },
  { n: 6, de: 'sechs' },
  { n: 7, de: 'sieben' },
  { n: 8, de: 'acht' },
  { n: 9, de: 'neun' },
  { n: 10, de: 'zehn' },
  { n: 11, de: 'elf' },
  { n: 12, de: 'zwölf' },
  { n: 13, de: 'dreizehn' },
  { n: 14, de: 'vierzehn' },
  { n: 15, de: 'fünfzehn' },
  { n: 16, de: 'sechzehn' },
  { n: 17, de: 'siebzehn' },
  { n: 18, de: 'achtzehn' },
  { n: 19, de: 'neunzehn' },
  { n: 20, de: 'zwanzig' },
]

const TENS: Pair[] = [
  { n: 10, de: 'zehn' },
  { n: 20, de: 'zwanzig' },
  { n: 30, de: 'dreißig' },
  { n: 40, de: 'vierzig' },
  { n: 50, de: 'fünfzig' },
  { n: 60, de: 'sechzig' },
  { n: 70, de: 'siebzig' },
  { n: 80, de: 'achtzig' },
  { n: 90, de: 'neunzig' },
  { n: 100, de: 'hundert' },
]

function shuffle<T>(items: T[]): T[] {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

function buildPool(): Pair[] {
  const twoDigit = randomTwoDigitMixed(40).map((n) => ({
    n,
    de: twoDigitGerman(n),
  }))
  const threeDigit = randomThreeDigitMixed(30).map((n) => ({
    n,
    de: threeDigitGerman(n),
  }))
  // dedupe by n
  const map = new Map<number, Pair>()
  for (const p of [...FIXED_1_20, ...TENS, ...twoDigit, ...threeDigit]) {
    map.set(p.n, p)
  }
  return [...map.values()]
}

function pickDistractors(pool: Pair[], correct: Pair, count: number): Pair[] {
  const others = shuffle(pool.filter((p) => p.n !== correct.n))
  return others.slice(0, count)
}

function makeNumberToGerman(pool: Pair[], index: number): QuizQuestion {
  const correct = pool[Math.floor(Math.random() * pool.length)]!
  const distractors = pickDistractors(pool, correct, 3)
  const options = shuffle([correct, ...distractors]).map((p) => ({
    id: `n-${p.n}`,
    label: p.de,
  }))
  return {
    id: `q-n2de-${index}-${correct.n}`,
    prompt: String(correct.n),
    promptHint: 'Almancası hangisi?',
    options,
    correctId: `n-${correct.n}`,
  }
}

function makeGermanToNumber(pool: Pair[], index: number): QuizQuestion {
  const correct = pool[Math.floor(Math.random() * pool.length)]!
  const distractors = pickDistractors(pool, correct, 3)
  const options = shuffle([correct, ...distractors]).map((p) => ({
    id: `d-${p.n}`,
    label: String(p.n),
  }))
  return {
    id: `q-de2n-${index}-${correct.n}`,
    prompt: correct.de,
    promptHint: 'Hangi sayı?',
    options,
    correctId: `d-${correct.n}`,
  }
}

/** Build 10 fresh multiple-choice Zahlen questions */
export function generateZahlenQuiz(count = 10): QuizQuestion[] {
  const pool = buildPool()
  const questions: QuizQuestion[] = []
  for (let i = 0; i < count; i += 1) {
    const kind = Math.random() < 0.5 ? 'n2de' : 'de2n'
    questions.push(
      kind === 'n2de'
        ? makeNumberToGerman(pool, i)
        : makeGermanToNumber(pool, i),
    )
  }
  return questions
}
