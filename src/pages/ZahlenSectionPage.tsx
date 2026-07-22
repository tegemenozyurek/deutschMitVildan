import { Link, useParams } from 'react-router-dom'
import { PageShell } from '../components/PageShell'

const titles: Record<string, { tr: string; de: string }> = {
  '1-12': { tr: '1–12 arası sayılar', de: 'Zahlen von 1 bis 12' },
  zehner: { tr: '10–20–30 … 100', de: 'Zehnerzahlen: 10, 20, 30 … 100' },
  'ara-2': { tr: 'Ara sayılar: 35, 67, 84', de: 'Gemischte Zahlen: 35, 67, 84' },
  'ara-3': {
    tr: 'Ara sayılar: 112, 475, 978',
    de: 'Dreistellige Zahlen: 112, 475, 978',
  },
  fiyat: {
    tr: 'Fiyat sorma',
    de: 'Nach dem Preis fragen',
  },
  'dijital-saat': {
    tr: 'Dijital saat',
    de: 'Digitale Uhr',
  },
}

export function ZahlenSectionPage() {
  const { sectionId = '' } = useParams()
  const section = titles[sectionId]

  if (!section) {
    return (
      <PageShell>
        <p className="relative z-10 mt-10 text-center">Bölüm bulunamadı.</p>
        <Link
          to="/konular/zahlen/anlatim"
          className="relative z-10 mt-4 text-[#c0392b] underline"
        >
          Geri dön
        </Link>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <h1 className="relative z-10 w-full max-w-lg px-2 pt-6 text-center font-[family-name:var(--font-cozy)] text-[clamp(1.6rem,6vw,2.75rem)] font-semibold leading-tight text-[#1a1210]">
        {section.tr}
      </h1>
      <p className="relative z-10 mt-2 text-center font-[family-name:var(--font-cozy)] text-lg text-[#c0392b]">
        {section.de}
      </p>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center">
        <p className="text-center text-[#3a5249]">İçerik yakında.</p>
        <Link
          to="/konular/zahlen/anlatim"
          className="mt-6 rounded-2xl border-[3px] border-[#3d2418] bg-[#fff8f0] px-6 py-3 font-semibold text-[#1a1210] transition hover:-translate-y-0.5"
        >
          Geri dön
        </Link>
      </div>
    </PageShell>
  )
}
