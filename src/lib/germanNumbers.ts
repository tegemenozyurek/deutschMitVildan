const onesBeforeUnd = [
  '',
  'ein',
  'zwei',
  'drei',
  'vier',
  'fünf',
  'sechs',
  'sieben',
  'acht',
  'neun',
] as const

const onesStandalone = [
  '',
  'eins',
  'zwei',
  'drei',
  'vier',
  'fünf',
  'sechs',
  'sieben',
  'acht',
  'neun',
] as const

const teens = [
  'zehn',
  'elf',
  'zwölf',
  'dreizehn',
  'vierzehn',
  'fünfzehn',
  'sechzehn',
  'siebzehn',
  'achtzehn',
  'neunzehn',
] as const

const tensWords = [
  '',
  '',
  'zwanzig',
  'dreißig',
  'vierzig',
  'fünfzig',
  'sechzig',
  'siebzig',
  'achtzig',
  'neunzig',
] as const

const hundredsPrefix = [
  '',
  'hundert',
  'zweihundert',
  'dreihundert',
  'vierhundert',
  'fünfhundert',
  'sechshundert',
  'siebenhundert',
  'achthundert',
  'neunhundert',
] as const

function shuffleInPlace<T>(items: T[]) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[items[i], items[j]] = [items[j], items[i]]
  }
  return items
}

/** 0–99 German fragment (for combining after “hundert”). */
function underHundredGerman(n: number): string {
  if (n <= 0) return ''
  if (n < 10) return onesStandalone[n]
  if (n < 20) return teens[n - 10]
  if (n % 10 === 0) return tensWords[Math.floor(n / 10)]
  const ones = n % 10
  const tens = Math.floor(n / 10)
  return `${onesBeforeUnd[ones]}und${tensWords[tens]}`
}

/** German word for 21–99 (compound / “ara” numbers). */
export function twoDigitGerman(n: number): string {
  if (n < 21 || n > 99 || n % 10 === 0) {
    throw new Error(`twoDigitGerman expects 21–99 non-tens, got ${n}`)
  }
  return underHundredGerman(n)
}

/** German word for 101–999 excluding round hundreds. */
export function threeDigitGerman(n: number): string {
  if (n < 101 || n > 999 || n % 100 === 0) {
    throw new Error(`threeDigitGerman expects 101–999 non-hundreds, got ${n}`)
  }
  const hundreds = Math.floor(n / 100)
  const rest = n % 100
  return `${hundredsPrefix[hundreds]}${underHundredGerman(rest)}`
}

/** Unique random values from 21–99 excluding round tens. */
export function randomTwoDigitMixed(count = 9): number[] {
  const pool: number[] = []
  for (let n = 21; n <= 99; n += 1) {
    if (n % 10 !== 0) pool.push(n)
  }
  return shuffleInPlace(pool).slice(0, count)
}

/** Unique random values from 101–999 excluding round hundreds. */
export function randomThreeDigitMixed(count = 3): number[] {
  const pool: number[] = []
  for (let n = 101; n <= 999; n += 1) {
    if (n % 100 !== 0) pool.push(n)
  }
  return shuffleInPlace(pool).slice(0, count)
}
