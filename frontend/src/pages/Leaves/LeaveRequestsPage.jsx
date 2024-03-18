import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import GhostButton from "../../components/Buttons/GhostButton";

export default function LeaveRequestsPage() {

    let schedules = []
    for (let i = 0; i < 10; i++) schedules.push({id: i})

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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {/* <AttendanceRow /> */}
                        {schedules.map(x => <RequestRow key={x.id} no={x.id}/>)}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

function RequestRow({no}) {
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
                    <Avatar className="" src={null} size={30} title="John Doe"/>
                    <div className="flex flex-col">
                        <p className="font-ll text-ll">Admin</p>
                    </div>
                </div>
            </td>
            <td className="text-center font-ll text-ll min-w-[150px]">
                Casual
            </td>
            <td className="text-center font-ll text-ll min-w-[50px]">
                2 Jan, 2024
            </td>
            <td className="text-center font-ll text-ll min-w-[50px]">
                7 Jan, 2024
            </td>
            <td className="items-center gap-[4px] text-center font-ll text-ll min-w-[100px]">
                <div className="flex justify-center gap-[10px]">
                    <GhostButton clas>Approve</GhostButton> 
                    <GhostButton style='danger'>Reject</GhostButton>
                </div>
            </td>
        </tr>
        
    )
}