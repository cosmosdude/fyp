import PlusIcon from "../../assets/Icons/plus-white.svg"

import FilledButton from "../../components/Buttons/FilledButton";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import EmployeeCard from "./Cards/EmployeeCard";
import useEffectGetAllEmployees from "../../hooks/useEffectGetAllEmployees";
import { format } from "date-fns";
import { imageRoute } from "../../configs/api.config";
import { useNavigate } from "react-router-dom";
import SearchBox from "../../components/SearchBox";
import { fullname } from "../../utils/fullname";
import { useEffect, useState } from "react";
import EmptyView from "../../components/EmptyView";

function EmployeesPage() {
    let navigate = useNavigate()
    let employees = useEffectGetAllEmployees();

    let [predicate, setPredicate] = useState("");

    let [filtered, setFiltered] = useState([]);

    useEffect(() => {
        let text = predicate.toLowerCase()
        setFiltered(employees.filter(emp => {
            let name = String(fullname(emp.first_name, emp.last_name)?.toLowerCase() ?? "")
            return name.includes(text);
        }))
    }, [employees, predicate]);
    
    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Employees" current/>
                </Breadcrumb>
                <div className="grow"/>
                <FilledButton src={PlusIcon} to='new'>New Employee</FilledButton>
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Employees ({employees.length})</h1>
                <p className="text-neutral-900 text-bm font-bm">All employees are listed here.</p>
            </div>
            
            <div className="grid grid-cols-3 gap-[20px]">
                <SearchBox 
                    text={predicate}
                    placeholder="Search employee by name"
                    onChange={e => {
                        setPredicate(e.target.value ?? "")
                    }}
                />
            </div>
            {/* Search Section */}
            {/* <div className="mx-auto"></div> */}

            {/* Card list view */}
            <div className="grow overflow-y-scroll">
                <div className="grid grid-cols-2 gap-[20px]">
                    {filtered.map(
                        (emp, i) => {
                            return <
                                EmployeeCard 
                                key={emp.id} 
                                avatarSrc={imageRoute(emp.avatar_path)}
                                title={(emp.first_name ?? "") + (emp.last_name ? ` ${emp.last_name}` : "")}
                                subtitle={
                                    `${emp.designation_name ?? ""} ${emp.department_name ? `at ${emp.department_name}` : ""}`
                                }
                                status={emp.status}
                                joinDate={`Joined ${format(new Date(emp.created_at), "MMMM yyyy")}`}
                                onClick={() => {navigate(emp.id)}}
                            />
                        }
                    )}
                </div>
                {filtered.length === 0 && <EmptyView 
                    title="No Employee Found" body="No matching employee found for now."
                    // cta="Add Holiday"
                    // onCta= {() => {
                    //     navigate("new")
                    // }}
                />}
            </div>
            
        </div>
    );
}

export default EmployeesPage;