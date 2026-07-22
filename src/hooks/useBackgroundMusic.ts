import { useEffect } from 'react'
import { backgroundMusic } from '../lib/backgroundMusic'

/** Starts chill playlist on first user interaction (browser autoplay rules) */
export function useBackgroundMusic() {
  useEffect(() => {
    const start = () => {
      backgroundMusic.unlockAndStart()
      window.removeEventListener('pointerdown', start)
      window.removeEventListener('keydown', start)
    }

    window.addEventListener('pointerdown', start)
    window.addEventListener('keydown', start)

    return () => {
      window.removeEventListener('pointerdown', start)
      window.removeEventListener('keydown', start)
    }
  }, [])
}
