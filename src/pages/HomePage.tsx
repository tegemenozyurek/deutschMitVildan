import { Link } from 'react-router-dom'
import { BrandTitle } from '../components/BrandTitle'
import { LogoWithBubble } from '../components/LogoWithBubble'
import { PageShell } from '../components/PageShell'

export function HomePage() {
  return (
    <PageShell>
      <BrandTitle className="animate-[rise_0.9s_ease_both]" />

      <div className="relative z-10 flex w-full max-w-xl flex-1 flex-col items-center justify-center gap-6 overflow-visible py-4 animate-[rise_0.9s_0.08s_ease_both] sm:gap-10 sm:py-6">
        <div className="flex w-full items-center justify-center pt-28 sm:pt-32 md:pt-36">
          <LogoWithBubble message="Hallo, ich bin Vildan. Ich lerne Deutsch." />
        </div>

        <Link
          to="/konular"
          className="inline-flex w-full max-w-[16rem] items-center justify-center rounded-2xl bg-[#3d2418] px-6 py-3.5 text-base font-semibold tracking-wide text-[#faf3ea] shadow-[0_10px_28px_rgba(61,36,24,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#2a1810] hover:shadow-[0_14px_32px_rgba(61,36,24,0.28)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c0392b] sm:max-w-none sm:w-auto sm:px-16 sm:py-5 sm:text-xl"
        >
          Giriş
        </Link>
      </div>
    </PageShell>
  )
}
