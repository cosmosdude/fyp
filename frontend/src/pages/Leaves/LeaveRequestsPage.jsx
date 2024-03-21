import { useState } from "react";
import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import GhostButton from "../../components/Buttons/GhostButton";
import useAllLeaveRequests from "../../hooks/useAllLeaveRequests";
import { format } from "date-fns";
import { apiPaths, apiRoute } from "../../configs/api.config";
import { usePushNoti } from "../../components/Noti/NotiSystem";
import { useAuthContext } from "../../hooks/AuthStateContext";

export default function LeaveRequestsPage() {
    let pushNoti = usePushNoti()

    let auth = useAuthContext()

    let [requests, setRequests] = useAllLeaveRequests()

    /**
     * @param id leave request id
     * @param status response status
    */
    async function respond(id, status) {
        let f = new FormData()
        f.set('status', status)
        try {
            let res = await fetch(apiRoute(apiPaths.leave.user.respondToLeaveRequest(id)), {
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
                    <BreadcrumbItem title="Leaves" to='/leaves'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Requests" current/>
                </Breadcrumb>
                <div className="grow"/>
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Leave Requests</h1>
                <p className="text-neutral-900 text-bm font-bm">Leave requests are shown here.</p>
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
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {/* <AttendanceRow /> */}
                        {requests.map((x, i) => <RequestRow 
                            key={x.id} no={i+1}
                            requesterName={[
                                x.requester_first_name, 
                                x.requester_last_name ?? ""
                            ].join(' ')}
                            type={x.leave_name}
                            from={format(new Date(x.from_date), 'd MMM')}
                            to={format(new Date(x.to_date), 'd MMM')}
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

function RequestRow({no, requesterName, type, from, to, status, onApprove, onReject}) {
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
                    <Avatar className="" src={null} size={30} title={requesterName}/>
                    <div className="flex flex-col">
                        <p className="font-ll text-ll">{requesterName}</p>
                    </div>
                </div>
            </td>
            <td className="text-center font-ll text-ll min-w-[150px]">
                {type}
            </td>
            <td className="text-center font-ll text-ll min-w-[50px]">
                {from}
            </td>
            <td className="text-center font-ll text-ll min-w-[50px]">
                {to}
            </td>
            <td className="text-center font-ll text-ll min-w-[50px]">
                {status}
            </td>
            <td className="items-center gap-[4px] text-center font-ll text-ll min-w-[100px]">
                {status === 'pending' && <div className="flex flex-col justify-center gap-[4px]">
                    <GhostButton className="!p-[0px]" onClick={onApprove}>Approve</GhostButton> 
                    <GhostButton className="!p-[0px]" style='danger' onClick={onReject}>Reject</GhostButton>
                </div>}
                
            </td>
        </tr>
        
    )
}