import { useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import GhostButton from "../../components/Buttons/GhostButton";
import { imageRoute } from "../../configs/api.config";
import useAllAttendanceRecords from "../../hooks/useAllAttendanceRecords";
import useAllUserPayrolls from "../../hooks/useAllUserPayrolls";
import breakTimeDisplayText from "../../utils/breakTime";
import { format } from "../../utils/fast-date-fns";
import { fullname } from "../../utils/fullname";
import { position } from "../../utils/position";
import { scheduleDisplayText } from "../../utils/scheduleDisplayText";
import timeDisplayText, { dateFrom24HrTime } from "../../utils/timeDisplayText";
import { useEffect, useState } from "react";
import SearchBox from "../../components/SearchBox";

function PayrollsPage() {

    let navigate = useNavigate()
    // let schedules = []
    // for (let i = 0; i < 10; i++) schedules.push({id: i})

    let records = useAllUserPayrolls()

    let [predicate, setPredicate] = useState("")
    let [filtered, setFiltered] = useState([])

    useEffect(() => {
        let text = predicate.toLowerCase()
        setFiltered(records.filter(rec => {
            let name = fullname(rec.first_name, rec.last_name).toLowerCase()
            return name.includes(text);
        }))
    }, [records, predicate])

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Payroll" current/>
                </Breadcrumb>
                <div className="grow"/>
                {/* <FilledButton to="requests" rightIcon='arrow-right'>Attendance Requests</FilledButton> */}
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Payroll</h1>
                <p className="text-neutral-900 text-bm font-bm">Employee payroll information.</p>
            </div>
            <div className="grid grid-cols-3 gap-[20px]">
                <SearchBox 
                    text={predicate}
                    placeholder="Search employees by name"
                    onChange={e => {
                        setPredicate(e.target.value ?? "")
                    }}
                />
            </div>
            <div className="block overflow-scroll w-full border rounded-[6px]">
                <table className="table-auto min-w-full mx-auto border-separate border-spacing-0">
                    <thead className="sticky top-[0px] left-0 z-10">
                        <tr className="
                        [&>*]:px-[8px] [&>*]:py-[16px]
                        [&>*]:border-[0.5px] 
                        [&>*]:font-bm [&>*]:text-bm
                        [&>*]:bg-background-1
                        ">
                            <th className="sticky left-0 items-center whitespace-nowrap">No.</th>
                            <th className="sticky left-0 text-left font-bm text-bm">Employee</th>
                            <th>Salary</th>
                            <th>Wage</th>
                            <th>Overtime Rate</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {/* <AttendanceRow /> */}
                        {filtered.map((x, i) => <PayrollRow 
                            key={i} no={i + 1}
                            record={x}
                            onClick={() => {
                                navigate(x.user_id)
                            }}
                        />)}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

function PayrollRow({no, record, onClick}) {

    let shift = ""
    
    if (record?.leave_name) {
        shift = `On Leave - ${record?.leave_name}`
    } else if (record?.holiday_name) {
        shift = `Public Holiday - ${record?.holiday_name}`
    } else {
        shift = scheduleDisplayText(record.start_at, record.end_at)
        shift = !shift ? "Off" : shift
    }

    let checkInDate = dateFrom24HrTime(record?.checkin_at)
    let startDate = dateFrom24HrTime(record?.start_at)
    let isLateCheckIn = false
    let checkInTimeText = "-"

    if (checkInDate) {
        checkInTimeText = format(checkInDate, 'hh:mm a')
        if (startDate) {
            isLateCheckIn = checkInDate.getTime() > startDate.getTime()
        }
    }

    let checkOutDate = dateFrom24HrTime(record?.checkout_at)
    let endDate = dateFrom24HrTime(record?.end_at)
    let isEarlyCheckOut = false
    let checkOutTimeText = "-"

    if (checkOutDate) {
        checkOutTimeText = format(checkOutDate, 'hh:mm a')
        if (endDate) {
            isEarlyCheckOut = checkOutDate.getTime() < endDate.getTime()
        }
    }

    let breakSeconds = record?.break_seconds ?? 0
    let totalWorkHour = "-"
    if (checkOutDate && checkInDate) {
        let diff = ((checkOutDate.getTime() - checkInDate.getTime()) / 1000) - breakSeconds
        totalWorkHour = breakTimeDisplayText(diff)
    }

    return (
        <tr className="
        group
        [&>*]:px-[16px] [&>*]:py-[12px] 
        bg-background-0
        hover:bg-primary-50
        cursor-pointer
        transition-all
        [&>*]:transition-all
        "
        onClick={onClick}
        >
            <td className="sticky left-0 text-center font-ll text-ll whitespace-nowrap">
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
            <td className="text-center font-ll text-ll whitespace-nowrap">
                {/* 9:00 AM to 6:00 PM */}
                {record.salary ?? 0} MMK
            </td>
            <td className="text-center font-ll text-ll whitespace-nowrap">
                {record.wage ?? 0} MMK
            </td>
            <td className="text-center items-center gap-[4px] justify-center font-ll text-ll whitespace-nowrap">
                {record.overtime_rate}x
            </td>
        </tr>
    )
}

export default PayrollsPage;