import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useCozyButtonSounds } from './hooks/useCozyButtonSounds'
import { HomePage } from './pages/HomePage'
import { TopicPage } from './pages/TopicPage'
import { TopicsPage } from './pages/TopicsPage'

function AppRoutes() {
  useCozyButtonSounds()

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/konular" element={<TopicsPage />} />
      <Route path="/konular/:topicId" element={<TopicPage />} />
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
