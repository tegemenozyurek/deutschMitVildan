import { Link, useParams } from 'react-router-dom'
import { BrandTitle } from '../components/BrandTitle'
import { LogoWithBubble } from '../components/LogoWithBubble'
import { PageShell } from '../components/PageShell'

const topicLabels: Record<string, { tr: string; de: string }> = {
  zahlen: { tr: 'Sayılar', de: 'Zahlen' },
  'w-fragen': { tr: 'W-Soruları', de: 'W-Fragen' },
}

export function TopicPage() {
  const { topicId = '' } = useParams()
  const topic = topicLabels[topicId]

  if (!topic) {
    return (
      <PageShell>
        <BrandTitle />
        <p className="relative z-10 mt-10 text-center">Konu bulunamadı.</p>
        <Link to="/konular" className="relative z-10 mt-4 text-[#c0392b] underline">
          Konulara dön
        </Link>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <BrandTitle className="animate-[rise_0.9s_ease_both]" />

      <div className="relative z-10 flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-8 overflow-visible py-4 animate-[rise_0.9s_0.08s_ease_both]">
        <div className="flex w-full items-center justify-center pt-28 sm:pt-32 md:pt-36">
          <LogoWithBubble
            message={`Süper! ${topic.tr} (${topic.de}) konusuna başlıyoruz.`}
          />
        </div>

        <Link
          to="/konular"
          className="rounded-2xl border-[3px] border-[#3d2418] bg-[#fff8f0] px-6 py-3 font-semibold text-[#1a1210] transition hover:-translate-y-0.5"
        >
          Konulara dön
        </Link>
      </div>
    </PageShell>
  )
}
