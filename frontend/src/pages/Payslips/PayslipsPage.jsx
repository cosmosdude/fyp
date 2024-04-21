import { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import GhostButton from "../../components/Buttons/GhostButton";
import DatePicker from "../../components/DatePicker";
import { apiPaths, apiRoute, imageRoute } from "../../configs/api.config";
import useAllAttendanceRecords from "../../hooks/useAllAttendanceRecords";
import useAllPayslips from "../../hooks/useAllPayslips";
import useAllUserPayrolls from "../../hooks/useAllUserPayrolls";
import breakTimeDisplayText from "../../utils/breakTime";
import { format } from "../../utils/fast-date-fns";
import { fullname } from "../../utils/fullname";
import { position } from "../../utils/position";
import { scheduleDisplayText } from "../../utils/scheduleDisplayText";
import timeDisplayText, { dateFrom24HrTime } from "../../utils/timeDisplayText";
import ActivityIndicator from "../../components/ActivityIndicator";
import { usePushNoti } from "../../components/Noti/NotiSystem";
import { useAuthContext } from "../../hooks/AuthStateContext";
import sleep from "../../utils/sleep";
import { useNavigate } from "react-router-dom";
import SearchBox from "../../components/SearchBox";

function PayslipsPage() {

    let pushNoti = usePushNoti()
    let navigate = useNavigate()
    let auth = useAuthContext()

    let [trigger, setTrigger] = useState(Math.random())
    let [date, setDate] = useState(new Date())
    let [records, setRecords] = useAllPayslips(date, trigger)

    let [generating, setGenerating] = useState([])

    let [predicate, setPredicate] = useState("")
    let [filtered, setFiltered] = useState([])

    useEffect(() => {
        let text = predicate.toLowerCase()
        setFiltered(records.filter(rec => {
            let name = fullname(rec.first_name, rec.last_name).toLowerCase()
            return name.includes(text);
        }))
    }, [records, predicate])

    async function generateForAllUsers() {
        records.forEach(x => generate(x.user_id))
    }

    async function generate(userId) {
        setGenerating(x => [...x, userId])
        await sleep(250)
        try {
            let res = await fetch(apiRoute(apiPaths.payslip.generate(userId, date.getMonth() + 1, date.getFullYear())), {
                method: "GET",
                headers: {
                    'authorization': `Bearer ${auth}`,
                    // 'content-type': 'application/x-www-form-urlencoded'
                },
                // body: `name=${data.name}&amount=${amount}&relative_amount=${data.relative_amount}&type=${data.type}`
            })

            if (res.status >= 200 && res.status < 300) {
                // setPayroll(await res.json())
                pushNoti({
                    title: "Success", 
                    message: "Payslip generated successfully",
                    style: "success"
                })

                let newItem = await res.json()
                setRecords(x => x.map(r => r.user_id === userId ? newItem : r))
            } else {
                pushNoti({
                    title: "Error", 
                    message: `Unable to add payroll item. (${await res.text()})`,
                    style: "danger"
                })
            }
        } catch (error) { 
            pushNoti({
                title: "Error", 
                message: `Unable to add payroll item. ${error}`,
                style: "danger"
            })
        }
        setGenerating(x => x.filter(x => x !== userId))
    }

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Payslips" current/>
                </Breadcrumb>
                <div className="grow"/>
                <FilledButton onClick={generateForAllUsers}>Generate</FilledButton>
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Attendance</h1>
                <p className="text-neutral-900 text-bm font-bm">All attendance records are shown here.</p>
            </div>
            <div className="grid grid-cols-4 gap-[20px]">
                <SearchBox 
                    text={predicate}
                    placeholder="Search employees by name"
                    onChange={e => {
                        setPredicate(e.target.value ?? "")
                    }}
                />
                <DatePicker 
                    text={format(date ?? new Date(), 'MMMM yyy') }
                    date={date} onDateSelect={x => {
                        console.log(x)
                        setDate(x ?? new Date())
                    }}
                />
            </div>
            <div className="block overflow-scroll w-full border rounded-[6px]">
                <table className="table-auto min-w-full mx-auto border-separate border-spacing-0">
                    <thead className="sticky top-[0px] left-0 z-10">
                        <tr className="
                        [&>*]:px-[24px] [&>*]:py-[16px]
                        [&>*]:border-[0.5px] 
                        [&>*]:font-bm [&>*]:text-bm
                        [&>*]:bg-background-1
                        ">
                            <th className="sticky left-0 items-center w-[50px]">No.</th>
                            <th className="sticky left-0 text-left font-bm text-bm">Employee</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {/* <AttendanceRow /> */}
                        {filtered.map((x, i) => <PayslipRow 
                            key={i} no={i + 1}
                            record={x}
                            isGenerating={generating.includes(x.user_id)}
                            onGenerate={() => generate(x.user_id)}
                            onView={() => navigate(x.id)}
                        />)}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

function PayslipRow({no, record, isGenerating, onGenerate, onView}) {

    return (
        <tr className="
        [&>*]:px-[16px] [&>*]:py-[12px] 
        bg-background-0
        //hover:bg-primary-50
        //cursor-pointer
        transition-all
        [&>*]:transition-all
        ">
            <td className="sticky left-0 text-center font-bs text-bs whitespace-nowrap">
                {no ?? ''}
            </td>
            <td className="sticky left-0 bg-white group-hover:bg-primary-50 text-left whitespace-nowrap">
                <div className="flex items-center gap-[10px]">
                    <Avatar className="" src={imageRoute(record.avatar_path)} size={30} title="John Doe"/>
                    <div className="flex flex-col">
                        <p className="font-ll text-ll">{fullname(record.first_name, record.last_name)}</p>
                        <p className="font-ls text-ls max-w-[250px] whitespace-normal">{position(record.designation_name, record.department_name)}</p>
                    </div>
                </div>
            </td>
            <td className="flex items-center justify-center gap-[10px] font-ll text-ll whitespace-nowrap">
                {/* 9:00 AM to 6:00 PM */}
                {!isGenerating && <GhostButton className="!p-0" onClick={onGenerate}>Generate</GhostButton>}
                {isGenerating && <ActivityIndicator/>}
                {record.id && <>
                    <p>/</p>
                    <GhostButton className="!p-0" onClick={onView}>View</GhostButton>
                </>}
            </td>
        </tr>
    )
}

export default PayslipsPage;