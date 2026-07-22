export function BrandTitle({ className = '' }: { className?: string }) {
  return (
    <h1
      className={`relative z-10 w-full max-w-[18rem] text-center font-[family-name:var(--font-cozy)] text-[clamp(1.6rem,7.5vw,5rem)] font-semibold leading-[1.1] tracking-tight text-balance sm:max-w-3xl ${className}`}
    >
      <span className="text-[#1a1210]">Deutsch</span>{' '}
      <span className="text-[#c0392b]">mit</span>{' '}
      <span className="text-[#e6b422]">Vildan</span>
    </h1>
  )
}
