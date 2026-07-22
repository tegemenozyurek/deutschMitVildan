import type { ReactNode } from 'react'

/** Highlights the compound connector „und“ (einundzwanzig …) without touching „hundert“. */
const COMPOUND_UND =
  /(ein|zwei|drei|vier|fünf|sechs|sieben|acht|neun)(und)(zwanzig|dreißig|vierzig|fünfzig|sechzig|siebzig|achtzig|neunzig)/gi

type GermanWithUndProps = {
  text: string
  className?: string
  undClassName?: string
}

export function GermanWithUnd({
  text,
  className = '',
  undClassName = 'text-[#1b4d3e]',
}: GermanWithUndProps) {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  const re = new RegExp(COMPOUND_UND)

  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    nodes.push(
      <span key={`${match.index}-pre`}>{match[1]}</span>,
      <span key={`${match.index}-und`} className={undClassName}>
        {match[2]}
      </span>,
      <span key={`${match.index}-post`}>{match[3]}</span>,
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }

  return <span className={className}>{nodes.length > 0 ? nodes : text}</span>
}
