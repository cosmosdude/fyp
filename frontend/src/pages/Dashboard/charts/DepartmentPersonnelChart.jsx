import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import { useAuthContext } from "../../../hooks/AuthStateContext";
import useEffectAllDepartmentData from "../../../hooks/statistics/useEffectAllDepartmentData";

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
        <Chart
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
                plugins: {
                    title: {
                        display: true,
                        text: "Department Allocations",
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
            }}
        />
    );
}

export default DepartmentPersonnelChart;