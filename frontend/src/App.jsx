import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

import './style/tailwind.css'

import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import AuthStateContext, { AuthContext, useAuthState } from './hooks/AuthStateContext'

import HomeNavigationPage from './pages/HomeNavigationPage'


function App() {

  // App auth value.
  let authState = useAuthState();

  console.log('authState:', authState)

  return (
    <AuthStateContext.Provider value={authState}>
      <AuthContext.Provider value={authState[0]}>
        <Routes>
        <Route path="signin" element={<LoginPage/>}/>

        <Route element={<HomeNavigationPage/>}>
            <Route path="/" element={<p>Dashboard</p>}/>
            <Route path="/employees" element={<p>Employees</p>}/>
            <Route path="/departments" element={<p>Departments</p>}/>
            <Route path="/designations" element={<p>Designations</p>}/>
        </Route>
          {/* <Route path='/' element={<IndexPage/>}>
            <Route path="" element={<HomeNavigationPage/>}>
              
            </Route>
          </Route> */}
          <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
      </AuthContext.Provider>
    </AuthStateContext.Provider>
  )
}

export default App
