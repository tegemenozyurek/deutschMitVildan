import fartUrl from '../assets/music/fart.mp3'

let fartAudio: HTMLAudioElement | null = null

function getFartAudio() {
  if (!fartAudio) {
    fartAudio = new Audio(fartUrl)
    fartAudio.preload = 'auto'
  }
  return fartAudio
}

/** Plays the real fart.mp3 asset */
export async function playFartSound() {
  const audio = getFartAudio()
  try {
    audio.pause()
    audio.currentTime = 0
    audio.volume = 0.85
    await audio.play()
  } catch {
    // Autoplay / gesture edge cases — ignore
  }
}
