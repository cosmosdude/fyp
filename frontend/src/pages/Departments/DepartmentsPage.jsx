import PlusIcon from "../../assets/Icons/plus-white.svg"

import FilledButton from "../../components/Buttons/FilledButton";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import DepartmentCard from "./Cards/DepartmentCard";

export default function DepartmentsPage() {
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
                <FilledButton src={PlusIcon}>New Department</FilledButton>
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Departments (3)</h1>
                <p className="text-neutral-900 text-bm font-bm">All departments are listed here.</p>
            </div>

            <div className="grid grid-cols-3 gap-[20px]">
                <DepartmentCard title="HR"/>
                <DepartmentCard title="Software Development"/>
                <DepartmentCard title="Sales"/>
                <DepartmentCard title="Marketing"/>
                <DepartmentCard title="Finance"/>
            </div>

        </div>
    )
}