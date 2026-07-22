import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GermanWithUnd } from './GermanWithUnd'
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
  columns?: 1 | 2 | 3 | 4
  /** Renders a dice card after the numbers (same size). */
  onReroll?: () => void
  /** Stacked cards with long German labels (wrap below the number). */
  longLabels?: boolean
}

export function ZahlenNumberLesson({
  titleTr,
  titleDe,
  numbers,
  columns = 3,
  onReroll,
  longLabels = false,
}: ZahlenNumberLessonProps) {
  const [active, setActive] = useState<number | null>(null)
  const [ttsOk, setTtsOk] = useState(true)
  const [diceSpin, setDiceSpin] = useState(false)

  useEffect(() => {
    prepareGermanSpeech()
    setTtsOk(typeof window !== 'undefined' && 'speechSynthesis' in window)
  }, [])

  const onPress = (n: number, de: string) => {
    setActive(n)
    backgroundMusic.duck(Math.min(2800, 900 + de.length * 45))
    const ok = speakGerman(de)
    if (!ok) setTtsOk(false)
    window.setTimeout(() => {
      setActive((current) => (current === n ? null : current))
    }, 700)
  }

  const handleReroll = () => {
    if (!onReroll) return
    setDiceSpin(true)
    setActive(null)
    onReroll()
    window.setTimeout(() => setDiceSpin(false), 450)
  }

  const stacked = columns === 1

  const gridCols =
    columns === 1
      ? 'grid-cols-1'
      : columns === 2
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
        className={`relative z-10 grid flex-1 content-center gap-3 px-1 py-8 animate-[rise_0.9s_0.08s_ease_both] sm:gap-4 ${gridCols} ${
          longLabels
            ? 'mx-auto w-[min(100%,22rem)] sm:w-[min(100%,24rem)]'
            : stacked
              ? 'mx-auto w-[min(100%,20.5rem)] sm:w-[min(100%,22rem)]'
              : 'w-full max-w-md'
        }`}
      >
        {numbers.map(({ n, de }) => (
          <button
            key={`${n}-${de}`}
            type="button"
            onPointerDown={(event) => {
              if (event.button !== 0 && event.pointerType === 'mouse') return
              onPress(n, de)
            }}
            className={`overflow-hidden rounded-2xl border-[3px] border-[#3d2418] transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0392b] active:scale-[0.97] ${
              longLabels
                ? 'flex w-full min-h-[6.5rem] flex-col items-stretch justify-center gap-2 px-4 py-3.5'
                : stacked
                  ? 'flex min-h-[6.25rem] w-full flex-row items-center justify-between gap-4 px-4 py-4 sm:min-h-[6.75rem]'
                  : 'flex min-h-[6.25rem] flex-col items-center justify-center px-2 py-4 sm:min-h-[6.75rem]'
            } ${
              active === n
                ? 'bg-[#3d2418] text-[#faf3ea]'
                : 'bg-[#fff8f0] text-[#1a1210] hover:bg-[#fff3e6]'
            }`}
            aria-label={`${n}, ${de}`}
          >
            <span
              className={`font-[family-name:var(--font-cozy)] font-semibold leading-none ${
                longLabels
                  ? 'text-3xl sm:text-4xl'
                  : stacked
                    ? 'text-4xl sm:text-5xl'
                    : 'text-3xl sm:text-4xl'
              }`}
            >
              {n}
            </span>
            <span
              className={`font-[family-name:var(--font-cozy)] font-semibold ${
                longLabels
                  ? 'w-full break-words text-center text-[clamp(1.2rem,5vw,1.55rem)] leading-tight hyphens-auto'
                  : stacked
                    ? 'text-right text-2xl leading-tight sm:text-3xl'
                    : 'mt-2.5 px-0.5 text-center text-xl leading-tight sm:text-2xl'
              } ${active === n ? 'text-[#e6b422]' : 'text-[#c0392b]'}`}
            >
              <GermanWithUnd
                text={de}
                undClassName={
                  active === n ? 'text-[#faf3ea]' : 'text-[#1b4d3e]'
                }
              />
            </span>
          </button>
        ))}

        {onReroll && (
          <button
            type="button"
            onClick={handleReroll}
            className={`flex items-center justify-center gap-3 overflow-hidden rounded-2xl border-[3px] border-[#3d2418] bg-[#fff8f0] px-4 py-4 text-[#1a1210] transition duration-200 hover:bg-[#fff3e6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0392b] active:scale-[0.97] sm:gap-4 ${
              longLabels
                ? 'min-h-[6.5rem] w-full flex-row'
                : stacked
                  ? 'min-h-[6.25rem] w-full flex-row sm:min-h-[6.75rem]'
                  : 'min-h-[6.25rem] flex-col sm:min-h-[6.75rem]'
            }`}
            aria-label="Rastgele sayı"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-10 w-10 shrink-0 text-[#3d2418] sm:h-11 sm:w-11 ${
                diceSpin ? 'animate-[spin_0.45s_ease]' : ''
              }`}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="3.5"
                stroke="currentColor"
                strokeWidth="2.2"
              />
              <circle cx="8.2" cy="8.2" r="1.35" fill="currentColor" />
              <circle cx="15.8" cy="8.2" r="1.35" fill="currentColor" />
              <circle cx="12" cy="12" r="1.35" fill="currentColor" />
              <circle cx="8.2" cy="15.8" r="1.35" fill="currentColor" />
              <circle cx="15.8" cy="15.8" r="1.35" fill="currentColor" />
            </svg>
            <span className="font-[family-name:var(--font-cozy)] text-xl font-semibold leading-tight sm:text-2xl">
              Rastgele sayı
            </span>
          </button>
        )}
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
