import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import GhostButton from "../../components/Buttons/GhostButton";

export default function LeaveTypesPage() {

    let schedules = []
    for (let i = 0; i < 12; i++) schedules.push({id: i})

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center gap-[20px]">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Leaves" to='/leaves'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Leave Types" current/>
                </Breadcrumb>
                <div className="grow"/>
                {/* <GhostButton to="settings" rightIcon='settings'>Leave Types</GhostButton> */}
                <FilledButton to="new" rightIcon='arrow-right'>New Type</FilledButton>
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Leave Types</h1>
                <p className="text-neutral-900 text-bm font-bm">All leave types are listed here.</p>
            </div>
            <div className="flex flex-col gap-[20px] w-full rounded-[6px] overflow-y-scroll">

                {/* On Leave Table */}
                <div className="flex flex-col gap-[10px]">
                    <h3 className="text-ts font-ts">On Leave</h3>
                    <div className="flex flex-col w-full">
                        <table className="table-auto min-w-full mr-auto border-spacing-[0px] border-separate">
                            <thead className="sticky top-[0px] left-0 z-[1] !h-[0px]">
                                <tr className="
                                [&>*>*]:px-[24px] [&>*>*]:py-[16px]
                                [&>*]:border-[0.5px]
                                [&>*:first-child]:rounded-tl-[6px]
                                [&>*:last-child]:rounded-tr-[6px]
                                [&>*]:box-content
                                [&>*]:font-bm [&>*]:text-bm
                                [&>*]:overflow-hidden
                                [&>*]:bg-background-1
                                ">
                                    <th className="sticky left-0 items-center">
                                        <div>No.</div>
                                    </th>
                                    <th className="sticky left-0 text-left font-bm text-bm">
                                        <div>Name</div>
                                    </th>
                                    <th><div>Initial</div></th>
                                    <th><div>Gender</div></th>
                                    <th><div>Max</div></th>
                                    <th><div>Halfday</div></th>
                                    <th><div>Carried</div></th>
                                    <th><div>Earnable</div></th>
                                </tr>
                            </thead>
                            <tbody className="
                            [&>*:last-child>*]:border-b-[1px]
                            [&>*:last-child>*:first-child]:rounded-bl-[6px]
                            [&>*:last-child>*:last-child]:rounded-br-[6px]
                            ">
                                {schedules.map(x => <LeaveTypeRow key={x.id} no={x.id}/>)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
}

function LeaveTypeRow({no}) {
    return (
        <tr className="
        group
        [&>*]:px-[16px] [&>*]:py-[12px] 
        [&>*:first-child]:border-l-[1px]
        [&>*:last-child]:border-r-[1px]
        bg-background-0
        hover:bg-primary-50
        cursor-pointer
        transition-all
        [&>*]:transition-all
        ">
            <td className="sticky left-0 text-center font-bs text-bs">
                {no ?? ''}
            </td>
            <td className="sticky left-0 bg-white group-hover:bg-primary-50 text-left">
                    <p className="font-bs text-bs">Casual Leave</p>
            </td>
            <td className="text-center font-ll text-ll min-w-[150px]">
                60 days
            </td>
            <td className="text-center font-ll text-ll min-w-[50px]">
                Male
            </td>
            <td className="items-center gap-[4px] text-center font-ll text-ll min-w-[100px]">
                3 days
            </td>
            <td className="text-center font-ll text-ll min-w-[150px]">
                Allowed
            </td>
            <td className="text-center font-ll text-ll min-w-[50px]">
                Yes
            </td>
            <td className="items-center gap-[4px] text-center font-ll text-ll min-w-[100px]">
                Yes
            </td>
            {/* <td className="text-center font-ll text-ll">

            </td> */}
        </tr>
    )
}
