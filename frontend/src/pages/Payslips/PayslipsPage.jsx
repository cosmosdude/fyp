import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import GhostButton from "../../components/Buttons/GhostButton";
import { imageRoute } from "../../configs/api.config";
import useAllAttendanceRecords from "../../hooks/useAllAttendanceRecords";
import breakTimeDisplayText from "../../utils/breakTime";
import { format } from "../../utils/fast-date-fns";
import { fullname } from "../../utils/fullname";
import { position } from "../../utils/position";
import { scheduleDisplayText } from "../../utils/scheduleDisplayText";
import timeDisplayText, { dateFrom24HrTime } from "../../utils/timeDisplayText";

function PayslipsPage() {

    // let schedules = []
    // for (let i = 0; i < 10; i++) schedules.push({id: i})

    let records = useAllAttendanceRecords()

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
                <FilledButton to="requests" rightIcon='arrow-right'>Generate</FilledButton>
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Attendance</h1>
                <p className="text-neutral-900 text-bm font-bm">All attendance records are shown here.</p>
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
                            <th className="sticky left-0 items-center max-w-[50px]">No.</th>
                            <th className="sticky left-0 text-left font-bm text-bm">Employee</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {/* <AttendanceRow /> */}
                        {records.map((x, i) => <PayslipRow 
                            key={i} no={i + 1}
                            record={x}
                        />)}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

function PayslipRow({no, record}) {

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
                <GhostButton className="!p-0">Generate</GhostButton>
                <p>•</p>
                <GhostButton className="!p-0">View</GhostButton>
            </td>
        </tr>
    )
}

export default PayslipsPage;