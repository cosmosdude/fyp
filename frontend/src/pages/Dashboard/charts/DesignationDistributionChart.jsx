import { useAuthContext } from "../../../hooks/AuthStateContext";
import useEffectAllDepartmentData from "../../../hooks/statistics/useEffectAllDepartmentData";
import useEffectAllDesignationData from "../../../hooks/statistics/useEffectAllDesignationData";
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


function DesignationDistributionChart() {
    let data = useEffectAllDesignationData()
    return (
        <div className="w-full flex flex-col border rounded-[6px]">
            <div className="p-[10px] text-bs font-bs">
                <h1>Designation Distributions</h1>
            </div>
            <div className="grow p-[10px]">
                <AnyChart
                    className=""
                    type='bar'
                    data={{
                        labels: data.map(x => x.name),
                        datasets: [
                            {
                                label: 'Designation Distribution',
                                axis: 'y',
                                data: data.map(x => x.value),
                                fill: true,
                                borderColor: borderColors,
                                backgroundColor: bgColors,
                                barPercentage: 0.9,
                                categoryPercentage: 0.8
                            },
                        ]
                    }}
                    options={{
                        indexAxis: 'y',
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                        scales: {
                            
                            y: {
                                bounds: 'ticks',
                                type: 'category',
                                ticks: {
                                    font: {
                                        size: 10,
                                        weight: '900'
                                    }
                                }
                            },
                            x: {
                                type: 'linear',
                                display: true,
                                precision: 1,
                                ticks: {
                                    stepSize: 1,
                                },
                                suggestedMax: 6,
                                
                                // legend: {
                                //     labels: {
                                //         display: false,
                                //         font: {
                                //             size: 10
                                //         }
                                //     }
                                // },
                            },
                        }
                    }}
                />
            </div>
        </div>
    );
}

export default DesignationDistributionChart;