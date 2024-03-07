import PlusIcon from "../../assets/Icons/plus-white.svg"

import FilledButton from "../../components/Buttons/FilledButton";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import EmployeeCard from "./Cards/EmployeeCard";

function EmployeesPage() {
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
                <FilledButton src={PlusIcon}>New Employee</FilledButton>
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Employees (130)</h1>
                <p className="text-neutral-900 text-bm font-bm">All employees are listed here.</p>
            </div>

            <div className="grow grid grid-cols-3 gap-[20px] overflow-y-scroll">
                <EmployeeCard/>
                <EmployeeCard/>
                <EmployeeCard/>
                <EmployeeCard/>
                <EmployeeCard/>
                <EmployeeCard/>
                <EmployeeCard/>
                <EmployeeCard/>
            </div>
        </div>
    );
}

export default EmployeesPage;