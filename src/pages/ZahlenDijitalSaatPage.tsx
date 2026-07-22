import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GermanWithUnd } from '../components/GermanWithUnd'
import { PageShell } from '../components/PageShell'
import { backgroundMusic } from '../lib/backgroundMusic'
import {
  formatDigitalTime,
  randomDigitalTime,
  speakableDigitalTime,
  type DigitalTime,
} from '../lib/germanTime'
import { prepareGermanSpeech, speakGerman } from '../lib/speakGerman'

const questions = [
  {
    de: 'Wie spät ist es?',
    tr: 'Saat kaç?',
  },
  {
    de: 'Wie viel Uhr ist es?',
    tr: 'Saat kaçtır?',
  },
  {
    de: 'Kannst du mir die Uhrzeit sagen?',
    tr: 'Bana saati söyleyebilir misin?',
  },
] as const

function answerFor(time: DigitalTime) {
  const display = formatDigitalTime(time.hours, time.minutes)
  const spokenTime = speakableDigitalTime(time.hours, time.minutes)
  const written = `Es ist ${spokenTime}.`
  return {
    digital: `Es ist ${display}.`,
    written,
    speak: written,
    tr: `Saat ${display}.`,
  }
}

export function ZahlenDijitalSaatPage() {
  const [time, setTime] = useState<DigitalTime>(randomDigitalTime)
  const [activeKey, setActiveKey] = useState<string | null>(null)
  const [diceSpin, setDiceSpin] = useState(false)

  useEffect(() => {
    prepareGermanSpeech()
  }, [])

  const speak = (key: string, text: string) => {
    setActiveKey(key)
    backgroundMusic.duck(Math.min(3200, 1000 + text.length * 40))
    speakGerman(text)
    window.setTimeout(() => {
      setActiveKey((current) => (current === key ? null : current))
    }, 650)
  }

  const reroll = () => {
    setDiceSpin(true)
    setTime(randomDigitalTime())
    window.setTimeout(() => setDiceSpin(false), 450)
  }

  const a = answerFor(time)
  const display = formatDigitalTime(time.hours, time.minutes)

  const cardClass = (key: string) =>
    `w-full rounded-2xl border-[3px] border-[#3d2418] px-4 py-3.5 text-left transition duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0392b] active:scale-[0.99] ${
      activeKey === key
        ? 'bg-[#3d2418] text-[#faf3ea]'
        : 'bg-[#fff8f0] text-[#1a1210] hover:bg-[#fff3e6]'
    }`

  return (
    <PageShell>
      <header className="relative z-10 w-full max-w-lg px-2 pt-5 text-center animate-[rise_0.9s_ease_both]">
        <h1 className="font-[family-name:var(--font-cozy)] text-[clamp(1.7rem,6.5vw,2.8rem)] font-semibold leading-tight text-[#1a1210]">
          Dijital saat
        </h1>
        <p className="mt-1 font-[family-name:var(--font-cozy)] text-base text-[#c0392b] sm:text-lg">
          Digitale Uhr
        </p>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col gap-5 px-1 py-6 animate-[rise_0.9s_0.08s_ease_both]">
        <section className="flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-cozy)] text-lg font-semibold text-[#3d2418]">
            Basit sorular
          </h2>
          {questions.map((item) => (
            <button
              key={item.de}
              type="button"
              className={cardClass(item.de)}
              onPointerDown={(event) => {
                if (event.button !== 0 && event.pointerType === 'mouse') return
                speak(item.de, item.de)
              }}
            >
              <p className="font-[family-name:var(--font-cozy)] text-lg font-semibold leading-snug sm:text-xl">
                {item.de}
              </p>
              <p
                className={`mt-1 text-sm ${
                  activeKey === item.de ? 'text-[#e6b422]' : 'text-[#c0392b]'
                }`}
              >
                {item.tr}
              </p>
            </button>
          ))}
        </section>

        <section className="flex flex-col gap-2">
          <h2 className="font-[family-name:var(--font-cozy)] text-lg font-semibold text-[#3d2418]">
            Pratik diyalog
          </h2>

          <div className="flex w-full items-center justify-center rounded-2xl border-[3px] border-[#3d2418] bg-[#3d2418] px-4 py-5 text-[#faf3ea]">
            <p className="font-[family-name:var(--font-cozy)] text-5xl font-semibold tracking-wide tabular-nums sm:text-6xl">
              {display}
            </p>
          </div>

          <button
            type="button"
            className={cardClass('q')}
            onPointerDown={(event) => {
              if (event.button !== 0 && event.pointerType === 'mouse') return
              speak('q', 'Wie spät ist es?')
            }}
          >
            <p className="text-xs font-semibold tracking-wide text-[#c0392b] uppercase">
              Soru
            </p>
            <p className="mt-1 font-[family-name:var(--font-cozy)] text-lg font-semibold leading-snug sm:text-xl">
              Wie spät ist es?
            </p>
            <p
              className={`mt-1 text-sm ${
                activeKey === 'q' ? 'text-[#e6b422]' : 'text-[#3a5249]'
              }`}
            >
              Saat kaç?
            </p>
          </button>

          <button
            type="button"
            className={cardClass('a')}
            onPointerDown={(event) => {
              if (event.button !== 0 && event.pointerType === 'mouse') return
              speak('a', a.speak)
            }}
          >
            <p className="text-xs font-semibold tracking-wide text-[#c0392b] uppercase">
              Cevap
            </p>
            <p className="mt-1 font-[family-name:var(--font-cozy)] text-lg font-semibold leading-snug sm:text-xl">
              {a.digital}
            </p>
            <p
              className={`mt-1 font-[family-name:var(--font-cozy)] text-base font-semibold leading-snug break-words sm:text-lg ${
                activeKey === 'a' ? 'text-[#e6b422]' : 'text-[#c0392b]'
              }`}
            >
              <GermanWithUnd
                text={a.written}
                undClassName={
                  activeKey === 'a' ? 'text-[#faf3ea]' : 'text-[#1b4d3e]'
                }
              />
            </p>
            <p
              className={`mt-1 text-sm ${
                activeKey === 'a' ? 'text-[#e6b422]' : 'text-[#3a5249]'
              }`}
            >
              {a.tr}
            </p>
          </button>

          <button
            type="button"
            onClick={reroll}
            className="flex min-h-[4.5rem] w-full items-center justify-center gap-3 rounded-2xl border-[3px] border-[#3d2418] bg-[#fff8f0] px-4 py-3 text-[#1a1210] transition hover:bg-[#fff3e6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0392b] active:scale-[0.99]"
            aria-label="Rastgele saat"
          >
            <svg
              viewBox="0 0 24 24"
              className={`h-9 w-9 shrink-0 text-[#3d2418] ${
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
            <span className="font-[family-name:var(--font-cozy)] text-xl font-semibold">
              Rastgele saat
            </span>
          </button>
        </section>
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
