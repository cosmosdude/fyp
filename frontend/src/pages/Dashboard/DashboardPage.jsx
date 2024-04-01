// import { Chart, Doughnut } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";
import DepartmentPersonnelChart from "./charts/DepartmentPersonnelChart";
import DesignationDistributionChart from "./charts/DesignationDistributionChart";
import DatePicker from "../../components/DatePicker";
import LeaveTrendChart from "./charts/LeaveTrendChart";

function DashboardPage() {

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Dashboard</h1>
                <p className="text-neutral-900 text-bm font-bm">Statistical analysis of day to day operations.</p>
            </div>
            <div className="flex flex-col">
                <div className="grid grid-cols-3 gap-[20px] [&>*]:h-[350px]">
                    <div className="flex">
                        <DepartmentPersonnelChart/>
                    </div>
                    <div className="flex col-span-2">
                        <DesignationDistributionChart/>
                    </div>

                    <div className="flex col-span-3">
                        <LeaveTrendChart/>
                    </div>
                    {/* <div className="flex p-[10px] col-span-3 rounded-[6px] border h-[200px]">
                        
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;