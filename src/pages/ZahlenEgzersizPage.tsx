import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { BrandTitle } from '../components/BrandTitle'
import { GermanWithUnd } from '../components/GermanWithUnd'
import { LogoWithBubble } from '../components/LogoWithBubble'
import { PageShell } from '../components/PageShell'
import { burstConfetti } from '../lib/confettiBurst'
import { playFartSound } from '../lib/fartSound'
import {
  generateZahlenQuiz,
  QUESTION_COUNT,
  type QuizDifficulty,
  type QuizQuestion,
} from '../lib/zahlenQuiz'

type Phase = 'ready' | 'level' | 'countdown' | 'quiz' | 'done'

const LEVELS: {
  id: QuizDifficulty
  label: string
  detail: string
}[] = [
  { id: 'kolay', label: 'Kolay', detail: '0 – 20' },
  { id: 'orta', label: 'Orta', detail: '10 – 99' },
  { id: 'zor', label: 'Zor', detail: '20 – 999 · saat · fiyat' },
]

export function ZahlenEgzersizPage() {
  const [phase, setPhase] = useState<Phase>('ready')
  const [level, setLevel] = useState<QuizDifficulty | null>(null)
  const [countdown, setCountdown] = useState(3)
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [index, setIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [locked, setLocked] = useState(false)
  const [pickedId, setPickedId] = useState<string | null>(null)

  const current = questions[index]

  useEffect(() => {
    if (phase !== 'countdown' || !level) return
    setCountdown(3)
    let value = 3
    const id = window.setInterval(() => {
      value -= 1
      if (value <= 0) {
        window.clearInterval(id)
        setQuestions(generateZahlenQuiz(level, QUESTION_COUNT))
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
  }, [phase, level])

  const progressLabel = useMemo(() => {
    if (!questions.length) return ''
    return `${index + 1} / ${questions.length}`
  }, [index, questions.length])

  const goToLevel = () => setPhase('level')

  const pickLevel = (next: QuizDifficulty) => {
    setLevel(next)
    setPhase('countdown')
  }

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
    setLevel(null)
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
              onClick={goToLevel}
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

  if (phase === 'level') {
    return (
      <PageShell>
        <BrandTitle className="animate-[rise_0.9s_ease_both]" />
        <div className="relative z-10 flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6 px-2 py-6 animate-[rise_0.9s_0.08s_ease_both]">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-cozy)] text-3xl font-semibold text-[#1a1210] sm:text-4xl">
              Seviye seç
            </h1>
            <p className="mt-2 text-[#3a5249]">{QUESTION_COUNT} soru</p>
          </div>
          <div className="flex w-full flex-col gap-3">
            {LEVELS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => pickLevel(item.id)}
                className="rounded-2xl border-[3px] border-[#3d2418] bg-[#fff8f0] px-5 py-4 text-left transition hover:-translate-y-0.5 hover:bg-[#fff3e6]"
              >
                <span className="block font-[family-name:var(--font-cozy)] text-xl font-semibold text-[#1a1210]">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-sm text-[#3a5249]">
                  {item.detail}
                </span>
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPhase('ready')}
            className="w-full rounded-2xl border-[3px] border-[#3d2418]/60 bg-transparent px-5 py-3 text-center font-semibold text-[#3d2418] transition hover:bg-[#fff8f0]/50"
          >
            Geri
          </button>
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

  const progressPct =
    questions.length > 0 ? ((index + 1) / questions.length) * 100 : 0
  const optionLetters = ['A', 'B', 'C', 'D'] as const
  const promptLen = current.prompt.length
  const promptSize =
    promptLen <= 8
      ? 'text-[clamp(3.6rem,17vw,5.75rem)]'
      : promptLen <= 22
        ? 'text-[clamp(2.6rem,11.5vw,4.1rem)]'
        : 'text-[clamp(2.15rem,9vw,3.25rem)]'
  const longestOption = Math.max(
    ...current.options.map((o) => o.label.length),
  )
  const optionTextSize =
    longestOption <= 4
      ? 'text-[clamp(1.85rem,8vw,2.5rem)]'
      : longestOption <= 22
        ? 'text-[clamp(1.35rem,5.5vw,1.85rem)]'
        : 'text-[clamp(1.15rem,4.6vw,1.55rem)]'

  return (
    <PageShell className="!px-0 !pb-0 !pt-0 sm:!px-0 sm:!pb-0 sm:!pt-0">
      <div className="relative z-10 flex min-h-dvh w-full max-w-lg flex-col px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-[max(0.6rem,env(safe-area-inset-top))] sm:mx-auto sm:px-4">
        {/* Top bar: progress */}
        <div className="shrink-0 pt-1">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="font-[family-name:var(--font-cozy)] text-sm font-semibold text-[#3a5249]">
              {progressLabel}
            </p>
            <p className="font-[family-name:var(--font-cozy)] text-sm font-semibold text-[#c0392b]">
              {score} doğru
            </p>
          </div>
          <div
            className="h-2.5 overflow-hidden rounded-full bg-[#3d2418]/15"
            role="progressbar"
            aria-valuenow={index + 1}
            aria-valuemin={1}
            aria-valuemax={questions.length}
            aria-label="İlerleme"
          >
            <div
              className="h-full rounded-full bg-[#e6b422] transition-[width] duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Prompt */}
        <div
          key={current.id}
          className="flex min-h-0 flex-1 flex-col items-center justify-center px-0.5 py-3 text-center animate-[rise_0.4s_ease_both]"
        >
          <p className="mb-3 font-[family-name:var(--font-cozy)] text-lg font-semibold tracking-wide text-[#c0392b] sm:text-xl">
            {current.promptHint}
          </p>
          <h1
            className={`w-full break-words hyphens-auto font-[family-name:var(--font-cozy)] font-semibold leading-[1.1] tracking-tight text-[#1a1210] ${promptSize}`}
          >
            <GermanWithUnd
              text={current.prompt}
              undClassName="text-[#1b4d3e]"
            />
          </h1>
        </div>

        {/* Answers */}
        <div
          key={`opts-${current.id}`}
          className="flex shrink-0 flex-col gap-2.5 pb-1 animate-[rise_0.45s_0.05s_ease_both] sm:gap-3 sm:pb-3"
        >
          {current.options.map((option, optionIndex) => {
            const isPicked = pickedId === option.id
            const isCorrect = option.id === current.correctId
            let shell =
              'border-[#3d2418] bg-[#fff8f0] text-[#1a1210] active:bg-[#fff3e6]'
            let badge =
              'border-[#3d2418]/35 bg-[#f0e2d4] text-[#3d2418]'
            let undTone = 'text-[#1b4d3e]'

            if (locked && isCorrect) {
              shell = 'border-[#1b4d3e] bg-[#1b4d3e] text-[#faf3ea]'
              badge = 'border-[#faf3ea]/40 bg-[#143d31] text-[#e6b422]'
              undTone = 'text-[#e6b422]'
            } else if (locked && isPicked && !isCorrect) {
              shell = 'border-[#c0392b] bg-[#c0392b] text-[#faf3ea]'
              badge = 'border-[#faf3ea]/35 bg-[#9e2e24] text-[#faf3ea]'
              undTone = 'text-[#f5d76e]'
            } else if (locked && !isPicked && !isCorrect) {
              shell =
                'border-[#3d2418]/25 bg-[#fff8f0]/55 text-[#1a1210]/45'
              badge =
                'border-[#3d2418]/15 bg-[#f0e2d4]/60 text-[#3d2418]/45'
              undTone = 'text-[#1b4d3e]/40'
            }

            return (
              <button
                key={option.id}
                type="button"
                disabled={locked}
                onPointerDown={(event) => {
                  if (event.button !== 0 && event.pointerType === 'mouse')
                    return
                  onPick(option.id)
                }}
                className={`flex min-h-[4.25rem] w-full items-center gap-3 rounded-[1.15rem] border-[3px] px-3 py-2.5 text-left transition active:scale-[0.985] disabled:cursor-default sm:min-h-[4.75rem] sm:gap-4 sm:px-4 ${shell}`}
              >
                <span
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border-2 font-[family-name:var(--font-cozy)] text-lg font-semibold sm:h-12 sm:w-12 sm:text-xl ${badge}`}
                >
                  {optionLetters[optionIndex]}
                </span>
                <span
                  className={`min-w-0 flex-1 font-[family-name:var(--font-cozy)] font-semibold leading-snug break-words ${optionTextSize}`}
                >
                  <GermanWithUnd
                    text={option.label}
                    undClassName={undTone}
                  />
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </PageShell>
  )
}
