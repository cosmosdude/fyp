import PlusIcon from "../../assets/Icons/plus-white.svg"

import FilledButton from "../../components/Buttons/FilledButton";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import TextField from "../../components/TextField";
import { useLocation, useParams } from "react-router-dom";
import { useState } from "react";

function DepartmentDetailPage() {
    let { id } = useParams()
    let { pathname } = useLocation()

    let type = 'detail'
    if (pathname.includes('update')) type = 'update'
    if (id === 'new') type = 'new'

    console.log(id, pathname)

    const [name, setName] = useState("");

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Departments" to='/departments'/>
                    <BreadcrumbItem title="/"/>
                    {/* New if new */}
                    { type === 'new' && <BreadcrumbItem title="New" current/>}
                    {/* Detail if detail */}
                    { type == 'detail' && <BreadcrumbItem title="Detail" current/>}
                    { type === 'update' && <>
                        <BreadcrumbItem title="Detail" to={`/departments/${id}`}/>
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
                        <p className="text-neutral-900 text-ll font-ll">Department information. {type}</p>
                    </div>
                    {/* Right side */}
                    <form className="flex flex-col gap-[20px]">
                        {/* One item row */}
                        <TextField 
                            title={`Department Name ${type !== 'detail' ? '(required)' : ''}`} 
                            placeholder="eg. Marketing Department"
                            text={name}
                            // disable only when type is detail
                            disabled={type === 'detail'}
                            required
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
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

export default DepartmentDetailPage;