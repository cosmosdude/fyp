import { useAuthContext } from "../../../hooks/AuthStateContext";
import useEffectAllDepartmentData from "../../../hooks/statistics/useEffectAllDepartmentData";
import AnyChart from "../../../lib/Chart/AnyChart";

let bgColors = [
    "#FFE066", // yellow
    "#FF6B66", // red
    "#B2B2B2", // gray
    "#7983EC", // blue
    "#8466FF", // purple
    "#66FF7E", // green
]

let borderColors = bgColors.map(x => x + (255*0.25).toString(16))


function DepartmentPersonnelChart() {
    let departmentData = useEffectAllDepartmentData()
    return (
        <div className="grow w-full flex flex-col border rounded-[6px]">
            <div className="p-[10px] text-bs font-bs">
                <h1>Department Distributions</h1>
            </div>
            <div className="grow p-[10px]">
                <AnyChart
                    type='doughnut'
                    data={{
                        labels: departmentData.map(x => x.name),
                        datasets: [
                            {
                                label: 'Personnel',
                                data: departmentData.map(x => x.value),
                                fill: true,
                                borderColor: borderColors,
                                backgroundColor: bgColors,
                            },
                        ]
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        
                        plugins: {
                            legend: {
                                // display: false,
                                position: 'bottom'
                            },
                            // title: {
                            //     display: true,
                            //     text: "Department Allocations",
                            //     position: 'bottom',
                            //     align: 'center',
                            //     responsive: true,
                            //     font: {
                            //         family: 'Inter',
                            //         size: 14,
                            //         weight: 'normal'
                            //     }
                            // },
                        },
                    }}
                />
            </div>
        </div>

    );
}

export default DepartmentPersonnelChart;