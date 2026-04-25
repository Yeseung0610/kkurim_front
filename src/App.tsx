import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import EditPage from './pages/EditPage'
import DetailPage from './pages/DetailPage'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-bg-primary">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/edit/new" element={<EditPage />} />
          <Route path="/edit/:id" element={<EditPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
