import PlusIcon from "../../assets/Icons/plus-white.svg"

import FilledButton from "../../components/Buttons/FilledButton";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import DepartmentCard from "./Cards/DepartmentCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import departmentService from "../../services/department";
import { useAuthContext } from "../../hooks/AuthStateContext";
import useEffectAllDepartments from "../../hooks/useEffectAllDepartments";
import SearchBox from "../../components/SearchBox";

export default function DepartmentsPage() {
    let navigate = useNavigate()

    let departments = useEffectAllDepartments()

    let [predicate, setPredicate] = useState("")
    let [filtered, setFiltered] = useState([])

    useEffect(() => {
        let text = predicate.toLowerCase()
        setFiltered(departments.filter(des => {
            let name = des.name.toLowerCase()
            return name.includes(text);
        }))
    }, [departments, predicate])

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
                <h1 className="text-neutral-900 text-tl font-tl">Departments ({departments.length})</h1>
                <p className="text-neutral-900 text-bm font-bm">All departments are listed here.</p>
            </div>

            <div className="grid grid-cols-3 gap-[20px]">
                <SearchBox 
                    text={predicate}
                    placeholder="Search departments by name"
                    onChange={e => {
                        setPredicate(e.target.value ?? "")
                    }}
                />
            </div>

            <div className="grid grid-cols-3 gap-[20px]">
                {filtered.map((dep) => {
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