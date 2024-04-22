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
import { apiPaths, apiRoute } from "../../configs/api.config";
import { usePushNoti } from "../../components/Noti/NotiSystem";
import { AlertActions, AlertBody, AlertButton, AlertDialog, AlertTitle } from "../../components/AlertDialog/AlertDialog";

export default function DepartmentsPage() {
    let navigate = useNavigate()
    let pushNoti = usePushNoti()
    let accessToken = useAuthContext()
    let [departments, setDepartments] = useEffectAllDepartments()

    let [predicate, setPredicate] = useState("")
    let [filtered, setFiltered] = useState([])

    useEffect(() => {
        let text = predicate.toLowerCase()
        setFiltered(departments.filter(des => {
            let name = des.name.toLowerCase()
            return name.includes(text);
        }))
    }, [departments, predicate])

    let [itemId, setItemId] = useState(null);

    async function deleteItem(id) {
        try {
            let res = await fetch(
                apiRoute(apiPaths.department.delete(id)), 
                {
                    method: "DELETE",
                    headers: { 
                        // 'content-type': "application/json",
                        'authorization': `Bearer ${accessToken}`
                    }
                }
            )

            if (res.status >= 200 && res.status < 300) {
                let text = await res.text()
                pushNoti({
                    title: "Deleted", 
                    message: `Designation successfully deleted.`, 
                    style: "success"
                })
                setDepartments(departments.filter(d => d.id !== id))
            } else {
                pushNoti({title: "Error", message: `Unable to delete designation ${id}`, style: "danger"})
            }
        } catch (error) {
            console.error(error)
            pushNoti({title: "Error", message: `Unable to delete designation ${id}`, style: "danger"})
        }
    }

    return (
        <>
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

            <div className="grid grid-cols-3 gap-[20px] items-start">
                {filtered.map((dep) => {
                    return <DepartmentCard 
                        key={dep.id}
                        title={dep.name}
                        onClick={() => navigate(`/departments/${dep.id}`)}
                        onDelete={() => setItemId(dep.id)}
                    />    
                })}
            </div>
        </div>
        <AlertDialog isOpen={itemId !== null}>
            <AlertTitle>Delete</AlertTitle>
            <AlertBody>Are you sure you wish to delete this department? This operation can't be undone.</AlertBody>
            <AlertActions>
                <AlertButton onClick={() => setItemId(null)}>
                    Dismiss
                </AlertButton>
                <AlertButton style="danger" onClick={() => {
                    deleteItem(itemId)
                    setItemId(null)
                }}>
                    Confirm
                </AlertButton>
            </AlertActions>
        </AlertDialog>
        </>
    )
}