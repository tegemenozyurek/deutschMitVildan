import { Navigate, useParams } from 'react-router-dom'
import { WFragenExamplesLesson } from '../components/WFragenExamplesLesson'
import { WFragenWordLesson } from '../components/WFragenWordLesson'
import { getWFragenSection } from '../lib/wFragenData'

export function WFragenSectionPage() {
  const { sectionId = '' } = useParams()
  const section = getWFragenSection(sectionId)

  if (!section) {
    return <Navigate to="/konular/w-fragen/anlatim" replace />
  }

  if (section.kind === 'examples') {
    return (
      <WFragenExamplesLesson
        titleTr={section.tr}
        titleDe={section.de}
        groups={section.groups}
      />
    )
  }

  return (
    <WFragenWordLesson
      titleTr={section.tr}
      titleDe={section.de}
      words={section.words}
      columns={section.columns ?? 2}
    />
  )
}
