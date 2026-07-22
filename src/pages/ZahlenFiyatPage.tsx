import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GermanWithUnd } from '../components/GermanWithUnd'
import { PageShell } from '../components/PageShell'
import { backgroundMusic } from '../lib/backgroundMusic'
import { formatEuro, randomEuroPrice, speakableEuro } from '../lib/germanPrices'
import { prepareGermanSpeech, speakGerman } from '../lib/speakGerman'

const questions = [
  {
    de: 'Was kostet das?',
    tr: 'Bu ne kadar?',
  },
  {
    de: 'Wie viel kostet das?',
    tr: 'Bu kaça?',
  },
  {
    de: 'Was macht das?',
    tr: 'Ne tutuyor?',
  },
] as const

const products = [
  { de: 'das Brot', tr: 'ekmek' },
  { de: 'der Kaffee', tr: 'kahve' },
  { de: 'das Wasser', tr: 'su' },
  { de: 'die Pizza', tr: 'pizza' },
  { de: 'das Buch', tr: 'kitap' },
  { de: 'das Ticket', tr: 'bilet' },
  { de: 'der Apfel', tr: 'elma' },
  { de: 'das T-Shirt', tr: 'tişört' },
  { de: 'die Schokolade', tr: 'çikolata' },
  { de: 'der Tee', tr: 'çay' },
] as const

type Scene = {
  product: (typeof products)[number]
  euros: number
  cents: number
}

function randomScene(): Scene {
  const product = products[Math.floor(Math.random() * products.length)]!
  const price = randomEuroPrice()
  return { product, ...price }
}

function answerFor(scene: Scene) {
  const priceText = formatEuro(scene.euros, scene.cents)
  const spokenPrice = speakableEuro(scene.euros, scene.cents)
  const written = `Das kostet ${spokenPrice}.`
  return {
    digital: `Das kostet ${priceText}.`,
    written,
    speak: written,
    tr: `${priceText} tutuyor.`,
  }
}

function questionFor(scene: Scene) {
  return {
    de: `Was kostet ${scene.product.de}?`,
    tr: `${scene.product.tr[0]!.toUpperCase()}${scene.product.tr.slice(1)} ne kadar?`,
  }
}

export function ZahlenFiyatPage() {
  const [scene, setScene] = useState<Scene>(randomScene)
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
    setScene(randomScene())
    window.setTimeout(() => setDiceSpin(false), 450)
  }

  const q = questionFor(scene)
  const a = answerFor(scene)

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
          Fiyat sorma
        </h1>
        <p className="mt-1 font-[family-name:var(--font-cozy)] text-base text-[#c0392b] sm:text-lg">
          Nach dem Preis fragen
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

          <button
            type="button"
            className={cardClass('q')}
            onPointerDown={(event) => {
              if (event.button !== 0 && event.pointerType === 'mouse') return
              speak('q', q.de)
            }}
          >
            <p className="text-xs font-semibold tracking-wide text-[#c0392b] uppercase">
              Soru
            </p>
            <p className="mt-1 font-[family-name:var(--font-cozy)] text-lg font-semibold leading-snug sm:text-xl">
              {q.de}
            </p>
            <p
              className={`mt-1 text-sm ${
                activeKey === 'q' ? 'text-[#e6b422]' : 'text-[#3a5249]'
              }`}
            >
              {q.tr}
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
            aria-label="Rastgele fiyat"
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
              Rastgele fiyat
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
