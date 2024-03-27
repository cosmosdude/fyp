import { forwardRef, useEffect, useReducer, useState } from "react";
import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import GhostButton from "../../components/Buttons/GhostButton";
import SelectBox from "../../components/SelectBox";
import TextField from "../../components/TextField";
import CheckBox from "../../components/CheckBox";
import DatePicker from "../../components/DatePicker";
import { useParams } from "react-router-dom";
import useEffectUserDetail from "../../hooks/useEffectUserDetail";
import { fullname } from "../../utils/fullname";
import { position } from "../../utils/position";
import { imageRoute } from "../../configs/api.config";
import useUserShifts from "../../hooks/useUserShifts";
import { format } from "../../utils/fast-date-fns";

export default function ScheduleDetailPage() {

    let { id } = useParams()

    let user = useEffectUserDetail(id)

    let shifts = useUserShifts(user.id)
    let [sun, setSun] = useState({})
    let [mon, setMon] = useState({})
    let [tue, setTue] = useState({})
    let [wed, setWed] = useState({})
    let [thu, setThu] = useState({})
    let [fri, setFri] = useState({})
    let [sat, setSat] = useState({})

    useEffect(() => {
        // console.log("sun", shifts.find(x => x.day === 'sun') ?? {})

        function findShift(s, day) {
            let newShift = s.map(x => {x.off = x.start_at === null; return x}).find(x => x.day === day) ?? {}
            console.log("New Shift", newShift)
            return newShift
        }

        setSun(findShift(shifts, 'sun'))
        setMon(findShift(shifts, 'mon'))
        setTue(findShift(shifts, 'tue'))
        setWed(findShift(shifts, 'wed'))
        setThu(findShift(shifts, 'thu'))
        setFri(findShift(shifts, 'fri'))
        setSat(findShift(shifts, 'sat'))
    }, [shifts])


    console.log("User", user)
    console.log("Shifts", shifts)

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center gap-[20px]">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Schedules" to='/schedules'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Update" current/>
                </Breadcrumb>
                <div className="grow"/>
                {/* <GhostButton to="settings" rightIcon='settings'>Leave Types</GhostButton> */}
                <FilledButton>Update</FilledButton>
            </div>
            
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Schedule Shift</h1>
                <p className="text-neutral-900 text-bm font-bm">Schedule weekly shift for an employee.</p>
            </div>

            {/* User */}
            <div className="flex items-center gap-[10px]">
                <Avatar src={imageRoute(user.avatar_path)} size={40} title="A"/>
                <div className="flex flex-col">
                    <p className="font-ll text-ll">{fullname(user.first_name, user.last_name)}</p>
                    <p className="font-ls text-ls">{position(user.designation_name, user.department_name)}</p>
                </div>
            </div>

            <div className="
            grid grid-cols-2 gap-[20px] overflow-scroll
            items-start
            [&>fieldset>legend]:font-bs
            [&>fieldset>legend]:text-bs
            [&>fieldset>legend]:p-[4px]
            ">
                {/* <form className="flex flex-col gap-[20px]"> */}
                    
                    <ScheduleItem 
                        day="Sunday" isOff={sun.off}
                        shift={sun}
                        setShift={setSun}
                        onToggle={(e) => {
                            console.log(e.target.checked)
                            setSun({...sun, off: e.target.checked})
                        }}
                    />
                    <ScheduleItem 
                        day="Monday" isOff={mon.off}
                        shift={mon}
                        setShift={setMon}
                        onToggle={(e) => {
                            console.log(e.target.checked)
                            setMon({...mon, off: e.target.checked})
                        }}
                    />
                    <ScheduleItem 
                        day="Tuesday" isOff={tue.off}
                        shift={tue}
                        setShift={setTue}
                        onToggle={(e) => {
                            console.log(e.target.checked)
                            setTue({...tue, off: e.target.checked})
                        }}
                    />
                    <ScheduleItem
                        day="Wednesday" isOff={wed.off}
                        shift={wed}
                        setShift={setWed}
                        onToggle={(e) => {
                            console.log(e.target.checked)
                            setWed({...wed, off: e.target.checked})
                        }}
                    />
                    <ScheduleItem 
                        day="Thursday" 
                        shift={thu}
                        setShift={setThu}
                        onToggle={(e) => {
                            console.log(e.target.checked)
                            setThu({...thu, off: e.target.checked})
                        }}
                    />
                    <ScheduleItem 
                        day="Friday" 
                        shift={fri}
                        setShift={setFri}
                        onToggle={(e) => {
                            console.log(e.target.checked)
                            setFri({...fri, off: e.target.checked})
                        }}
                    />
                    <ScheduleItem 
                        day="Saturday" 
                        shift={sat}
                        setShift={setSat}
                        onToggle={(e) => {
                            console.log(e.target.checked)
                            setSat({...sat, off: e.target.checked})
                        }}
                    />
                {/* </form> */}
                
            </div>
        </div>

    );
}

function ScheduleItem({
    day, shift, setShift, onToggle
}) {
    let isOff = shift?.off ?? true

    function dateAndText(dateString) {
        let date = new Date(`2024-01-01 ${dateString ?? '25:00:00'}`)
        let text = ""

        if (!isNaN(date)) {
            // console.log("DT Date Str", dateString)
            // console.log("DT Date", date)
            text = format(date, 'hh:mm a')
        } else {
            date = new Date()
        }
        return [date, text]
    }
    let [startDate, startDateText] = dateAndText(shift?.start_at)
    let [endDate, endDateText] = dateAndText(shift?.end_at)


    // expected format <- 1970-01-01T10:00:00.000Z
    function getTimePart(iso = "") {
        return iso.split('T')[1]?.split('.')[0]
    }

    return (
        <fieldset className={`
        relative rounded-[6px] 
        border-neutral-100
        border p-[10px]
        ${isOff ? 'bg-background-1' : 'bg-background-0'}
        `}>
            <legend className="flex w-full items-center gap-[4px]">
                {day ?? ''}
                <div className="grow h-[0.5px] bg-neutral-100"/>
                <div>
                    <CheckBox label="Off-day" checked={isOff} onChange={(e) => {
                        console.log(e.target.checked)
                        setShift({...shift, off: e.target.checked})
                    }}/>
                </div>
            </legend>
            <section className="grid grid-cols-2 gap-[20px]">
                <DatePicker 
                    title="Start" type="time"
                    text={startDateText}
                    disabled={isOff}
                    date={startDate}
                    onDateSelect={(d) => {
                        setShift({ 
                            ...shift, 
                            start_at: getTimePart(d.toISOString())
                        })
                    }}
                />
                <DatePicker 
                    title="End" type="time"
                    text={endDateText}
                    date={endDate}
                    disabled={isOff}
                    onDateSelect={(d) => {
                        setShift({ 
                            ...shift, 
                            end_at: getTimePart(d.toISOString())
                        })
                    }}
                />
                <TextField 
                    title='Break (mins)' 
                    placeholder="0"
                    text={ Number(shift?.break_seconds) / 60 }
                    rightIcon='timer'
                    disabled={isOff}
                    onChange={e => {
                        let value = Number(e.target.value)
                        if (isNaN(value)) value = 0
                        setShift({
                            ...shift,
                            break_seconds: Math.min(value, 120) * 60
                        })
                    }}
                />
            </section>
            {/* <p className="
            m-auto 
            border rounded-[6px] border-dashed 
            px-[24px] py-[16px] 
            text-center
            ">Off day</p> */}
            {/* <section className="
            absolute left-[8px] right-[8px]
            top-[8px] bottom-[8px]
            flex flex-col items-center justify-center
            border-2 border-dashed
            rounded-[6px] bg-background-1 p-[10px]
            ">
                <p className="font-ts text-ts">Off-day</p>
            </section> */}
        </fieldset>
    )
}