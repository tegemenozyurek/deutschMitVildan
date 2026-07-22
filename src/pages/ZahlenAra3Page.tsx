import { useCallback, useState } from 'react'
import { ZahlenNumberLesson } from '../components/ZahlenNumberLesson'
import { randomThreeDigitMixed, threeDigitGerman } from '../lib/germanNumbers'

function makeNumbers() {
  return randomThreeDigitMixed(3)
    .slice(0, 3)
    .map((n) => ({
      n,
      de: threeDigitGerman(n),
    }))
}

export function ZahlenAra3Page() {
  const [numbers, setNumbers] = useState(makeNumbers)

  const reroll = useCallback(() => {
    setNumbers(makeNumbers())
  }, [])

  return (
    <ZahlenNumberLesson
      titleTr="Ara sayılar: 112, 475, 978"
      titleDe="Dreistellige Zahlen: 112, 475, 978"
      numbers={numbers}
      columns={1}
      longLabels
      onReroll={reroll}
    />
  )
}
