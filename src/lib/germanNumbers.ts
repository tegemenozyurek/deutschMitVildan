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

/** German word for 21–99 (compound / “ara” numbers). */
export function twoDigitGerman(n: number): string {
  if (n < 21 || n > 99 || n % 10 === 0) {
    throw new Error(`twoDigitGerman expects 21–99 non-tens, got ${n}`)
  }
  const ones = n % 10
  const tens = Math.floor(n / 10)
  return `${onesBeforeUnd[ones]}und${tensWords[tens]}`
}

/** 9 unique random values from 21–99 excluding round tens. */
export function randomTwoDigitMixed(count = 9): number[] {
  const pool: number[] = []
  for (let n = 21; n <= 99; n += 1) {
    if (n % 10 !== 0) pool.push(n)
  }

  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }

  return pool.slice(0, count)
}
