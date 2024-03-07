import PlusIcon from "../../assets/Icons/plus-white.svg"

import FilledButton from "../../components/Buttons/FilledButton";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";

export default function DesignationsPage() {
    return(
        <div className="flex flex-col w-full h-full">
            {/* Top nav */}
            <div className="flex items-center">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Designations" current/>
                </Breadcrumb>
                <div className="grow"/>
                <FilledButton src={PlusIcon}>New Designation</FilledButton>
            </div>
        </div>
    )
}