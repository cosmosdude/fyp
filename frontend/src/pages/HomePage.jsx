import { Link, Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuthStateContext } from "../hooks/AuthStateContext";


import DashboardIcon from '../assets/Icons/sidenav/dashboard-unselected.svg'
import DashboardSelectedIcon from '../assets/Icons/sidenav/dashboard.svg'

import EmployeeIcon from '../assets/Icons/sidenav/employees-unselected.svg'
import EmployeeSelectedIcon from '../assets/Icons/sidenav/employees.svg'

import DepartmentIcon from '../assets/Icons/sidenav/departments-unselected.svg'
import DepartmentSelectedIcon from '../assets/Icons/sidenav/departments.svg'

import DesignationsIcon from '../assets/Icons/sidenav/designations-unselected.svg'
import DesignationsSelectedIcon from '../assets/Icons/sidenav/designations.svg'

import LogoutIcon from '../assets/Icons/sidenav/logout.svg'
import SideNavItem from "../components/SideNavItem";
import Avatar from "../components/Avatar";
import useEffectUserDetail from "../hooks/useEffectUserDetail";
import { imageRoute } from "../configs/api.config";
import LucideIcon from "../lib/LucideIcon";
import NotiStackView from "../components/Noti/NotiStackView";
import NotiSystem from "../components/Noti/NotiSystem";
import {AlertActions, AlertBody, AlertButton, AlertDialog, AlertImage, AlertTitle } from "../components/AlertDialog/AlertDialog";
import { useState } from "react";
import assets from "../assets/Assets";


export default function HomePage() {
    let [auth, setAuth] = useAuthStateContext()

    if (!auth) return <Navigate to='/signin'/>

    function logout() {
        setAuth(null)
        console.log(auth)
    }

    let me = useEffectUserDetail()

    let fullname = [me?.first_name, me?.last_name].filter(x => !!x).join(' ')

    let [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative flex gap-[20px] p-[20px] w-screen h-screen">
            {/* Left Nav */}
            <div className="print:hidden flex flex-col gap-[10px] min-w-[300px] max-w-[300px] overflow-hidden">
                {/* Top Nav Items */}
                <div className="grow flex flex-col bg-background-0 border border-neutral-100 rounded-[6px] py-[20px] overflow-y-scroll">
                    <h1 className="text-center text-hl font-hl">HRMS</h1>

                    {/* Nav Item */}
                    <ul className="flex flex-col gap-[4px] p-[6px] px-[16px] overflow-scroll">
                        <SideNavItem to='/' title='Dashboard' icon='layout-grid'/>
                        <SideNavItem to='/employees' title='Employees' icon='users'/>
                        <SideNavItem to='/departments' title='Departments' icon='building-2'/>
                        <SideNavItem to='/designations' title='Designations' icon='briefcase'/>

                        <SideNavItem to='/schedules' title='Schedules' icon='clipboard-list'/>
                        <SideNavItem to='/attendances' title='Attendances' icon='calendar-clock'/>
                        <SideNavItem to='/overtimes' title='Overtimes' icon='timer-reset'/>
                        <SideNavItem to='/holidays' title='Holidays' icon='calendar-days'/>
                        <SideNavItem to='/leaves' title='Leaves' icon='calendar-range'/>

                        <SideNavItem to='/payrolls' title='Payroll' icon='dollar-sign'/>
                        <SideNavItem to='/payslips' title='Payslips' icon='badge-dollar-sign'/>
                        <div className="rounded bg-background-1 p-[10px] text-ls font-ls mx-auto text-neutral-500 flex flex-col w-full">
                            <p>v1.0.0 (alpha)</p>
                            <a 
                                className="text-left text-ls font-lm text-neutral-500 underline hover:opacity-75 transition-all"
                                href="/acknowledgements"
                            >Acknowledgement</a>
                            <p>Thwin Htoo Aung (001353943)</p>
                            <p>© University of Greenwich</p>
                        </div>
                        
                    </ul>
                </div>

                {/* Bottom profile card */}
                <div className="flex items-center px-[16px] py-[12px] gap-[10px] bg-background-0 border border-neutral-100 rounded-[6px]  min-h-[60px] max-h-[76px] overflow-hidden">
                    {/* Avatar ring */}
                    {/* <div className="min-w-[40px] w-[40px] h-[40px] border-[2px] border-primary rounded-full p-[2px]"> */}
                        {/* Avatar */}
                        {/* <div className="bg-neutral-200 w-full h-full rounded-full"></div> */}
                    {/* </div> */}
                    <Link 
                        className="flex gap-[10px] grow hover:opacity-50 transition-all cursor-pointer items-center"
                        to={me?.id ? `/employees/${me?.id}`: ''}
                    >
                        <Avatar
                            src={imageRoute(me?.avatar_path)}
                            title={fullname}
                        />
                        {/* Labels */}
                        <div className="flex flex-col">
                            <p className="text-wrap text-bs font-bs">{fullname}</p>
                            <p className="text-wrap text-ll font-ll">{me?.work_email ?? ""}</p>
                        </div>
                    </Link>
                    
                    {/* Logout Button */}
                    <button className="hover:opacity-25 transition-all" onClick={() => setIsOpen(true)}>
                        <img 
                            src={LogoutIcon}
                            className="min-w-[24px] w-[24px] h-[24px] rounded" 
                        />
                    </button>
                </div>
            </div>

            {/* Right Content */}
            <div className="flex grow overflow-hidden overflow-y-scroll">
                <Outlet/>
            </div>

            <AlertDialog isOpen={isOpen}>
                <AlertImage src={assets.loginOutSVG}/>
                <AlertTitle>Logout</AlertTitle>
                <AlertBody>Are you sure you wish to logout?</AlertBody>
                <AlertActions>
                    <AlertButton onClick={() => setIsOpen(false)}>
                        Dismiss
                    </AlertButton>
                    <AlertButton style="danger" onClick={logout}>
                        Confirm
                    </AlertButton>
                </AlertActions>
            </AlertDialog>

            {/* <NotiStackView/> */}
        </div>
    )
}

/*

*/