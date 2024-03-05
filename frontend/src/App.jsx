import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './style/tailwind.css'

import NotFoundPage from './pages/NotFoundPage'

function App() {

  return (
    <Routes>
      <Route index element={<p>Hello World</p>}/>
      <Route path='*' element={<NotFoundPage/>}/>
    </Routes>
  )
}

export default App
