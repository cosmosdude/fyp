import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";

// export declare const FYPChart = Chart

function AnyChart({className, type, data, options}) {
    return (<Chart className={className} type={type} data={data} options={options}/>);
}

export default AnyChart;