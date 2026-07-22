import { ZahlenNumberLesson } from '../components/ZahlenNumberLesson'

const numbers = [
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
] as const

export function ZahlenZehnerPage() {
  return (
    <ZahlenNumberLesson
      titleTr="10–20–30 … 100"
      titleDe="Zehnerzahlen: 10, 20, 30 … 100"
      numbers={numbers}
      columns={2}
    />
  )
}
