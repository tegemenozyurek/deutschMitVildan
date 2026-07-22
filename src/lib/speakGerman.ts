/** Cross-browser German TTS (desktop + mobile Chrome/Safari). Always call from a user gesture. */

let voicesReady = false
let unlockAttempted = false

function getSynth(): SpeechSynthesis | null {
  if (typeof window === 'undefined') return null
  return window.speechSynthesis ?? null
}

function pickGermanVoice(voices: SpeechSynthesisVoice[]) {
  const prefer = (v: SpeechSynthesisVoice) =>
    /^de(-|_)/i.test(v.lang) || v.lang.toLowerCase().startsWith('de')

  const german = voices.filter(prefer)
  if (german.length === 0) return null

  return (
    german.find((v) => /google/i.test(v.name) && /de-DE/i.test(v.lang)) ||
    german.find((v) => /de-DE/i.test(v.lang)) ||
    german.find((v) => /german|deutsch/i.test(v.name)) ||
    german[0]
  )
}

function ensureVoices(): SpeechSynthesisVoice[] {
  const synth = getSynth()
  if (!synth) return []

  const current = synth.getVoices()
  if (current.length > 0) {
    voicesReady = true
    return current
  }

  return []
}

/** Warm up voice list early (call once on mount). */
export function prepareGermanSpeech() {
  const synth = getSynth()
  if (!synth) return

  ensureVoices()

  const onVoices = () => {
    ensureVoices()
    voicesReady = true
  }

  if (typeof synth.addEventListener === 'function') {
    synth.addEventListener('voiceschanged', onVoices)
  } else {
    // Safari legacy
    synth.onvoiceschanged = onVoices
  }

  // Kick lazy voice loading on Chromium
  void synth.getVoices()
}

/**
 * Speaks German text. Must run inside click/pointerdown handler on mobile.
 * Returns false if Speech Synthesis is unavailable.
 */
export function speakGerman(text: string): boolean {
  const synth = getSynth()
  if (!synth) return false

  const trimmed = text.trim()
  if (!trimmed) return false

  // Chromium: cancel stuck queue; required before re-speak on many devices
  try {
    synth.cancel()
  } catch {
    // ignore
  }

  // iOS/Safari sometimes needs resume after cancel
  try {
    synth.resume()
  } catch {
    // ignore
  }

  // First-gesture unlock: some engines need a tiny silent utterance once
  if (!unlockAttempted) {
    unlockAttempted = true
    try {
      const warm = new SpeechSynthesisUtterance(' ')
      warm.volume = 0
      warm.rate = 1
      warm.lang = 'de-DE'
      synth.speak(warm)
      synth.cancel()
    } catch {
      // ignore
    }
  }

  const utter = new SpeechSynthesisUtterance(trimmed)
  utter.lang = 'de-DE'
  utter.rate = 0.92
  utter.pitch = 1
  utter.volume = 1

  const voices = ensureVoices()
  const voice = pickGermanVoice(voices)
  if (voice) {
    utter.voice = voice
    utter.lang = voice.lang || 'de-DE'
  }

  // Chrome Android bug: speaking can freeze — nudge resume shortly after start
  utter.onstart = () => {
    window.setTimeout(() => {
      try {
        if (synth.speaking && synth.paused) synth.resume()
      } catch {
        // ignore
      }
    }, 50)
  }

  synth.speak(utter)

  // Keep reference so GC doesn't kill utterance early (Safari quirk)
  ;(window as unknown as { __lastGermanUtterance?: SpeechSynthesisUtterance }).__lastGermanUtterance =
    utter

  void voicesReady
  return true
}

export function stopGermanSpeech() {
  const synth = getSynth()
  if (!synth) return
  try {
    synth.cancel()
  } catch {
    // ignore
  }
}
