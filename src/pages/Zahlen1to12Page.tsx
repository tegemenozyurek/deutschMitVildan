import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'
import { backgroundMusic } from '../lib/backgroundMusic'
import { prepareGermanSpeech, speakGerman } from '../lib/speakGerman'

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
  const [active, setActive] = useState<number | null>(null)
  const [ttsOk, setTtsOk] = useState(true)

  useEffect(() => {
    prepareGermanSpeech()
    setTtsOk(typeof window !== 'undefined' && 'speechSynthesis' in window)
  }, [])

  const onPress = (n: number, de: string) => {
    setActive(n)
    backgroundMusic.duck(1600)
    const ok = speakGerman(de)
    if (!ok) setTtsOk(false)
    window.setTimeout(() => {
      setActive((current) => (current === n ? null : current))
    }, 700)
  }

  return (
    <PageShell>
      <header className="relative z-10 w-full max-w-lg px-2 pt-5 text-center animate-[rise_0.9s_ease_both]">
        <h1 className="font-[family-name:var(--font-cozy)] text-[clamp(1.7rem,6.5vw,2.8rem)] font-semibold leading-tight text-[#1a1210]">
          1–12 arası sayılar
        </h1>
        <p className="mt-1 font-[family-name:var(--font-cozy)] text-base text-[#c0392b] sm:text-lg">
          Zahlen von 1 bis 12
        </p>
        {!ttsOk && (
          <p className="mt-2 text-sm text-[#c0392b]">
            Bu tarayıcıda seslendirme desteklenmiyor. Cihazın Almanca TTS sesinin
            açık olduğundan emin ol.
          </p>
        )}
      </header>

      <div className="relative z-10 grid w-full max-w-md flex-1 grid-cols-3 content-center gap-3 px-1 py-8 animate-[rise_0.9s_0.08s_ease_both] sm:gap-4">
        {numbers.map(({ n, de }) => (
          <button
            key={n}
            type="button"
            onPointerDown={(event) => {
              // Speak on pointerdown for iOS/Android gesture reliability
              if (event.button !== 0 && event.pointerType === 'mouse') return
              onPress(n, de)
            }}
            className={`flex min-h-[6.25rem] flex-col items-center justify-center rounded-2xl border-[3px] border-[#3d2418] px-2 py-4 transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0392b] active:scale-[0.97] sm:min-h-[6.75rem] ${
              active === n
                ? 'bg-[#3d2418] text-[#faf3ea]'
                : 'bg-[#fff8f0] text-[#1a1210] hover:bg-[#fff3e6]'
            }`}
            aria-label={`${n}, ${de}`}
          >
            <span className="font-[family-name:var(--font-cozy)] text-2xl font-semibold leading-none sm:text-3xl">
              {n}
            </span>
            <span
              className={`mt-2 font-[family-name:var(--font-cozy)] text-base font-semibold leading-tight sm:text-lg ${
                active === n ? 'text-[#e6b422]' : 'text-[#c0392b]'
              }`}
            >
              {de}
            </span>
          </button>
        ))}
      </div>

      <Link
        to="/konular/zahlen/anlatim"
        className="relative z-10 mb-2 rounded-2xl border-[3px] border-[#3d2418] bg-[#fff8f0] px-6 py-3 font-semibold text-[#1a1210] transition hover:-translate-y-0.5"
      >
        Geri dön
      </Link>
    </PageShell>
  )
}
