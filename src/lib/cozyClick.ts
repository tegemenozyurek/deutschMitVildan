let sharedCtx: AudioContext | null = null

function getCtx() {
  if (typeof window === 'undefined') return null
  sharedCtx ??= new AudioContext()
  return sharedCtx
}

/** Soft, warm UI click — cozy marimba-like plink */
export function playCozyClick() {
  const ctx = getCtx()
  if (!ctx) return

  void ctx.resume()

  const now = ctx.currentTime
  const master = ctx.createGain()
  master.gain.value = 0.22
  master.connect(ctx.destination)

  // Warm fundamental
  const osc1 = ctx.createOscillator()
  const g1 = ctx.createGain()
  osc1.type = 'sine'
  osc1.frequency.setValueAtTime(660, now)
  osc1.frequency.exponentialRampToValueAtTime(420, now + 0.14)
  g1.gain.setValueAtTime(0.0001, now)
  g1.gain.exponentialRampToValueAtTime(1, now + 0.012)
  g1.gain.exponentialRampToValueAtTime(0.0001, now + 0.2)
  osc1.connect(g1)
  g1.connect(master)

  // Soft overtone
  const osc2 = ctx.createOscillator()
  const g2 = ctx.createGain()
  osc2.type = 'triangle'
  osc2.frequency.setValueAtTime(990, now)
  osc2.frequency.exponentialRampToValueAtTime(640, now + 0.1)
  g2.gain.setValueAtTime(0.0001, now)
  g2.gain.exponentialRampToValueAtTime(0.35, now + 0.01)
  g2.gain.exponentialRampToValueAtTime(0.0001, now + 0.16)
  osc2.connect(g2)
  g2.connect(master)

  osc1.start(now)
  osc2.start(now)
  osc1.stop(now + 0.22)
  osc2.stop(now + 0.22)
}
