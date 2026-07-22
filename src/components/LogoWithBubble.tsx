import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'

type LogoWithBubbleProps = {
  message?: string
  className?: string
  size?: 'md' | 'lg'
  /** Ms per character */
  typingSpeed?: number
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return reduced
}

export function LogoWithBubble({
  message = 'Hallo, ich bin Vildan. Ich lerne Deutsch.',
  className = '',
  size = 'lg',
  typingSpeed = 120,
}: LogoWithBubbleProps) {
  const reducedMotion = usePrefersReducedMotion()
  const [shown, setShown] = useState(reducedMotion ? message : '')
  const done = shown.length >= message.length

  useEffect(() => {
    if (reducedMotion) {
      setShown(message)
      return
    }

    setShown('')
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setShown(message.slice(0, i))
      if (i >= message.length) window.clearInterval(id)
    }, typingSpeed)

    return () => window.clearInterval(id)
  }, [message, typingSpeed, reducedMotion])

  const frame =
    size === 'md'
      ? 'w-[min(100%,14rem)] sm:w-[16rem]'
      : 'w-[min(100%,16rem)] sm:w-[18rem] md:w-[20rem]'

  return (
    <div className={`relative mx-auto ${frame} ${className}`}>
      <img
        src={logo}
        alt=""
        className="relative z-10 block h-auto w-full select-none drop-shadow-[0_12px_24px_rgba(74,42,24,0.12)]"
      />

      {/* Anchored just above the head; grows upward, never covers the face */}
      <div
        className="absolute bottom-[92%] left-1/2 z-20 w-[min(17rem,88vw)] -translate-x-1/2"
        role="note"
        aria-live="polite"
      >
        <div className="relative rounded-[1.25rem] border-[3.5px] border-[#3d2418] bg-[#fff8f0] px-3.5 py-3 shadow-[0_10px_24px_rgba(61,36,24,0.12)] sm:rounded-[1.5rem] sm:border-4 sm:px-5 sm:py-4">
          <p className="font-[family-name:var(--font-cozy)] text-[clamp(0.9rem,3.4vw,1.2rem)] leading-snug font-semibold text-[#1a1210]">
            {shown}
            {!done && (
              <span
                aria-hidden="true"
                className="ml-0.5 inline-block h-[0.9em] w-[0.1em] translate-y-[0.06em] animate-[blink_0.9s_step-end_infinite] bg-[#3d2418]"
              />
            )}
          </p>
          <span
            aria-hidden="true"
            className="absolute top-full left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-r-[3.5px] border-b-[3.5px] border-[#3d2418] bg-[#fff8f0] sm:h-3.5 sm:w-3.5 sm:border-r-4 sm:border-b-4"
          />
        </div>
      </div>
    </div>
  )
}
