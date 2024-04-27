import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import GhostButton from "../../components/Buttons/GhostButton";
import EmptyView from "../../components/EmptyView";
import { imageRoute } from "../../configs/api.config";
import useAllUsersOnLeave from "../../hooks/useAllUsersOnLeave";
import { capitalize } from "../../utils/capitalized";
import { format } from "../../utils/fast-date-fns";
import { fullname } from "../../utils/fullname";
import { position } from "../../utils/position";
import timeDisplayText from "../../utils/timeDisplayText";

export default function LeavesPage() {

    let schedules = []
    for (let i = 0; i < 100; i++) schedules.push({id: i})

    let users = useAllUsersOnLeave()

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center gap-[20px]">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Leaves" current/>
                </Breadcrumb>
                <div className="grow"/>
                <GhostButton to="types" rightIcon='settings'>Leave Types</GhostButton>
                <FilledButton to="requests" rightIcon='arrow-right'>Requests</FilledButton>
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Leaves</h1>
                <p className="text-neutral-900 text-bm font-bm">Daily leave information are shown here.</p>
            </div>
            <div className="flex flex-col gap-[20px] w-full rounded-[6px] overflow-y-scroll">

                {/* On Leave Table */}
                <div className="flex flex-col gap-[10px]">
                    <h3 className="text-ts font-ts">On Leave</h3>
                    <div className="flex flex-col w-full ">
                        <table className="table-auto min-w-full mx-auto border-spacing-[0px] border-separate">
                            <thead className="sticky top-[0px] left-0 z-[1] border rounded-tr-[6px]">
                                <tr className="
                                [&>*]:px-[8px] [&>*]:py-[16px]
                                [&>*]:border-[0.5px]
                                [&>*:first-child]:rounded-tl-[6px]
                                [&>*:last-child]:rounded-tr-[6px]
                                [&>*]:box-content
                                [&>*]:font-bm [&>*]:text-bm
                                [&>*]:overflow-hidden
                                [&>*]:bg-background-1
                                ">
                                    <th className="sticky left-0 items-center">No.</th>
                                    <th className="sticky left-0 text-left font-bm text-bm">Employee</th>
                                    <th>Type</th>
                                    <th>From</th>
                                    <th>To</th>
                                    {/* <th></th> */}
                                </tr>
                            </thead>
                            <tbody className="
                            [&>*:last-child>*]:border-b-[1px]
                            [&>*:last-child>*:first-child]:rounded-bl-[6px]
                            [&>*:last-child>*:last-child]:rounded-br-[6px]
                            ">
                                {/* <LeaveRow /> */}
                                {users.map((x, i) => <LeaveRow 
                                    key={i} no={i + 1}
                                    user={x}
                                />)}
                            </tbody>
                        </table>
                    </div>
                </div>

                {users.length === 0 && <EmptyView title="No Leaves Taken" body="No one is on leave for now"/>}
            </div>
        </div>

    );
}

function LeaveRow({no, user}) {
    let from = new Date(user.from_date)
    let to = new Date(user.to_date)
    return (
        <tr className="
        group
        [&>*]:px-[16px] [&>*]:py-[8px] 
        [&>*:first-child]:border-l-[1px]
        [&>*:last-child]:border-r-[1px]
        bg-background-0
        //hover:bg-primary-50
        //cursor-pointer
        transition-all
        [&>*]:transition-all
        ">
            <td className="sticky left-0 text-center font-bs text-bs">
                {no ?? ''}
            </td>
            <td className="sticky left-0 bg-white group-hover:bg-primary-50 text-left whitespace-nowrap">
                <div className="flex items-center gap-[10px]">
                    <Avatar 
                        className="" src={imageRoute(user.avatar_path)} size={30} 
                        title={fullname(user.first_name, user.last_name)}
                    />
                    <div className="flex flex-col">
                        <p className="font-ll text-ll">{fullname(user.first_name, user.last_name)}</p>
                        <p className="font-ls text-ls">{position(user.designation_name, user.department_name)}</p>
                    </div>
                </div>
            </td>
            <td className="text-center font-bs text-bs whitespace-nowrap">
                {capitalize(user.leave_name)}
            </td>
            <td className="text-center font-ll text-ll whitespace-nowrap">
                {format(from, 'd MMM yyyy')}
            </td>
            <td className="items-center gap-[4px] text-center font-ll text-ll whitespace-nowrap">
                {format(to, 'd MMM yyyy')}
            </td>
            {/* <td className="text-center font-ll text-ll">

            </td> */}
        </tr>
    )
}
