import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './style/tailwind.css'

import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <Routes>
      <Route index element={<LoginPage/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  )
}

export default App
