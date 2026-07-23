import type { ReactNode } from 'react'

type GermanWithWWordProps = {
  text: string
  wWord: string
  className?: string
  wClassName?: string
}

/** Highlights the W-question word once at the start of the sentence. */
export function GermanWithWWord({
  text,
  wWord,
  className = '',
  wClassName = 'text-[#1a7a9c]',
}: GermanWithWWordProps) {
  const trimmed = wWord.trim()
  if (!trimmed) {
    return <span className={className}>{text}</span>
  }

  const index = text.toLocaleLowerCase('de').indexOf(trimmed.toLocaleLowerCase('de'))
  if (index < 0) {
    return <span className={className}>{text}</span>
  }

  const before = text.slice(0, index)
  const match = text.slice(index, index + trimmed.length)
  const after = text.slice(index + trimmed.length)

  const nodes: ReactNode[] = []
  if (before) nodes.push(before)
  nodes.push(
    <span key="w" className={wClassName}>
      {match}
    </span>,
  )
  if (after) nodes.push(after)

  return <span className={className}>{nodes}</span>
}
