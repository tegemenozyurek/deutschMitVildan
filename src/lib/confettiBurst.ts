import confetti from 'canvas-confetti'

export function burstConfetti() {
  const count = 120
  const defaults = {
    origin: { y: 0.65 },
    zIndex: 80,
    disableForReducedMotion: true,
  }

  confetti({
    ...defaults,
    particleCount: count * 0.35,
    spread: 55,
    startVelocity: 38,
    colors: ['#c0392b', '#e6b422', '#1b4d3e', '#faf3ea', '#3d2418'],
  })

  window.setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: count * 0.3,
      spread: 80,
      startVelocity: 28,
      scalar: 0.95,
      colors: ['#c0392b', '#e6b422', '#1b4d3e'],
    })
  }, 120)

  window.setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: count * 0.25,
      angle: 60,
      spread: 50,
      origin: { x: 0, y: 0.7 },
    })
    confetti({
      ...defaults,
      particleCount: count * 0.25,
      angle: 120,
      spread: 50,
      origin: { x: 1, y: 0.7 },
    })
  }, 200)
}
