import { Link } from 'react-router-dom'
import { PageShell } from '../components/PageShell'

const sections = [
  {
    id: '1-12',
    tr: '1–12 arası sayılar',
    de: 'Zahlen von 1 bis 12',
  },
  {
    id: '13-20',
    tr: '13–20 arası sayılar',
    de: 'Zahlen von 13 bis 20',
  },
  {
    id: 'zehner',
    tr: '10–20–30 … 100',
    de: 'Zehnerzahlen: 10, 20, 30 … 100',
  },
  {
    id: 'ara-2',
    tr: 'Ara sayılar: 35, 67, 84',
    de: 'Gemischte Zahlen: 35, 67, 84',
  },
  {
    id: 'ara-3',
    tr: 'Ara sayılar: 112, 475, 978',
    de: 'Dreistellige Zahlen: 112, 475, 978',
  },
  {
    id: 'fiyat',
    tr: 'Fiyat sorma',
    de: 'Nach dem Preis fragen',
  },
  {
    id: 'dijital-saat',
    tr: 'Dijital saat',
    de: 'Digitale Uhr',
  },
] as const

export function ZahlenAnlatimPage() {
  return (
    <PageShell>
      <h1 className="relative z-10 w-full pt-4 text-center font-[family-name:var(--font-cozy)] text-[clamp(2.4rem,10vw,4.5rem)] font-semibold tracking-tight text-[#1a1210] animate-[rise_0.9s_ease_both]">
        Seç
      </h1>

      <div className="relative z-10 flex w-full max-w-md flex-1 flex-col items-center justify-center gap-3 px-1 py-8 animate-[rise_0.9s_0.08s_ease_both] sm:gap-4">
        {sections.map((section) => (
          <Link
            key={section.id}
            to={`/konular/zahlen/anlatim/${section.id}`}
            className="flex w-full flex-col gap-1 rounded-2xl border-[3px] border-[#3d2418] bg-[#fff8f0] px-5 py-4 transition duration-300 hover:-translate-y-0.5 hover:bg-[#fff3e6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0392b]"
          >
            <span className="font-[family-name:var(--font-cozy)] text-lg font-semibold text-[#1a1210] sm:text-xl">
              {section.tr}
            </span>
            <span className="font-[family-name:var(--font-cozy)] text-sm font-medium text-[#c0392b] sm:text-base">
              {section.de}
            </span>
          </Link>
        ))}

        <Link
          to="/konular/zahlen"
          className="mt-4 rounded-2xl border-[3px] border-[#3d2418]/60 bg-transparent px-6 py-3 font-semibold text-[#3d2418] transition hover:-translate-y-0.5 hover:bg-[#fff8f0]/50"
        >
          Geri dön
        </Link>
      </div>
    </PageShell>
  )
}
