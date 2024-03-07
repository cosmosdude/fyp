import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'

import './style/tailwind.css'

import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import AuthStateContext, { AuthContext, useAuthState } from './hooks/AuthStateContext'

import HomePage from './pages/HomePage'
import DashboardPage from './pages/Dashboard/DashboardPage'
import EmployeesPage from './pages/Employees/EmployeesPage'
import DepartmentsPage from './pages/Departments/DepartmentsPage'
import DesignationsPage from './pages/Designations/DesignationsPage'


function App() {

  // App auth value.
  let authState = useAuthState();

  console.log('authState:', authState)

  return (
    <AuthStateContext.Provider value={authState}>
      <AuthContext.Provider value={authState[0]}>
        <Routes>
        <Route path="signin" element={<LoginPage/>}/>

        <Route element={<HomePage/>}>
            <Route path="/" element={<DashboardPage/>}/>
            <Route path="/employees" element={<EmployeesPage/>}/>
            <Route path="/departments" element={<DepartmentsPage/>}/>
            <Route path="/designations" element={<DesignationsPage/>}/>
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
