import type { ReactNode } from 'react'

type PageShellProps = {
  children: ReactNode
  className?: string
}

export function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <main
      className={`relative flex min-h-dvh w-full flex-col items-center px-4 pb-8 pt-5 sm:px-6 sm:pb-12 sm:pt-10 ${className}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_28%_18%,#fff6eb_0%,transparent_55%),radial-gradient(ellipse_at_78%_72%,#f3e4d4_0%,transparent_50%),linear-gradient(165deg,#faf3ea_0%,#f0e2d4_48%,#e8d5c4_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(90,55,35,0.08)_0.7px,transparent_0.7px)] [background-size:4px_4px]"
      />
      {children}
    </main>
  )
}
