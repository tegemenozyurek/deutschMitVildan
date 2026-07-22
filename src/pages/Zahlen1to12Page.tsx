import { ZahlenNumberLesson } from '../components/ZahlenNumberLesson'

const numbers = [
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
] as const

export function Zahlen1to12Page() {
  return (
    <ZahlenNumberLesson
      titleTr="1–12 arası sayılar"
      titleDe="Zahlen von 1 bis 12"
      numbers={numbers}
    />
  )
}
