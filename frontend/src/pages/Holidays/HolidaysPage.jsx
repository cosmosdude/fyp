import { format } from "date-fns";
import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import useEffectGetHolidays from "../../hooks/useEffectGetHolidays";
import { useNavigate } from "react-router-dom";
import EmptyView from "../../components/EmptyView";
import { AlertActions, AlertBody, AlertButton, AlertDialog, AlertTitle } from "../../components/AlertDialog/AlertDialog";
import { apiPaths, apiRoute } from "../../configs/api.config";
import { useEffect, useState } from "react";
import LucideIcon from "../../lib/LucideIcon";
import { usePushNoti } from "../../components/Noti/NotiSystem";
import { useAuthContext } from "../../hooks/AuthStateContext";

export default function HolidaysPage() {

    let navigate = useNavigate()
    let pushNoti = usePushNoti()
    let accessToken = useAuthContext()

    let _past = useEffectGetHolidays('past')
    let [past, setPast] = useState([])
    let _upcoming = useEffectGetHolidays('upcoming')
    let [upcoming, setUpcoming] = useState([])

    let [holidays, setHolidays] = useState([])

    useEffect(() => { 
        setPast(_past)
        setUpcoming(_upcoming)
        setHolidays([..._past, ..._upcoming])

    }, [_past, _upcoming])

    let [itemId, setItemId] = useState(null);

    async function deleteItem(id) {
        try {
            let res = await fetch(
                apiRoute(apiPaths.holiday.delete(id)), 
                {
                    method: "DELETE",
                    headers: { 
                        // 'content-type': "application/json",
                        'authorization': `Bearer ${accessToken}`
                    }
                }
            )

            if (res.status >= 200 && res.status < 300) {
                let text = await res.text()
                pushNoti({
                    title: "Deleted", 
                    message: `Holiday has been successfully deleted.`, 
                    style: "success"
                })
                setPast(past.filter(x => x.id !== itemId))
                setUpcoming(upcoming.filter(x => x.id !== itemId))
                //setLeaves(leaves.filter(d => d.id !== id))
            } else {
                pushNoti({title: "Error", message: "Unable to delete holiday", style: "danger"})
            }
        } catch (error) {
            pushNoti({title: "Error", message: `Unable to delete leave type ${error}`, style: "danger"})
        }
    }

    return (
        <>
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Holidays" current/>
                </Breadcrumb>
                <div className="grow"/>
                <FilledButton icon='plus' to='new'>Add Holiday</FilledButton>
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Holidays</h1>
                <p className="text-neutral-900 text-bm font-bm">Planned holidays are shown here.</p>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-[20px] overflow-hidden">
                <div className="flex flex-col gap-[10px] overflow-hidden ">
                    <h2 className="font-ts text-ts">Past</h2>
                    <HolidayTable>
                        <HolidayTableHeader/>
                        <tbody className="">
                            {/* <AttendanceRow /> */}
                            {past.map((x, i) => (
                                <HolidayRow 
                                    key={x.id} 
                                    no={i} 
                                    name={x.name}
                                    date={format(new Date(x.date), 'd MMM')} 
                                    day={format(new Date(x.date), 'EEE')}
                                    onClick={() => navigate(x.id)}
                                    onDelete={e =>{
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setItemId(x.id)
                                    }}
                                />
                            )
                            )}
                        </tbody>
                    </HolidayTable>
                    {past.length === 0 && <EmptyView 
                    title="No Past Holidays" body="There are no past holidays for now."
                    // cta="Would you like to define leave type?"
                    // onCta= {() => {
                    //     navigate("new")
                    // }}
                    />}
                </div>

                <div className="flex flex-col gap-[10px] overflow-hidden ">
                    <h2 className="font-ts text-ts">Upcoming</h2>
                    <HolidayTable>
                        <HolidayTableHeader/>
                        <tbody className="">
                            {/* <AttendanceRow /> */}
                            {upcoming.map((x, i) => (
                                <HolidayRow 
                                    key={x.id} 
                                    no={i} 
                                    name={x.name}
                                    date={format(new Date(x.date), 'd MMM')} 
                                    day={format(new Date(x.date), 'EEE')}
                                    onClick={() => navigate(x.id)}
                                    onDelete={e =>{
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setItemId(x.id)
                                    }}
                                />
                            )
                            )}
                        </tbody>
                    </HolidayTable>
                    {upcoming.length === 0 && <EmptyView 
                        title="No Upcoming Holidays" body="There are no upcoming holidays for now."
                        cta="Add Holiday"
                        onCta= {() => {
                            navigate("new")
                        }}
                    />}
                </div>
            </div>
        </div>
        <AlertDialog isOpen={itemId !== null}>
            <AlertTitle>Delete</AlertTitle>
            <AlertBody>Are you sure you wish to delete `{holidays.filter(x => x.id===itemId)[0]?.name ?? ""}`? This operation can't be undone.</AlertBody>
            <AlertActions>
                <AlertButton onClick={() => setItemId(null)}>
                    Dismiss
                </AlertButton>
                <AlertButton style="danger" onClick={() => {
                    deleteItem(itemId)
                    setItemId(null)
                }}>
                    Confirm
                </AlertButton>
            </AlertActions>
        </AlertDialog>
        </>
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
                <th></th>
            </tr>
        </thead>
    )
}

function HolidayRow({no, name, date, day, onClick, onDelete}) {
    return (
        <tr className="
        group
        [&>*]:px-[16px] [&>*]:py-[12px] 
        bg-background-0
        hover:bg-primary-50
        cursor-pointer
        transition-all
        [&>*]:transition-all
        "
        onClick={onClick}
        >
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
            <td className="font-ll text-ll whitespace-nowrap">
                <button className="my-auto text-danger-600 hover:opacity-25 transition-all" onClick={onDelete}>
                    <LucideIcon size={18} name="trash-2"/>
                </button>
            </td>
        </tr>
    )
}