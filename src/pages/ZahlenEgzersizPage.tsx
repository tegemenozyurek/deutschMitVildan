import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BrandTitle } from '../components/BrandTitle'
import { GermanWithUnd } from '../components/GermanWithUnd'
import { LogoWithBubble } from '../components/LogoWithBubble'
import { PageShell } from '../components/PageShell'
import { burstConfetti } from '../lib/confettiBurst'
import { playFartSound } from '../lib/fartSound'
import { generateZahlenQuiz, type QuizQuestion } from '../lib/zahlenQuiz'

type Phase = 'ready' | 'countdown' | 'quiz' | 'done'

export function ZahlenEgzersizPage() {
  const [phase, setPhase] = useState<Phase>('ready')
  const [countdown, setCountdown] = useState(3)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [locked, setLocked] = useState(false)
  const [pickedId, setPickedId] = useState<string | null>(null)

  const current = questions[index]

  useEffect(() => {
    if (phase !== 'countdown') return
    setCountdown(3)
    let value = 3
    const id = window.setInterval(() => {
      value -= 1
      if (value <= 0) {
        window.clearInterval(id)
        setQuestions(generateZahlenQuiz(10))
        setIndex(0)
        setScore(0)
        setPickedId(null)
        setLocked(false)
        setPhase('quiz')
        return
      }
      setCountdown(value)
    }, 900)
    return () => window.clearInterval(id)
  }, [phase])

  const progressLabel = useMemo(() => {
    if (!questions.length) return ''
    return `${index + 1} / ${questions.length}`
  }, [index, questions.length])

  const start = () => setPhase('countdown')

  const onPick = (optionId: string) => {
    if (!current || locked) return
    setLocked(true)
    setPickedId(optionId)
    const correct = optionId === current.correctId
    if (correct) {
      setScore((s) => s + 1)
      burstConfetti()
    } else {
      void playFartSound()
    }

    window.setTimeout(() => {
      if (index + 1 >= questions.length) {
        setPhase('done')
        return
      }
      setIndex((i) => i + 1)
      setPickedId(null)
      setLocked(false)
    }, 1100)
  }

  const restart = () => {
    setPhase('ready')
    setQuestions([])
    setIndex(0)
    setScore(0)
    setPickedId(null)
    setLocked(false)
  }

  if (phase === 'ready') {
    return (
      <PageShell>
        <BrandTitle className="animate-[rise_0.9s_ease_both]" />
        <div className="relative z-10 flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-8 overflow-visible py-4 animate-[rise_0.9s_0.08s_ease_both]">
          <div className="flex w-full items-center justify-center pt-28 sm:pt-32 md:pt-36">
            <LogoWithBubble message="Sayılar egzersizine Hazırsan başlayalım!" />
          </div>
          <div className="flex w-full max-w-sm flex-col gap-3 px-2">
            <button
              type="button"
              onClick={start}
              className="rounded-2xl border-[3px] border-[#3d2418] bg-[#3d2418] px-5 py-4 text-center font-[family-name:var(--font-cozy)] text-lg font-semibold text-[#faf3ea] transition hover:-translate-y-0.5 sm:text-xl"
            >
              Evet
            </button>
            <Link
              to="/konular/zahlen"
              className="rounded-2xl border-[3px] border-[#3d2418]/60 bg-transparent px-5 py-4 text-center font-semibold text-[#3d2418] transition hover:-translate-y-0.5 hover:bg-[#fff8f0]/50"
            >
              Geri dön
            </Link>
          </div>
        </div>
      </PageShell>
    )
  }

  if (phase === 'countdown') {
    return (
      <PageShell>
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
          <p className="font-[family-name:var(--font-cozy)] text-[clamp(5rem,28vw,9rem)] font-semibold leading-none text-[#3d2418] animate-[rise_0.35s_ease_both]">
            {countdown}
          </p>
        </div>
      </PageShell>
    )
  }

  if (phase === 'done') {
    return (
      <PageShell>
        <BrandTitle />
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center gap-6 px-4">
          <h1 className="text-center font-[family-name:var(--font-cozy)] text-3xl font-semibold text-[#1a1210] sm:text-4xl">
            Bitti!
          </h1>
          <p className="font-[family-name:var(--font-cozy)] text-2xl text-[#c0392b]">
            {score} / {questions.length} doğru
          </p>
          <div className="flex w-full max-w-sm flex-col gap-3">
            <button
              type="button"
              onClick={restart}
              className="rounded-2xl border-[3px] border-[#3d2418] bg-[#3d2418] px-5 py-4 font-semibold text-[#faf3ea]"
            >
              Tekrar dene
            </button>
            <Link
              to="/konular/zahlen"
              className="rounded-2xl border-[3px] border-[#3d2418] bg-[#fff8f0] px-5 py-4 text-center font-semibold text-[#1a1210]"
            >
              Geri dön
            </Link>
          </div>
        </div>
      </PageShell>
    )
  }

  if (!current) return null

  return (
    <PageShell>
      <header className="relative z-10 w-full max-w-lg px-2 pt-5 text-center">
        <p className="font-[family-name:var(--font-cozy)] text-sm font-semibold tracking-wide text-[#3a5249]">
          Soru {progressLabel}
        </p>
        <p className="mt-1 text-sm text-[#c0392b]">{current.promptHint}</p>
        <h1 className="mt-4 break-words font-[family-name:var(--font-cozy)] text-[clamp(2rem,9vw,3.5rem)] font-semibold leading-tight text-[#1a1210]">
          <GermanWithUnd
            text={current.prompt}
            undClassName="text-[#1b4d3e]"
          />
        </h1>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-3 px-1 py-8">
        {current.options.map((option) => {
          const isPicked = pickedId === option.id
          const isCorrect = option.id === current.correctId
          let style =
            'bg-[#fff8f0] text-[#1a1210] border-[#3d2418] hover:bg-[#fff3e6]'
          if (locked && isCorrect) {
            style = 'bg-[#1b4d3e] text-[#faf3ea] border-[#1b4d3e]'
          } else if (locked && isPicked && !isCorrect) {
            style = 'bg-[#c0392b] text-[#faf3ea] border-[#c0392b]'
          }

          return (
            <button
              key={option.id}
              type="button"
              disabled={locked}
              onPointerDown={(event) => {
                if (event.button !== 0 && event.pointerType === 'mouse') return
                onPick(option.id)
              }}
              className={`w-full rounded-2xl border-[3px] px-4 py-4 text-left font-[family-name:var(--font-cozy)] text-lg font-semibold transition active:scale-[0.99] disabled:cursor-default sm:text-xl ${style}`}
            >
              <GermanWithUnd
                text={option.label}
                undClassName={
                  locked && (isCorrect || (isPicked && !isCorrect))
                    ? 'text-[#e6b422]'
                    : 'text-[#1b4d3e]'
                }
              />
            </button>
          )
        })}
      </div>
    </PageShell>
  )
}
