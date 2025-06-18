import { BrowserRouter, Routes, Route } from "react-router-dom"
import BoardView from './pages/BoardView'
import BoardDetail from './pages/BoardDetail'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<BoardView />} />
        <Route path="/board/:id" element={<BoardDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
