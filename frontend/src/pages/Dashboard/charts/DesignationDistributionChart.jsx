import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useAuthContext } from "../../../hooks/AuthStateContext";
import useEffectAllDepartmentData from "../../../hooks/statistics/useEffectAllDepartmentData";
import useEffectAllDesignationData from "../../../hooks/statistics/useEffectAllDesignationData";

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
        <Chart
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
                title: {
                    display: true,
                    responsive: true,
                    maintainAspectRatio: false,
                },
                animation: {
                    tension: {
                        duration: 1000,
                        easing: 'linear',
                        from: 1,
                        to: 0,
                        loop: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: "Designation Allocations",
                        position: 'bottom',
                        align: 'center',
                        responsive: true,
                        font: {
                            family: 'Inter',
                            size: 14,
                            weight: 'normal'
                        }
                    },
                },
                scales: {
                    y: {
                        bounds: 'ticks',
                        type: 'category',
                    },
                    x: {
                        type: 'linear',
                        display: true,
                    },
                }
            }}
        />
    );
}

export default DesignationDistributionChart;