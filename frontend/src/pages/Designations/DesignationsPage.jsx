import PlusIcon from "../../assets/Icons/plus-white.svg"

import FilledButton from "../../components/Buttons/FilledButton";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import DesignationCard from "./Cards/DesignationCard";

export default function DesignationsPage() {
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
                <FilledButton src={PlusIcon}>New Designation</FilledButton>
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Designations (3)</h1>
                <p className="text-neutral-900 text-bm font-bm">All designations are listed here.</p>
            </div>

            <div className="grid grid-cols-3 gap-[20px]">
                <DesignationCard title="iOS Developer"/>
                <DesignationCard title="Senior iOS Developer"/>
                <DesignationCard title="Junior iOS Developer"/>
                <DesignationCard title="Android Developer"/>
                <DesignationCard title="Senior Android Developer"/>
                <DesignationCard title="Junior Android Developer"/>
                <DesignationCard title="Fullstack Developer"/>
            </div>
        </div>
    )
}