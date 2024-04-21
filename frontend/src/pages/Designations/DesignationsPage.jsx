import PlusIcon from "../../assets/Icons/plus-white.svg"

import FilledButton from "../../components/Buttons/FilledButton";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import DesignationCard from "./Cards/DesignationCard";
import { useAuthContext } from "../../hooks/AuthStateContext";
import { useEffect, useState } from "react";
import departmentService from "../../services/department";
import designationService from "../../services/designations";
import { useNavigate } from "react-router-dom";
import SearchBox from "../../components/SearchBox";
import { usePushNoti } from "../../components/Noti/NotiSystem";
import { apiPaths, apiRoute } from "../../configs/api.config";

export default function DesignationsPage() {
    let navigate = useNavigate()
    let pushNoti = usePushNoti()
    let accessToken = useAuthContext()
    let [designations, setDesignations] = useState([])

    useEffect(() => {
        let aborter = new AbortController()
        async function fetchData() {
            try {
                let res = await designationService.getAll({
                    accessToken,
                    signal: aborter.signal
                })

                console.log("status", res.status)

                let json = await res.json()
                console.log("response", json)
                if (res.status === 200) {
                    setDesignations(json)
                }
            } catch (error) {
                console.log("error", error)
            }
        }
        fetchData()
        return () => aborter.abort()
    }, [])

    let [predicate, setPredicate] = useState("")
    let [filtered, setFiltered] = useState([])

    useEffect(() => {
        let text = predicate.toLowerCase()
        setFiltered(designations.filter(des => {
            let name = des.name.toLowerCase()
            return name.includes(text);
        }))
    }, [designations, predicate])

    async function deleteItem(id) {
        try {
            let res = await fetch(
                apiRoute(apiPaths.designation.delete(id)), 
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
                    message: `Designation successfully deleted ${id} ${text} `, 
                    style: "success"
                })
                setDesignations(designations.filter(d => d.id !== id))
            } else {
                pushNoti({title: "Error", message: "Unable to delete designation", style: "danger"})
            }
        } catch (error) {
            pushNoti({title: "Error", message: "Unable to delete designation", style: "danger"})
        }
    }

    

    return(
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Designations" current/>
                </Breadcrumb>
                <div className="grow"/>
                <FilledButton src={PlusIcon} to="new">New Designation</FilledButton>
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Designations ({designations.length})</h1>
                <p className="text-neutral-900 text-bm font-bm">All designations are listed here.</p>
            </div>

            <div className="grid grid-cols-3 gap-[20px]">
                <SearchBox 
                    text={predicate}
                    placeholder="Search designations by name"
                    onChange={e => {
                        setPredicate(e.target.value ?? "")
                    }}
                />
            </div>

            <div className="grid grid-cols-3 gap-[20px] items-start">
                {filtered.map(des => {
                    return <DesignationCard 
                        key={des.id}
                        title={des.name}
                        onClick={() => navigate(`/designations/${des.id}`)}
                        onDelete={() => {
                            deleteItem(des.id)
                        }}
                    />    
                })}
            </div>
        </div>
    )
}