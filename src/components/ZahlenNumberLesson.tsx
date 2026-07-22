import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageShell } from './PageShell'
import { backgroundMusic } from '../lib/backgroundMusic'
import { prepareGermanSpeech, speakGerman } from '../lib/speakGerman'

type NumberItem = {
  n: number
  de: string
}

type ZahlenNumberLessonProps = {
  titleTr: string
  titleDe: string
  numbers: readonly NumberItem[]
  columns?: 2 | 3 | 4
}

export function ZahlenNumberLesson({
  titleTr,
  titleDe,
  numbers,
  columns = 3,
}: ZahlenNumberLessonProps) {
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

  const gridCols =
    columns === 2
      ? 'grid-cols-2'
      : columns === 4
        ? 'grid-cols-4'
        : 'grid-cols-3'

  return (
    <PageShell>
      <header className="relative z-10 w-full max-w-lg px-2 pt-5 text-center animate-[rise_0.9s_ease_both]">
        <h1 className="font-[family-name:var(--font-cozy)] text-[clamp(1.7rem,6.5vw,2.8rem)] font-semibold leading-tight text-[#1a1210]">
          {titleTr}
        </h1>
        <p className="mt-1 font-[family-name:var(--font-cozy)] text-base text-[#c0392b] sm:text-lg">
          {titleDe}
        </p>
        {!ttsOk && (
          <p className="mt-2 text-sm text-[#c0392b]">
            Bu tarayıcıda seslendirme desteklenmiyor. Cihazın Almanca TTS sesinin
            açık olduğundan emin ol.
          </p>
        )}
      </header>

      <div
        className={`relative z-10 grid w-full max-w-md flex-1 content-center gap-3 px-1 py-8 animate-[rise_0.9s_0.08s_ease_both] sm:gap-4 ${gridCols}`}
      >
        {numbers.map(({ n, de }) => (
          <button
            key={n}
            type="button"
            onPointerDown={(event) => {
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
            <span className="font-[family-name:var(--font-cozy)] text-3xl font-semibold leading-none sm:text-4xl">
              {n}
            </span>
            <span
              className={`mt-2.5 px-0.5 text-center font-[family-name:var(--font-cozy)] text-xl font-semibold leading-tight sm:text-2xl ${
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
