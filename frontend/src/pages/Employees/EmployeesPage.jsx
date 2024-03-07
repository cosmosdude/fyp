import PlusIcon from "../../assets/Icons/plus-white.svg"

import FilledButton from "../../components/Buttons/FilledButton";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";

function EmployeesPage() {
    return (
        <div className="flex flex-col w-full h-full">
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
        </div>
    );
}

export default EmployeesPage;