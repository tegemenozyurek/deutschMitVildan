import track1 from '../assets/music/1.mp3'
import track2 from '../assets/music/2.mp3'
import track3 from '../assets/music/3.mp3'
import track4 from '../assets/music/4.mp3'

const TRACKS = [track1, track2, track3, track4] as const

const VOLUME = 0.1

function shuffle<T>(items: readonly T[]): T[] {
  const next = [...items]
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[next[i], next[j]] = [next[j], next[i]]
  }
  return next
}

class BackgroundMusicPlayer {
  private audio = new Audio()
  private queue: string[] = []
  private index = 0
  private unlocked = false

  constructor() {
    this.audio.preload = 'auto'
    this.audio.volume = VOLUME
    this.audio.addEventListener('ended', () => this.playNext())
  }

  /** Call from a user gesture so browsers allow playback */
  unlockAndStart() {
    if (this.unlocked) return
    this.unlocked = true
    this.reshuffle()
    void this.playCurrent()
  }

  private reshuffle() {
    this.queue = shuffle(TRACKS)
    this.index = 0
  }

  private async playCurrent() {
    const src = this.queue[this.index]
    if (!src) return

    this.audio.src = src
    this.audio.volume = VOLUME
    try {
      await this.audio.play()
    } catch {
      // Autoplay blocked until next gesture
      this.unlocked = false
    }
  }

  private playNext() {
    this.index += 1
    if (this.index >= this.queue.length) {
      // New random order each full cycle
      this.reshuffle()
    }
    void this.playCurrent()
  }
}

export const backgroundMusic = new BackgroundMusicPlayer()
