import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GermanWithUnd } from './GermanWithUnd'
import { PageShell } from './PageShell'
import { backgroundMusic } from '../lib/backgroundMusic'
import type { WFragenWord } from '../lib/wFragenData'
import { prepareGermanSpeech, speakGerman } from '../lib/speakGerman'

type WFragenWordLessonProps = {
  titleTr: string
  titleDe: string
  words: readonly WFragenWord[]
  columns?: 1 | 2
}

export function WFragenWordLesson({
  titleTr,
  titleDe,
  words,
  columns = 2,
}: WFragenWordLessonProps) {
  const [active, setActive] = useState<string | null>(null)
  const [ttsOk, setTtsOk] = useState(true)

  useEffect(() => {
    prepareGermanSpeech()
    setTtsOk(typeof window !== 'undefined' && 'speechSynthesis' in window)
  }, [])

  const onPress = (word: WFragenWord) => {
    const spoken = word.speak ?? word.de
    setActive(word.id)
    backgroundMusic.duck(Math.min(2800, 900 + spoken.length * 45))
    const ok = speakGerman(spoken)
    if (!ok) setTtsOk(false)
    window.setTimeout(() => {
      setActive((current) => (current === word.id ? null : current))
    }, 700)
  }

  const gridCols = columns === 1 ? 'grid-cols-1' : 'grid-cols-2'
  const stacked = columns === 1

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
          stacked
            ? 'mx-auto w-[min(100%,20.5rem)] sm:w-[min(100%,22rem)]'
            : 'w-full max-w-md'
        }`}
      >
        {words.map((word) => (
          <button
            key={word.id}
            type="button"
            onPointerDown={(event) => {
              if (event.button !== 0 && event.pointerType === 'mouse') return
              onPress(word)
            }}
            className={`overflow-hidden rounded-2xl border-[3px] border-[#3d2418] transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0392b] active:scale-[0.97] ${
              stacked
                ? 'flex min-h-[6.25rem] w-full flex-row items-center justify-between gap-4 px-4 py-4 sm:min-h-[6.75rem]'
                : 'flex min-h-[6.25rem] flex-col items-center justify-center px-2 py-4 sm:min-h-[6.75rem]'
            } ${
              active === word.id
                ? 'bg-[#3d2418] text-[#faf3ea]'
                : 'bg-[#fff8f0] text-[#1a1210] hover:bg-[#fff3e6]'
            }`}
            aria-label={`${word.de}, ${word.tr}`}
          >
            <span
              className={`font-[family-name:var(--font-cozy)] font-semibold leading-none ${
                stacked ? 'text-3xl sm:text-4xl' : 'text-[clamp(1.7rem,7vw,2.4rem)]'
              }`}
            >
              <GermanWithUnd
                text={word.de}
                undClassName={
                  active === word.id ? 'text-[#faf3ea]' : 'text-[#1b4d3e]'
                }
              />
            </span>
            <span
              className={`font-[family-name:var(--font-cozy)] font-semibold ${
                stacked
                  ? 'max-w-[55%] text-right text-base leading-snug sm:text-lg'
                  : 'mt-2.5 px-0.5 text-center text-base leading-tight sm:text-lg'
              } ${active === word.id ? 'text-[#e6b422]' : 'text-[#c0392b]'}`}
            >
              {word.tr}
            </span>
          </button>
        ))}
      </div>

      <Link
        to="/konular/w-fragen/anlatim"
        className="relative z-10 mb-2 rounded-2xl border-[3px] border-[#3d2418] bg-[#fff8f0] px-6 py-3 font-semibold text-[#1a1210] transition hover:-translate-y-0.5"
      >
        Geri dön
      </Link>
    </PageShell>
  )
}
