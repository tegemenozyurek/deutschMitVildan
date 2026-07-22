import { useEffect } from 'react'
import { playCozyClick } from '../lib/cozyClick'

/** Plays a cozy click on every button / link interaction */
export function useCozyButtonSounds() {
  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return
      const target = event.target
      if (!(target instanceof Element)) return
      if (!target.closest('a, button')) return
      playCozyClick()
    }

    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [])
}
