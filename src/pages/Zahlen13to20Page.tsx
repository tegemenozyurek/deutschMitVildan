import { ZahlenNumberLesson } from '../components/ZahlenNumberLesson'

const numbers = [
  { n: 13, de: 'dreizehn' },
  { n: 14, de: 'vierzehn' },
  { n: 15, de: 'fünfzehn' },
  { n: 16, de: 'sechzehn' },
  { n: 17, de: 'siebzehn' },
  { n: 18, de: 'achtzehn' },
  { n: 19, de: 'neunzehn' },
  { n: 20, de: 'zwanzig' },
] as const

export function Zahlen13to20Page() {
  return (
    <ZahlenNumberLesson
      titleTr="13–20 arası sayılar"
      titleDe="Zahlen von 13 bis 20"
      numbers={numbers}
      columns={2}
    />
  )
}
