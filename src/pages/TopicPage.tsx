import { Link, useParams } from 'react-router-dom'
import { BrandTitle } from '../components/BrandTitle'
import { LogoWithBubble } from '../components/LogoWithBubble'
import { PageShell } from '../components/PageShell'

export const topicLabels: Record<string, { tr: string; de: string }> = {
  zahlen: { tr: 'Sayılar', de: 'Zahlen' },
  'w-fragen': { tr: 'W-Soruları', de: 'W-Fragen' },
}

const modes = [
  {
    id: 'anlatim',
    label: 'Konu anlatımı',
  },
  {
    id: 'egzersiz',
    label: 'Egzersiz',
  },
] as const

export function TopicPage() {
  const { topicId = '' } = useParams()
  const topic = topicLabels[topicId]
  const exerciseLocked = topicId === 'w-fragen'

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

      <div className="relative z-10 flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-8 overflow-visible py-4 animate-[rise_0.9s_0.08s_ease_both] sm:gap-10 sm:py-6">
        <div className="flex w-full items-center justify-center pt-28 sm:pt-32 md:pt-36">
          <LogoWithBubble message="Ne yapmak istiyorsun?" />
        </div>

        <div className="flex w-full max-w-sm flex-col gap-3 px-2">
          {modes.map((mode) => {
            if (mode.id === 'egzersiz' && exerciseLocked) {
              return (
                <div
                  key={mode.id}
                  aria-disabled="true"
                  className="flex items-center justify-between gap-3 rounded-2xl border-[3px] border-[#3d2418]/35 bg-[#fff8f0]/55 px-5 py-4 opacity-70"
                >
                  <span className="font-[family-name:var(--font-cozy)] text-lg font-semibold text-[#1a1210]/55 sm:text-xl">
                    {mode.label}
                  </span>
                  <span className="shrink-0 rounded-full bg-[#c0392b]/15 px-3 py-1 font-[family-name:var(--font-cozy)] text-sm font-semibold text-[#c0392b]">
                    Yakında
                  </span>
                </div>
              )
            }

            return (
              <Link
                key={mode.id}
                to={`/konular/${topicId}/${mode.id}`}
                className="rounded-2xl border-[3px] border-[#3d2418] bg-[#fff8f0] px-5 py-4 text-center font-[family-name:var(--font-cozy)] text-lg font-semibold text-[#1a1210] transition duration-300 hover:-translate-y-0.5 hover:bg-[#fff3e6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0392b] sm:text-xl"
              >
                {mode.label}
              </Link>
            )
          })}
        </div>

        <Link
          to="/konular"
          className="rounded-2xl border-[3px] border-[#3d2418]/60 bg-transparent px-6 py-3 font-semibold text-[#3d2418] transition hover:-translate-y-0.5 hover:bg-[#fff8f0]/50"
        >
          Konulara dön
        </Link>
      </div>
    </PageShell>
  )
}
