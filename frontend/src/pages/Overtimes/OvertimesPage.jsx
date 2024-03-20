import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import GhostButton from "../../components/Buttons/GhostButton";

export default function OvertimesPage() {

    let schedules = []
    for (let i = 0; i < 10; i++) schedules.push({id: i})

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
                <OvertimeCard title="10" subtitle="Overtimed Employees" />
                <OvertimeCard title="6 hr" subtitle="Total Overtimed Hours" />
                <OvertimeCard title="8 days" subtitle="Total Off-in-lieu given" />
                <OvertimeCard title="14" subtitle="Pending Requests" />
                <OvertimeCard title="6" subtitle="Rejected" />
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Requests</h1>
                <p className="text-neutral-900 text-bm font-bm">Overtime request made by employee are shown here.</p>
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
                            <th>Off-in-lieu</th>
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
            <td className="text-center font-ll text-ll">
                2 Jan 2024
            </td>
            <td className="text-center font-ll text-ll">
                2 hr
            </td>
            <td className="text-center font-ll text-ll">
                -
            </td>
            <td className="items-center gap-[4px] text-center">
                <div className="flex flex-col items-center justify-center gap-[2px]">
                    <GhostButton className="py-[0px]">Approve</GhostButton> 
                    <GhostButton className="py-[0px]" style='danger'>Reject</GhostButton>
                </div>
            </td>
        </tr>
        
    )
}

function OvertimeCard({title, subtitle}) {
    return (
        <div className="flex flex-col border rounded-[6px] px-[16px] py-[10px]">
            <h3 className="text-ts font-ts">{title ?? " "}</h3>
            <p className="text-ll font-ll">{subtitle ?? " "}</p>
        </div>
    )
}