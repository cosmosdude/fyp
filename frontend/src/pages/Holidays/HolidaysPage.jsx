import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";

export default function HolidaysPage() {

    let past = [
        {name: `New Year's Day`, date:`Jan 1`, day: `Mon`,},
        {name: `Independence Day`, date:`Jan 4`, day: `Thu`,},
        {name: `Kayin New Year`, date:`Jan 11`, day: `Thu`,},
        {name: `Union Day`, date:`Feb 12`, day: `Mon`,},
        {name: `Peasant's Day`, date:`Mar 2`, day: `Sat`,},
    ].map((x, i) => {return {id: i, ...x}})
    /*
    
    */
    let upcoming = []
    // for (let i = 0; i < 15; i++) {
    //     if (i < 6) past.push({id: i})
    //     upcoming.push({id: i})
    // }

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Attendance" current/>
                </Breadcrumb>
                <div className="grow"/>
                {/* <FilledButton icon='plus' to='new'>New Employee</FilledButton> */}
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Attendance</h1>
                <p className="text-neutral-900 text-bm font-bm">All attendance records are shown here.</p>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-[20px] overflow-hidden">
                <div className="flex flex-col gap-[10px] overflow-hidden ">
                    <h2 className="font-ts text-ts">Past</h2>
                    <HolidayTable>
                        <HolidayTableHeader/>
                        <tbody className="">
                            {/* <AttendanceRow /> */}
                            {past.map(x => (
                                <HolidayRow key={x.id} no={x.id} name={x.name} date={x.date} day={x.day}/>
                            )
                            )}
                        </tbody>
                    </HolidayTable>
                </div>

                <div className="flex flex-col gap-[10px] overflow-hidden ">
                    <h2 className="font-ts text-ts">Upcoming</h2>
                    <HolidayTable>
                        <HolidayTableHeader/>
                        <tbody className="">
                            {/* <AttendanceRow /> */}
                            {upcoming.map(x => (
                                <HolidayRow key={x.id} no={x.id} name={x.name} date={x.date} day={x.day}/>
                            )
                            )}
                        </tbody>
                    </HolidayTable>
                </div>
            </div>
        </div>

    );
}

function HolidayTable({children}) {
    children = children ?? []
    return (
        <div className="overflow-hidden md:overflow-scroll w-full border rounded-[6px]">
            <table className="table-auto min-w-full mx-auto border-separate border-spacing-0">
                {children}
            </table>
        </div>
    )
}

function HolidayTableHeader() {
    return (
        <thead className="sticky top-[0px] left-0 z-10">
            <tr className="
            [&>*]:px-[24px] [&>*]:py-[16px]
            [&>*]:border-[0.5px] 
            [&>*]:font-bm [&>*]:text-bm
            [&>*]:bg-background-1
            ">
                <th className="min-w-[75px] max-w-[75px]">No.</th>
                <th className="text-left font-bm text-bm">Name</th>
                <th className="min-w-[125px] max-w-[130px]">Date</th>
                <th>Day</th>
            </tr>
        </thead>
    )
}

function HolidayRow({no, name, date, day}) {
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
            <td className="text-center font-ls text-ls">
                {no ?? ''}
            </td>
            <td className="text-left font-bs text-bs">
                {name}
                {/* Thingyan lkasjdf kljaskldjf klasjdklfj aklsdfkljklasdfkl */}
            </td>
            <td className="text-center font-ll text-ll">
                {date}
                {/* 13 April, 2024 */}
            </td>
            <td className="text-center font-ll text-ll">
                {day}
                {/* Sun */}
            </td>
        </tr>
    )
}