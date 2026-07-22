import { euroAmountGerman, underHundredGerman } from './germanNumbers'

export type EuroPrice = {
  euros: number
  cents: number
}

/** Display like 12,50 € */
export function formatEuro(euros: number, cents: number): string {
  if (cents <= 0) return `${euros} €`
  return `${euros},${String(cents).padStart(2, '0')} €`
}

/** Spoken German price for TTS */
export function speakableEuro(euros: number, cents: number): string {
  if (euros === 0 && cents > 0) {
    return `${underHundredGerman(cents)} Cent`
  }

  const euroPart = `${euroAmountGerman(euros)} Euro`

  if (cents <= 0) return euroPart

  // Common spoken form: „ein Euro fünfzig“
  return `${euroPart} ${underHundredGerman(cents)}`
}

/** Random everyday price: 0,50–89,90 */
export function randomEuroPrice(): EuroPrice {
  const euros = Math.floor(Math.random() * 90) // 0–89
  const centOptions = [0, 50, 90, 99, 20, 30, 40, 70, 80]
  let cents = centOptions[Math.floor(Math.random() * centOptions.length)]!

  // Avoid 0,00
  if (euros === 0 && cents === 0) cents = 50

  return { euros, cents }
}
