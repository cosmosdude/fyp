import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import GhostButton from "../../components/Buttons/GhostButton";
import { usePushNoti } from "../../components/Noti/NotiSystem";
import { apiPaths, apiRoute, imageRoute } from "../../configs/api.config";
import { useAuthContext } from "../../hooks/AuthStateContext";
import useAllAttendanceRequests from "../../hooks/useAllAttendanceRequests";
import { capitalize } from "../../utils/capitalized";
import { format } from "../../utils/fast-date-fns";
import { fullname } from "../../utils/fullname";
import timeDisplayText from "../../utils/timeDisplayText";

export default function AttendanceRequestsPage() {
    let pushNoti = usePushNoti()
    let auth = useAuthContext()
    // let schedules = []
    // for (let i = 0; i < 10; i++) schedules.push({id: i})

    let [requests, setRequests] = useAllAttendanceRequests()

    async function respond(id, status) {
        let f = new FormData()
        f.set('status', status)
        try {
            let res = await fetch(apiRoute(apiPaths.attendance.respondRequest(id)), {
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
                setRequests(rs => rs.map(r => {
                    if (r.id !== id) return r
                    return {...r, status}
                }))
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
                <h1 className="text-neutral-900 text-tl font-tl">Attendance Requests</h1>
                <p className="text-neutral-900 text-bm font-bm">Attendance request made by employees are shown here.</p>
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
                            <th className="sticky left-0items-center">No.</th>
                            <th className="sticky left-0 text-left font-bm text-bm">Employee</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {/* <AttendanceRow /> */}
                        {requests.map((x, i) => <RequestRow 
                            key={i} no={i + 1}
                            request={x}
                            onApprove={() => {respond(x.id, 'approved')}}
                            onReject={() => {respond(x.id, 'rejected')}}
                        />)}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

function RequestRow({no, request, onApprove, onReject}) {
    let status = request.status
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
            <td className="sticky left-0 bg-white group-hover:bg-primary-50 text-left whitespace-nowrap">
                <div className="flex items-center gap-[10px]">
                    <Avatar className="" src={imageRoute(request.requester_avatar_path)} size={30} title="John Doe"/>
                    <div className="flex flex-col">
                        <p className="font-ll text-ll">{fullname(request.requester_first_name, request.requester_last_name)}</p>
                    </div>
                </div>
            </td>
            <td className="text-center font-ll text-ll whitespace-nowrap">
                {capitalize(request.type ?? "-")}
            </td>
            <td className="text-center font-ll text-ll whitespace-nowrap">
                {format(request.date, 'd MMM yyyy')}
            </td>
            <td className="text-center font-ll text-ll whitespace-nowrap">
                {timeDisplayText(request.time)}
            </td>
            <td className="items-center gap-[4px] text-center font-ll text-ll whitespace-nowrap">
                { status === 'pending' && <div className="flex items-center justify-center gap-[4px]">
                    <GhostButton className="!p-0" onClick={onApprove}>Approve</GhostButton> 
                    <p>/</p>
                    <GhostButton className="!p-0" style='danger' onClick={onReject}>Reject</GhostButton>
                </div>}
                {status !== 'pending' && <p>{capitalize(status)}</p>}
            </td>
        </tr>
        
    )
}