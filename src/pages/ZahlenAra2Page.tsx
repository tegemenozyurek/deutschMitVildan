import { useCallback, useState } from 'react'
import { ZahlenNumberLesson } from '../components/ZahlenNumberLesson'
import { randomTwoDigitMixed, twoDigitGerman } from '../lib/germanNumbers'

function makeNumbers() {
  return randomTwoDigitMixed(3).map((n) => ({
    n,
    de: twoDigitGerman(n),
  }))
}

export function ZahlenAra2Page() {
  const [numbers, setNumbers] = useState(makeNumbers)

  const reroll = useCallback(() => {
    setNumbers(makeNumbers())
  }, [])

  return (
    <ZahlenNumberLesson
      titleTr="Ara sayılar: 35, 67, 84"
      titleDe="Gemischte Zahlen: 35, 67, 84"
      numbers={numbers}
      columns={1}
      onReroll={reroll}
    />
  )
}
