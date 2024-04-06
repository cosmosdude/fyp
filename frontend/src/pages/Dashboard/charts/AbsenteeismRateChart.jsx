import { useState } from "react";
import DatePicker from "../../../components/DatePicker";
import useEffectLeaveTrendData from "../../../hooks/statistics/useEffectLeaveTrendData";
import AnyChart from "../../../lib/Chart/AnyChart";
import { format } from "../../../utils/fast-date-fns";
import SelectBox from "../../../components/SelectBox";
import useEffectAbsentRateData from "../../../hooks/statistics/useEffectAbsentRateData";

let bgColors = [
    "#FFE066", // yellow
    "#FF6B66", // red
    "#B2B2B2", // gray
    "#7983EC", // blue
    "#8466FF", // purple
    "#66FF7E", // green
]

let borderColors = bgColors.map(x => x + (255*0.25).toString(16))

function AbsenteeismRateChart() {

    let [date, setDate] = useState(new Date())
    let data = useEffectAbsentRateData(date)
    
    let labels = data.map(x => x.month)
    let trendCount = data[0]?.trend?.length ?? 0

    let options = []
    for (let i = 0; i < 10; i++) {
        options.push((2020 + i).toString())
    }

    // console.log("Trend Count", trendCount)
    // console.log("Trend", data)

    // let datasets = data.map(x => ({
    //     label: "Absent Rate",

    // }))
    let datasets = [{
        label: "Absent Rate", 
        data: data.map(x => {
            let absent = Number(x.absentDays)
            let working = Number(x.workingDays)
            return working === 0 ? 0: (absent / working) * 100
        }),
        tension: 0.4
    }]

    // let trendDatasets = []
    // for (let i = 0; i < trendCount; i++) {
    //     let dataset = {
    //         label: data[0]?.trend?.[i]?.name ?? "Unknown",
    //         data: data.map(x => Number(x.trend[i].count) ),
    //         fill: true,
    //         borderWidth: 0.5,
    //         tension: 0.1
    //     }
    //     trendDatasets.push(dataset)
    //     console.log("Dataset", dataset)
    // }
    return (
        <div className="flex flex-col w-full h-full p-[10px] rounded-[6px] border">
            <div className="flex grow text-bs font-bs">
                <h1>Absent Rate</h1>
                <div className="grow"/>
                <SelectBox 
                    className="w-[150px]"
                    text={date.getFullYear()}
                    options={options}
                    selected={options.indexOf(date.getFullYear().toString())}
                    onSelect={(item, i) => {
                        setDate(new Date(`${item}-01-01`))
                    }}
                />
            </div>   
            <div className="grow p-[10px]">
                <AnyChart
                    className=""
                    type='line'
                    data={{
                        labels: labels,
                        datasets: datasets,
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                              // the data minimum used for determining the ticks is Math.min(dataMin, suggestedMin)
                              suggestedMin: 0,
                              min: 0,
                      
                              // the data maximum used for determining the ticks is Math.max(dataMax, suggestedMax)
                              suggestedMax: 100,
                            }
                        }
                    }}
                />
            </div>   
        </div>
        
    );
}

export default AbsenteeismRateChart;