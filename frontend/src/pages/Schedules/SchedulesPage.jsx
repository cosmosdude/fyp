import { Navigate, useNavigate } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import useAllUserShifts from "../../hooks/useAllUserShifts";
import { imageRoute } from "../../configs/api.config";
import { format } from "date-fns";

function SchedulesPage() {

    let navigate = useNavigate()

    let schedules = useAllUserShifts()
    // for (let i = 0; i < 100; i++) schedules.push({id: i})

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Schedules" current/>
                </Breadcrumb>
                <div className="grow"/>
                {/* <FilledButton icon='plus' to='new'>New Employee</FilledButton> */}
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Shift Schedules</h1>
                <p className="text-neutral-900 text-bm font-bm">Weekly shifts of all employees are shown here.</p>
            </div>
            <div className="block overflow-scroll w-full border rounded-[6px]">
                <table className="table-auto min-w-full mx-auto border-separate border-spacing-0">
                    <thead className="sticky top-[0px] left-0 z-10">
                        <tr className="
                        [&>*]:px-[50px] [&>*]:py-[16px]
                        [&>*]:border-[0.5px] 
                        [&>*]:font-bm [&>*]:text-bm
                        [&>*]:bg-background-1
                        ">
                            <th className="sticky left-0">No.</th>
                            <th className="sticky left-0 text-left font-bm text-bm">Employee</th>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {/* <ScheduleRow /> */}
                        {schedules.map( (x,i) => <ScheduleRow 
                        key={x.id} 
                        no={i + 1}
                        shift={x}
                        onClick={() => navigate('id-something')}
                        />)}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

function ScheduleRow({no, shift, onClick}) {
    let name = [shift.first_name, shift.last_name].filter(x => !!x).join(' ')

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
            <td className="sticky left-0 text-center text-bs whitespace-nowrap">
                {no ?? ''}
            </td>
            <td className="sticky left-0 flex gap-[10px] items-center bg-white group-hover:bg-primary-50 text-left whitespace-nowrap">
                <Avatar src={imageRoute(shift.avatar_path)} size={30} title="John Doe"/>
                <div className="flex flex-col">
                    <p className="font-ll text-ll">{name}</p>
                    {/* <p className="font-ls text-ls">admin@yopmail.com</p> */}
                </div>
                
            </td>
            <ShiftCell>
                {schedule(shift.sun_start_at, shift.sun_end_at) ?? "Off Day"}
            </ShiftCell>
            <ShiftCell>
                {schedule(shift.mon_start_at, shift.mon_end_at) ?? "Off Day"}
            </ShiftCell>
            <ShiftCell>
                {schedule(shift.tue_start_at, shift.tue_end_at) ?? "Off Day"}
            </ShiftCell>
            <ShiftCell>
            {schedule(shift.wed_start_at, shift.wed_end_at) ?? "Off Day"}
            </ShiftCell>
            <ShiftCell>
                {schedule(shift.thu_start_at, shift.thu_end_at) ?? "Off Day"}
            </ShiftCell>
            <ShiftCell>
                {schedule(shift.fri_start_at, shift.fri_end_at) ?? "Off Day"}
            </ShiftCell>
            <ShiftCell>
                {schedule(shift.sat_start_at, shift.sat_end_at) ?? "Off Day"}
            </ShiftCell>
        </tr>
    )
}

export default SchedulesPage;

function ShiftCell({children}) {
    return(
        <td className="text-center text-ls whitespace-nowrap">
            {children}
        </td>
    )
}

function schedule(from, to) {
    if (!from || !to) return null
    /**
     * @param time Time in HH:mm:ss format
    */
    function dateFromTime(time) {
        return `2000-01-01 ${time}`
    }

    let displyText = [new Date(dateFromTime(from)), new Date(dateFromTime(to))]
        .map(x => {
            console.log(x)
            return format(x, 'hh:mm a')
        })
        .join(' to ')
    return displyText
}