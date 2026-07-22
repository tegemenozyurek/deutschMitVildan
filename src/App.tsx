import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useBackgroundMusic } from './hooks/useBackgroundMusic'
import { useCozyButtonSounds } from './hooks/useCozyButtonSounds'
import { HomePage } from './pages/HomePage'
import { ModePage } from './pages/ModePage'
import { TopicPage } from './pages/TopicPage'
import { TopicsPage } from './pages/TopicsPage'
import { Zahlen1to12Page } from './pages/Zahlen1to12Page'
import { ZahlenAnlatimPage } from './pages/ZahlenAnlatimPage'
import { ZahlenSectionPage } from './pages/ZahlenSectionPage'

function AppRoutes() {
  useCozyButtonSounds()
  useBackgroundMusic()

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/konular" element={<TopicsPage />} />
      <Route path="/konular/:topicId" element={<TopicPage />} />
      <Route path="/konular/zahlen/anlatim" element={<ZahlenAnlatimPage />} />
      <Route path="/konular/zahlen/anlatim/1-12" element={<Zahlen1to12Page />} />
      <Route
        path="/konular/zahlen/anlatim/:sectionId"
        element={<ZahlenSectionPage />}
      />
      <Route path="/konular/:topicId/:modeId" element={<ModePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
