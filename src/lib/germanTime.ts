import { underHundredGerman } from './germanNumbers'

export type DigitalTime = {
  hours: number
  minutes: number
}

/** Display like 14:05 */
export function formatDigitalTime(hours: number, minutes: number): string {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
}

/**
 * Spoken digital time:
 * 14:00 → vierzehn Uhr
 * 14:05 → vierzehn Uhr fünf
 * 09:30 → neun Uhr dreißig
 * 00:15 → null Uhr fünfzehn
 */
export function speakableDigitalTime(hours: number, minutes: number): string {
  const hourWord =
    hours === 0 ? 'null' : hours === 1 ? 'ein' : underHundredGerman(hours)

  if (minutes === 0) return `${hourWord} Uhr`

  const minuteWord =
    minutes === 1 ? 'eins' : underHundredGerman(minutes)

  return `${hourWord} Uhr ${minuteWord}`
}

/** Random digital clock time (0–23 : 0–59, often round-ish minutes). */
export function randomDigitalTime(): DigitalTime {
  const hours = Math.floor(Math.random() * 24)
  const minutePool = [
    0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 3, 7, 12, 18, 22, 27, 33, 48,
  ]
  const minutes = minutePool[Math.floor(Math.random() * minutePool.length)]!
  return { hours, minutes }
}
