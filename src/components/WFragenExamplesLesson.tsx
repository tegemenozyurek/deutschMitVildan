import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GermanWithUnd } from './GermanWithUnd'
import { GermanWithWWord } from './GermanWithWWord'
import { PageShell } from './PageShell'
import { backgroundMusic } from '../lib/backgroundMusic'
import type { WFragenExample, WFragenExampleGroup } from '../lib/wFragenData'
import { prepareGermanSpeech, speakGerman } from '../lib/speakGerman'

type WFragenExamplesLessonProps = {
  titleTr: string
  titleDe: string
  groups: readonly WFragenExampleGroup[]
}

export function WFragenExamplesLesson({
  titleTr,
  titleDe,
  groups,
}: WFragenExamplesLessonProps) {
  const [active, setActive] = useState<string | null>(null)
  const [ttsOk, setTtsOk] = useState(true)

  useEffect(() => {
    prepareGermanSpeech()
    setTtsOk(typeof window !== 'undefined' && 'speechSynthesis' in window)
  }, [])

  const onPress = (example: WFragenExample) => {
    setActive(example.id)
    const spoken = `${example.de} ${example.answerDe}`
    backgroundMusic.duck(Math.min(4200, 1200 + spoken.length * 35))
    const ok = speakGerman(spoken)
    if (!ok) setTtsOk(false)
    window.setTimeout(() => {
      setActive((current) => (current === example.id ? null : current))
    }, 900)
  }

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

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-8 px-1 py-6 animate-[rise_0.9s_0.08s_ease_both]">
        {groups.map((group) => (
          <section key={group.headingTr} className="flex flex-col gap-3">
            <h2 className="px-1 font-[family-name:var(--font-cozy)] text-xl font-semibold text-[#1a1210] sm:text-2xl">
              {group.headingTr}
            </h2>

            <div className="flex flex-col gap-3">
              {group.examples.map((example) => {
                const isActive = active === example.id
                return (
                  <button
                    key={example.id}
                    type="button"
                    onPointerDown={(event) => {
                      if (event.button !== 0 && event.pointerType === 'mouse')
                        return
                      onPress(example)
                    }}
                    className={`w-full rounded-2xl border-[3px] border-[#3d2418] px-4 py-4 text-left transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0392b] active:scale-[0.99] ${
                      isActive
                        ? 'bg-[#3d2418] text-[#faf3ea]'
                        : 'bg-[#fff8f0] text-[#1a1210] hover:bg-[#fff3e6]'
                    }`}
                    aria-label={`${example.de} ${example.answerDe}`}
                  >
                    <div>
                      <p
                        className={`text-xs font-semibold tracking-wide uppercase ${
                          isActive ? 'text-[#7ec8e3]' : 'text-[#1a7a9c]'
                        }`}
                      >
                        Soru
                      </p>
                      <p className="mt-1 font-[family-name:var(--font-cozy)] text-lg font-semibold leading-snug sm:text-xl">
                        <GermanWithWWord
                          text={example.de}
                          wWord={example.wWord}
                          wClassName={
                            isActive ? 'text-[#7ec8e3]' : 'text-[#1a7a9c]'
                          }
                        />
                      </p>
                      <p
                        className={`mt-1 font-[family-name:var(--font-cozy)] text-sm font-medium sm:text-base ${
                          isActive ? 'text-[#e6b422]' : 'text-[#c0392b]'
                        }`}
                      >
                        {example.tr}
                      </p>
                    </div>

                    <div
                      className={`my-3 h-px w-full ${
                        isActive ? 'bg-[#faf3ea]/25' : 'bg-[#3d2418]/15'
                      }`}
                    />

                    <div>
                      <p
                        className={`text-xs font-semibold tracking-wide uppercase ${
                          isActive ? 'text-[#e6b422]' : 'text-[#c0392b]'
                        }`}
                      >
                        Cevap
                      </p>
                      <p className="mt-1 font-[family-name:var(--font-cozy)] text-lg font-semibold leading-snug sm:text-xl">
                        <GermanWithUnd
                          text={example.answerDe}
                          undClassName={
                            isActive ? 'text-[#e6b422]' : 'text-[#1b4d3e]'
                          }
                        />
                      </p>
                      <p
                        className={`mt-1 font-[family-name:var(--font-cozy)] text-sm font-medium sm:text-base ${
                          isActive ? 'text-[#e6b422]' : 'text-[#3a5249]'
                        }`}
                      >
                        {example.answerTr}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
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
