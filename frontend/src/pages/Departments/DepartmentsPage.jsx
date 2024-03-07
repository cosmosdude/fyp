import PlusIcon from "../../assets/Icons/plus-white.svg"

import FilledButton from "../../components/Buttons/FilledButton";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import DepartmentCard from "./Cards/DepartmentCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import departmentService from "../../services/department";
import { useAuthContext } from "../../hooks/AuthStateContext";

export default function DepartmentsPage() {
    let navigate = useNavigate()

    let auth = useAuthContext()
    let [departments, setDepartments] = useState([])

    useEffect(() => {
        let aborter = new AbortController()
        async function fetchData() {
            try {
                let res = await departmentService.getAllDepartments({
                    accessToken: auth,
                    signal: aborter.signal
                })

                console.log("status", res.status)

                let json = await res.json()
                console.log("response", json)
                if (res.status === 200) setDepartments(json)
            } catch {}
        }
        fetchData()
        return () => aborter.abort()
    }, [])

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Departments" current/>
                </Breadcrumb>
                <div className="grow"/>
                <FilledButton src={PlusIcon} to='new'>New Department</FilledButton>
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Departments (3)</h1>
                <p className="text-neutral-900 text-bm font-bm">All departments are listed here.</p>
            </div>

            <div className="grid grid-cols-3 gap-[20px]">
                {departments.map((dep) => {
                    return <DepartmentCard 
                        key={dep.id}
                        title={dep.name}
                        onClick={() => navigate(`/departments/${dep.id}`)}
                    />    
                })}
            </div>
        </div>
    )
}