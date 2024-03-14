// import { Chart, Doughnut } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";
import useEffectAllDepartmentData from "../../hooks/statistics/useEffectAllDepartmentData";

import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useAuthContext } from "../../hooks/AuthStateContext";

function DashboardPage() {

    let departments = []
    let auth = useAuthContext()
    
    let chartColors = [
        "#FFE066", // yellow
        "#FF6B66", // red
        "#B2B2B2", // gray
        "#7983EC", // blue
        "#8466FF", // purple
        "#66FF7E", // green
    ]

    let departmentData = useEffectAllDepartmentData()

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Dashboard</h1>
                <p className="text-neutral-900 text-bm font-bm">Statistical analysis of day to day operations.</p>
            </div>
            <div className="flex flex-col">
                <div className="grid grid-cols-3 gap-[20px]">
                    <div>
                        <Chart
                            type='doughnut'
                            data={{
                                labels: departmentData.map(x => x.name),
                                datasets: [
                                    {
                                        label: 'Personnel',
                                        data: departmentData.map(x => x.value),
                                        fill: true,
                                        borderColor: 'white',
                                        backgroundColor: chartColors,
                                    },
                                ]
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;