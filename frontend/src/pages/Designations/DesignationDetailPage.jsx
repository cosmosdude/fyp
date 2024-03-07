import PlusIcon from "../../assets/Icons/plus-white.svg"

import FilledButton from "../../components/Buttons/FilledButton";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import TextField from "../../components/TextField";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import departmentService from "../../services/department";
import { useAuthContext } from "../../hooks/AuthStateContext";
import designationService from "../../services/designations";
import useEffectAllDepartments from "../../hooks/useEffectAllDepartments";
import SelectBox from "../../components/SelectBox";

function DesignationDetailPage() {
    let navigate = useNavigate()

    let { id } = useParams()
    let { pathname } = useLocation()

    let type = 'detail'
    if (pathname.includes('update')) type = 'update'
    if (id === 'new') type = 'new'

    let accessToken = useAuthContext()

    let departments = useEffectAllDepartments()

    const [name, setName] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [departmentName, setDepartmentName] = useState("");

    console.log(selectedIndex, departmentName)

    useEffect(() => {
        if (type === 'new') return

        let aborter = new AbortController()
        async function fetchData() {
            try {
                let res = await designationService.get(
                    {id: id, signal: aborter.signal, accessToken: accessToken}
                )

                if (res.status === 200) {
                    let json = await res.json()
                    console.log(json)
                    setName(json.name)
                    setDepartmentName(json.department_name)
                }
            } catch { }
        }

        fetchData()
        return () => aborter.abort()
    }, [])

    async function update() {
        try {
            // let res = await departmentService.update(
            //     {id, departmentName: name, accessToken}
            // )
            // console.log(res.status)
            // if (res.status === 202)  navigate('/designations/' + id)
        } catch { }
    }

    async function create() {
        try {
            // let res = await departmentService.create(
            //     {departmentName: name, accessToken}
            // )
            // console.log(res.status)
            // if (res.status === 202) {
            //     let json = await res.json()
            //     let department = json[0]
            //     navigate('/designations/' + department.id)
            // }
        } catch { }
    }

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Designations" to='/designations'/>
                    <BreadcrumbItem title="/"/>
                    {/* New if new */}
                    { type === 'new' && <BreadcrumbItem title="New" current/>}
                    {/* Detail if detail */}
                    { type == 'detail' && <BreadcrumbItem title="Detail" current/>}
                    { type === 'update' && <>
                        <BreadcrumbItem title="Detail" to={`/designations/${id}`}/>
                        <BreadcrumbItem title="/"/>
                        <BreadcrumbItem title="Update" current/>
                    </>}
                </Breadcrumb>
                <div className="grow"/>
                {/* Show only when type is detail */}
                {type === 'detail' && <FilledButton to='update'>Update</FilledButton>}
            </div>
            
            <div className="grow flex flex-col overflow-y-scroll">
                {/* Section */}
                <section className="grid grid-cols-2 gap-[20px]">
                    {/* Left side */}
                    <div className="flex flex-col">
                        <h1 className="text-neutral-900 text-ts font-ts">Detail</h1>
                        <p className="text-neutral-900 text-ll font-ll">Designation information. {type}</p>
                    </div>
                    {/* Right side */}
                    <form className="flex flex-col gap-[20px]" onSubmit={(e) => {
                        e.preventDefault()
                        if (type === 'update') update()
                        if (type === 'new') create()
                    }}>
                        {/* One item row */}
                        <TextField 
                            title={`Name ${type !== 'detail' ? '(required)' : ''}`} 
                            placeholder="eg. Principal Software Engineer"
                            text={name}
                            // disable only when type is detail
                            disabled={type === 'detail'}
                            required
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
                        <SelectBox
                            title="Department" 
                            text={departmentName}
                            placeholder="Select Department"
                            selected={selectedIndex}
                            onSelect={(item, index) => {
                                setDepartmentName(item.name)
                                setSelectedIndex(index)
                                console.log("DesignationDetailPage.onSelect", item, index)
                            }}
                            // error="Testing"
                            options={departments}
                            // disabled={type === 'detail'}
                        />
                        {/* Row */}
                        <div className="grid grid-cols-2 gap-[20px]">
                            {/* Spacer */}
                            <div/>
                            {/* Show only when type is detail */}
                            {type === 'update' && <FilledButton>Confirm</FilledButton>}

                            {/* Show only when type is detail */}
                            {type === 'new' && <FilledButton>Create</FilledButton>}
                        </div>
                    </form>
                </section>
            </div>
        </div>
    );
}

export default DesignationDetailPage;