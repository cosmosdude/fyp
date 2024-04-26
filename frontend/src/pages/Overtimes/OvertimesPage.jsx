import { format } from "date-fns";
import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import GhostButton from "../../components/Buttons/GhostButton";
import useAllOvertimeRequests from "../../hooks/useAllOvertimeRequests";
import { apiPaths, apiRoute, imageRoute } from "../../configs/api.config";
import { usePushNoti } from "../../components/Noti/NotiSystem";
import { useAuthContext } from "../../hooks/AuthStateContext";
import { capitalize } from "../../utils/capitalized";
import timeDisplayText from "../../utils/timeDisplayText";
import breakTimeDisplayText from "../../utils/breakTime";
import useMonthlyOvertimeStatistics from "../../hooks/useMonthlyOvertimeStatistics";
import { useEffect, useState } from "react";
import { fullname } from "../../utils/fullname";
import SearchBox from "../../components/SearchBox";

export default function OvertimesPage() {
    let auth = useAuthContext()
    let pushNoti = usePushNoti();
    // let schedules = []
    // for (let i = 0; i < 10; i++) schedules.push({id: i})

    let [overtimes, setOvertimes] = useAllOvertimeRequests()
    let statistic = useMonthlyOvertimeStatistics()
    console.log("Statistic", statistic)

    let [predicate, setPredicate] = useState("")
    let [filtered, setFiltered] = useState([])

    useEffect(() => {
        let text = predicate.toLowerCase()
        setFiltered(overtimes.filter(ot => {
            let name = fullname(ot.requester_first_name, ot.requester_last_name).toLowerCase()
            return name.includes(text);
        }))
    }, [overtimes, predicate])

    let [pending, setPending] = useState(0)
    let [approved, setApproved] = useState(0)
    let [rejected, setRejected] = useState(0)

    useEffect(() => {
        setPending(statistic?.statistic?.filter(x => x.status === 'pending')?.[0]?.count ?? 0)
        setApproved(statistic?.statistic?.filter(x => x.status === 'approved')?.[0]?.count ?? 0)
        setRejected(statistic?.statistic?.filter(x => x.status === 'rejected')?.[0]?.count ?? 0)
    }, [statistic])
/**
     * @param id overtime request id
     * @param status response status
    */
    async function respond(id, status) {
        let f = new FormData()
        f.set('status', status)
        try {
            let res = await fetch(apiRoute(apiPaths.overtime.respondToOvertimeRequest(id)), {
                method: 'PUT',
                headers: {
                    'authorization': `Bearer ${auth}`
                },
                body: f
            })

            if (res.status >= 200 && res.status < 300) {
                pushNoti({
                    title: "Success", 
                    message: `Request ${status} successfully`, 
                    style: "success"
                })
                setOvertimes(rs => rs.map(r => {
                    if (r.id !== id) return r
                    return {...r, status}
                }))

                setPending(x => x-1)
                if (status === 'approved') setApproved(x => x+1)
                if (status === 'rejected') setRejected(x => x+1)
            } else {
                pushNoti({
                    title: "Error", 
                    message: await res.text(), 
                    style: "danger"
                })
            }
        } catch (error) {
            pushNoti({
                title: "Error", 
                message: error.toString(),
                style: "danger"
            })
        }
    }

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Attendance" to='/attendances'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Requests" current/>
                </Breadcrumb>
                <div className="grow"/>
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Overtime</h1>
                <p className="text-neutral-900 text-bm font-bm">This month overtime information is shown here.</p>
            </div>
            <div className="flex w-full overflow-x-scroll p-[10px] shrink-0 gap-[20px]">                    
                <OvertimeCard 
                    title={statistic?.user_total ?? 0} subtitle="Overtimed Employees" 
                />
                <OvertimeCard title={breakTimeDisplayText(statistic?.month_total_sec ?? 0)} subtitle="Total Overtimed Hours" />
                <OvertimeCard title={pending} subtitle="Pending Requests" />
                <OvertimeCard title={approved} subtitle="Approved" />
                <OvertimeCard title={rejected} subtitle="Rejected" />
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Requests</h1>
                <p className="text-neutral-900 text-bm font-bm">Overtime request made by employee are shown here.</p>
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
            <div className="flex w-full border rounded-[6px]">
                <table className="table-auto min-w-full mx-auto border-separate border-spacing-0">
                    <thead className="sticky top-[0px] left-0 z-10">
                        <tr className="
                        [&>*]:px-[24px] [&>*]:py-[16px]
                        [&>*]:border-[0.5px] 
                        [&>*]:font-bm [&>*]:text-bm
                        [&>*]:bg-background-1
                        ">
                            <th className="sticky left-0items-center">No.</th>
                            <th className="sticky left-0 text-left font-bm text-bm">Employee</th>
                            <th>Date</th>
                            <th>Duration</th>
                            {/* <th>Off-in-lieu</th> */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {/* <AttendanceRow /> */}
                        {filtered.map( (x, i) => <RequestRow 
                            key={x.id} no={i + 1} 
                            overtime={x}
                            date={format(new Date(x.date), 'd MMM, yyyy')}
                            duration={x.duration_sec}
                            status={x.status}
                            onApprove={() => {respond(x.id, 'approved')}}
                            onReject={() => {respond(x.id, 'rejected')}}
                        />)}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

function RequestRow({no, overtime, date, duration, status, onApprove, onReject}) {
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
            <td className="sticky left-0 text-center font-bs text-bs">
                {no ?? ''}
            </td>
            <td className="sticky left-0 bg-white group-hover:bg-primary-50 text-left min-w-[200px]">
                <div className="flex items-center gap-[10px]">
                    <Avatar 
                        className="" 
                        src={imageRoute(overtime.requester_avatar_path)} size={30} 
                        title={fullname(overtime.requester_first_name, overtime.requester_last_name)}
                    />
                    <div className="flex flex-col">
                        <p className="font-ll text-ll">{fullname(overtime.requester_first_name, overtime.requester_last_name)}</p>
                    </div>
                </div>
            </td>
            <td className="text-center font-ll text-ll">
                {date}
            </td>
            <td className="text-center font-ll text-ll">
                {breakTimeDisplayText(duration)}
            </td>
            {/* <td className="text-center font-ll text-ll">
                -
            </td> */}
            <td className="items-center gap-[4px] text-center">
                {status === 'pending' && <div className="flex items-center justify-center gap-[6px]">
                    <GhostButton className="!p-[0px]" onClick={onApprove}>Approve</GhostButton> 
                    <p>/</p>
                    <GhostButton className="!p-[0px]" style='danger' onClick={onReject}>Reject</GhostButton>
                </div>}
                {status !== 'pending' && <p className={`
                    text-lm font-lm
                    ${status === 'approved' ? 'text-success-600': 'text-danger-600'}
                `}>{capitalize(status)}</p>}
            </td>
        </tr>
        
    )
}

function OvertimeCard({title, subtitle}) {
    title = (String(title).length > 0) ? title : "0"
    subtitle = subtitle ? subtitle : " "
    return (
        <div className="flex flex-col border rounded-[6px] px-[16px] py-[10px]">
            <h3 className="text-ts font-ts">{title ?? " "}</h3>
            <p className="text-ll font-ll">{subtitle ?? " "}</p>
        </div>
    )
}