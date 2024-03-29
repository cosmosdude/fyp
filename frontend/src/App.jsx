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
import DepartmentDetailPage from './pages/Departments/DepartmentDetailPage'
import DesignationDetailPage from './pages/Designations/DesignationDetailPage'
import EmployeeNewPage from './pages/Employees/EmployeeNewPage'
import SchedulesPage from './pages/Schedules/SchedulesPage'
import AttendancesPage from './pages/Attendances/AttendancesPage'
import HolidaysPage from './pages/Holidays/HolidaysPage'
import LeavesPage from './pages/Leaves/LeavesPage'
import OvertimesPage from './pages/Overtimes/OvertimesPage'
import AttendanceRequestsPage from './pages/Attendances/AttendanceRequestsPage'
import LeaveRequestsPage from './pages/Leaves/LeaveRequestsPage'
import LeaveTypesPage from './pages/LeaveTypes/LeaveTypesPage'
import LeaveTypeDetailPage from './pages/LeaveTypes/LeaveTypeDetailPage'
import HolidayDetailPage from './pages/Holidays/HolidayDetailPage'
import ScheduleDetailPage from './pages/Schedules/ScheduleDetailPage'
import PayrollsPage from './pages/Payrolls/PayrollsPage'
import PayslipsPage from './pages/Payslips/PayslipsPage'
import UsersPayrollPage from './pages/Payrolls/UserPayrollPage'

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
            <Route path="/employees/new" element={<EmployeeNewPage/>}/>
            <Route path="/employees/:id" element={<EmployeeNewPage/>}/>
            <Route path="/employees/:id/update" element={<EmployeeNewPage/>}/>

            <Route path="/departments" element={<DepartmentsPage/>}/>
            {/* New and detail */}
            <Route path="/departments/:id" element={<DepartmentDetailPage/>}/>
            {/* Department Update */}
            <Route path="/departments/:id/update" element={<DepartmentDetailPage/>}/>

            <Route path="/designations" element={<DesignationsPage/>}/>
            {/* New and detail */}
            <Route path="/designations/:id" element={<DesignationDetailPage/>}/>
            {/* Department Update */}
            <Route path="/designations/:id/update" element={<DesignationDetailPage/>}/>

            {/* Schedules */}
            <Route path="/schedules" element={<SchedulesPage/>}/>
            <Route path="/schedules/:id" element={<ScheduleDetailPage/>}/>

            {/* Schedules */}
            <Route path="/attendances" element={<AttendancesPage/>}/>
            <Route path="/attendances/requests" element={<AttendanceRequestsPage/>}/>
            
            {/* Schedules */}
            <Route path="/overtimes" element={<OvertimesPage/>}/>

            {/* Holidays */}
            <Route path="/holidays" element={<HolidaysPage/>}/>
            <Route path="/holidays/:id" element={<HolidayDetailPage/>}/>

            {/* Leaves */}
            <Route path="/leaves" element={<LeavesPage/>}/>
            <Route path="/leaves/requests" element={<LeaveRequestsPage/>}/>
            <Route path="/leaves/types" element={<LeaveTypesPage/>}/>
            <Route path="/leaves/types/:id" element={<LeaveTypeDetailPage/>}/>

            <Route path="/payrolls" element={<PayrollsPage/>}/>
            <Route path="/payrolls/:userId" element={<UsersPayrollPage/>}/>
            

            <Route path="/payslips" element={<PayslipsPage/>}/>
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
