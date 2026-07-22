import { cardinalGerman } from './germanNumbers'
import {
  formatEuro,
  randomEuroPrice,
  speakableEuro,
} from './germanPrices'
import {
  formatDigitalTime,
  randomDigitalTime,
  speakableDigitalTime,
} from './germanTime'

export type QuizDifficulty = 'kolay' | 'orta' | 'zor'

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

const QUESTION_COUNT = 15

function shuffle<T>(items: T[]): T[] {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

function rangePairs(from: number, to: number): Pair[] {
  const pairs: Pair[] = []
  for (let n = from; n <= to; n += 1) {
    pairs.push({ n, de: cardinalGerman(n) })
  }
  return pairs
}

function poolForDifficulty(level: QuizDifficulty): Pair[] {
  if (level === 'kolay') return rangePairs(0, 20)
  if (level === 'orta') return rangePairs(10, 99)
  return rangePairs(20, 999)
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
    id: `q-n2de-${index}-${correct.n}-${Math.random().toString(36).slice(2, 6)}`,
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
    id: `q-de2n-${index}-${correct.n}-${Math.random().toString(36).slice(2, 6)}`,
    prompt: correct.de,
    promptHint: 'Hangi sayı?',
    options,
    correctId: `d-${correct.n}`,
  }
}

type TimePair = { key: string; digital: string; spoken: string }

function randomTimePair(): TimePair {
  const t = randomDigitalTime()
  const digital = formatDigitalTime(t.hours, t.minutes)
  const spoken = speakableDigitalTime(t.hours, t.minutes)
  return { key: digital, digital, spoken }
}

function makeTimeQuestion(index: number): QuizQuestion {
  const correct = randomTimePair()
  const distractors: TimePair[] = []
  while (distractors.length < 3) {
    const next = randomTimePair()
    if (
      next.key !== correct.key &&
      !distractors.some((d) => d.key === next.key)
    ) {
      distractors.push(next)
    }
  }

  const askDigital = Math.random() < 0.5
  if (askDigital) {
    const options = shuffle([correct, ...distractors]).map((p) => ({
      id: `t-${p.key}`,
      label: p.spoken,
    }))
    return {
      id: `q-time-d-${index}-${correct.key}`,
      prompt: correct.digital,
      promptHint: 'Saat Almancası hangisi?',
      options,
      correctId: `t-${correct.key}`,
    }
  }

  const options = shuffle([correct, ...distractors]).map((p) => ({
    id: `t-${p.key}`,
    label: p.digital,
  }))
  return {
    id: `q-time-s-${index}-${correct.key}`,
    prompt: correct.spoken,
    promptHint: 'Dijital saat hangisi?',
    options,
    correctId: `t-${correct.key}`,
  }
}

type PricePair = { key: string; display: string; spoken: string }

function randomPricePair(): PricePair {
  const p = randomEuroPrice()
  const display = formatEuro(p.euros, p.cents)
  const spoken = speakableEuro(p.euros, p.cents)
  return { key: display, display, spoken }
}

function makePriceQuestion(index: number): QuizQuestion {
  const correct = randomPricePair()
  const distractors: PricePair[] = []
  while (distractors.length < 3) {
    const next = randomPricePair()
    if (
      next.key !== correct.key &&
      !distractors.some((d) => d.key === next.key)
    ) {
      distractors.push(next)
    }
  }

  const askDisplay = Math.random() < 0.5
  if (askDisplay) {
    const options = shuffle([correct, ...distractors]).map((p) => ({
      id: `p-${p.key}`,
      label: p.spoken,
    }))
    return {
      id: `q-price-d-${index}-${correct.key}`,
      prompt: correct.display,
      promptHint: 'Fiyat Almancası hangisi?',
      options,
      correctId: `p-${correct.key}`,
    }
  }

  const options = shuffle([correct, ...distractors]).map((p) => ({
    id: `p-${p.key}`,
    label: p.display,
  }))
  return {
    id: `q-price-s-${index}-${correct.key}`,
    prompt: correct.spoken,
    promptHint: 'Fiyat hangisi?',
    options,
    correctId: `p-${correct.key}`,
  }
}

type Maker = (index: number) => QuizQuestion

/** 15 MC questions tailored to difficulty */
export function generateZahlenQuiz(
  level: QuizDifficulty,
  count = QUESTION_COUNT,
): QuizQuestion[] {
  const pool = poolForDifficulty(level)
  const makers: Maker[] = []

  for (let i = 0; i < count; i += 1) {
    if (level === 'zor') {
      const roll = Math.random()
      if (roll < 0.2) {
        makers.push((idx) => makeTimeQuestion(idx))
      } else if (roll < 0.4) {
        makers.push((idx) => makePriceQuestion(idx))
      } else if (roll < 0.7) {
        makers.push((idx) => makeNumberToGerman(pool, idx))
      } else {
        makers.push((idx) => makeGermanToNumber(pool, idx))
      }
    } else if (Math.random() < 0.5) {
      makers.push((idx) => makeNumberToGerman(pool, idx))
    } else {
      makers.push((idx) => makeGermanToNumber(pool, idx))
    }
  }

  return makers.map((make, i) => make(i))
}

export { QUESTION_COUNT }
