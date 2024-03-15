import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";

function SchedulesPage() {

    let schedules = []
    for (let i = 0; i < 1000; i++) schedules.push({id: i})

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
                <h1 className="text-neutral-900 text-tl font-tl">Shifts</h1>
                <p className="text-neutral-900 text-bm font-bm">Weekly shifts of all employees are shown here.</p>
            </div>
            <div className="block overflow-scroll w-full border rounded-[6px]">
                <table className="table-auto mx-auto border-separate border-spacing-0">
                    <thead className="sticky top-[0px] left-0 z-10">
                        <tr className="
                        [&>*]:px-[24px] [&>*]:py-[16px]
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
                        {schedules.map(x => <ScheduleRow key={x.id} no={x.id}/>)}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

function ScheduleRow({no}) {
    return (
        <tr className="
        group
        [&>*]:px-[16px] [&>*]:py-[16px] 
        bg-background-0
        hover:bg-primary-50
        cursor-pointer
        transition-all
        [&>*]:transition-all
        ">
            <td className="sticky left-0 text-center font-bs text-bs min-w-[35px]">
                {no ?? ''}
            </td>
            <td className="sticky left-0 flex gap-[10px] items-center bg-white group-hover:bg-primary-50 text-left min-w-[300px]">
                <Avatar className="" src={null} size={30} title="John Doe"/>
                <div className="flex flex-col">
                    <p className="font-ll text-ll">Admin</p>
                    <p className="font-ls text-ls">admin@yopmail.com</p>
                </div>
                
            </td>
            <td className="text-center font-bs text-bs min-w-[250px]">
                9:00 AM to 6:00 PM
            </td>
            <td className="text-center font-bs text-bs min-w-[250px]">
                9:00 AM to 6:00 PM
            </td>
            <td className="text-center font-bs text-bs min-w-[250px]">
                9:00 AM to 6:00 PM
            </td>
            <td className="text-center font-bs text-bs min-w-[250px]">
                9:00 AM to 6:00 PM
            </td>
            <td className="text-center font-bs text-bs min-w-[250px]">
                9:00 AM to 6:00 PM
            </td>
            <td className="text-center font-bs text-bs min-w-[250px]">
                9:00 AM to 6:00 PM
            </td>
            <td className="text-center font-bs text-bs min-w-[250px]">
                9:00 AM to 6:00 PM
            </td>
        </tr>
    )
}

export default SchedulesPage;