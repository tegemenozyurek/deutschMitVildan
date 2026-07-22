import { Link } from 'react-router-dom'
import { BrandTitle } from '../components/BrandTitle'
import { LogoWithBubble } from '../components/LogoWithBubble'
import { PageShell } from '../components/PageShell'

const topics = [
  {
    id: 'zahlen',
    tr: 'Sayılar',
    de: 'Zahlen',
    to: '/konular/zahlen',
    locked: false,
  },
  {
    id: 'w-fragen',
    tr: 'W-Soruları',
    de: 'W-Fragen',
    to: '/konular/w-fragen',
    locked: true,
  },
] as const

export function TopicsPage() {
  return (
    <PageShell>
      <BrandTitle className="animate-[rise_0.9s_ease_both]" />

      <div className="relative z-10 flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-8 overflow-visible py-4 animate-[rise_0.9s_0.08s_ease_both] sm:gap-10 sm:py-6">
        <div className="flex w-full items-center justify-center pt-28 sm:pt-32 md:pt-36">
          <LogoWithBubble message="Hangi konuyu çalışmak istiyorsun?" />
        </div>

        <div className="flex w-full max-w-sm flex-col gap-3 px-2">
          {topics.map((topic) =>
            topic.locked ? (
              <div
                key={topic.id}
                aria-disabled="true"
                className="flex items-center justify-between gap-3 rounded-2xl border-[3px] border-[#3d2418]/35 bg-[#fff8f0]/55 px-5 py-4 opacity-70"
              >
                <div className="min-w-0">
                  <span className="block font-[family-name:var(--font-cozy)] text-lg font-semibold text-[#1a1210]/55 sm:text-xl">
                    {topic.tr}
                  </span>
                  <span className="block font-[family-name:var(--font-cozy)] text-sm font-medium text-[#3a5249] sm:text-base">
                    {topic.de}
                  </span>
                </div>
                <span className="shrink-0 rounded-full bg-[#c0392b]/15 px-3 py-1 font-[family-name:var(--font-cozy)] text-sm font-semibold text-[#c0392b]">
                  Yakında
                </span>
              </div>
            ) : (
              <Link
                key={topic.id}
                to={topic.to}
                className="flex items-center justify-between gap-3 rounded-2xl border-[3px] border-[#3d2418] bg-[#fff8f0] px-5 py-4 transition duration-300 hover:-translate-y-0.5 hover:bg-[#fff3e6] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0392b]"
              >
                <span className="font-[family-name:var(--font-cozy)] text-lg font-semibold text-[#1a1210] sm:text-xl">
                  {topic.tr}
                </span>
                <span className="font-[family-name:var(--font-cozy)] text-base font-medium text-[#c0392b] sm:text-lg">
                  {topic.de}
                </span>
              </Link>
            ),
          )}
        </div>
      </div>
    </PageShell>
  )
}
