import { Routes, Route } from 'react-router-dom'
import SlideList from './pages/SlideList'
import SlideViewer from './pages/SlideViewer'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SlideList />} />
      <Route path="/view/:slug" element={<SlideViewer />} />
    </Routes>
  )
}
