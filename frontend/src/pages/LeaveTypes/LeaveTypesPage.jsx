import { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import GhostButton from "../../components/Buttons/GhostButton";
import { useAuthContext } from "../../hooks/AuthStateContext";
import useAllLeaveTypes from "../../hooks/useAllLeaveTypes";
import { useNavigate } from "react-router-dom";
import EmptyView from "../../components/EmptyView";
import { AlertActions, AlertBody, AlertButton, AlertDialog, AlertTitle } from "../../components/AlertDialog/AlertDialog";
import LucideIcon from "../../lib/LucideIcon";
import { apiPaths, apiRoute } from "../../configs/api.config";
import { usePushNoti } from "../../components/Noti/NotiSystem";

export default function LeaveTypesPage() {

    let navigate = useNavigate()
    let pushNoti = usePushNoti()

    let accessToken = useAuthContext()

    // let schedules = []
    // for (let i = 0; i < 12; i++) schedules.push({id: i})
    let allLeaves = useAllLeaveTypes()
    let [leaves, setLeaves] = useState([])
    useEffect(() => { setLeaves(allLeaves) }, [allLeaves])

    let [itemId, setItemId] = useState(null);

    async function deleteItem(id) {
        try {
            let res = await fetch(
                apiRoute(apiPaths.leave.system.delete(id)), 
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
                    message: `Leave type has been successfully deleted.`, 
                    style: "success"
                })
                setLeaves(leaves.filter(d => d.id !== id))
            } else {
                pushNoti({title: "Error", message: "Unable to delete leave type()", style: "danger"})
            }
        } catch (error) {
            pushNoti({title: "Error", message: `Unable to delete leave type ${error}`, style: "danger"})
        }
    }

    return (
        <>
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
                                    <th><div/></th>
                                </tr>
                            </thead>
                            <tbody className="
                            [&>*:last-child>*]:border-b-[1px]
                            [&>*:last-child>*:first-child]:rounded-bl-[6px]
                            [&>*:last-child>*:last-child]:rounded-br-[6px]
                            ">
                                {leaves.map((x, i) => <LeaveTypeRow 
                                    key={x.id} 
                                    no={i + 1}
                                    leave={x}
                                    name={x.name}
                                    initial={x.initial}
                                    gender={x.gender}
                                    max={x.max}
                                    halfday={x.halfday}
                                    carried={x.carried}
                                    earnable={x.earnable}
                                    onClick={() => {
                                        navigate(x.id)
                                    }}
                                    onDelete={e => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        setItemId(x.id)
                                    }}
                                />)}
                            </tbody>
                        </table>
                    </div>
                </div>

                {leaves.length === 0 && <EmptyView 
                    title="No Leaves Type" body="There are no leave type defined."
                    cta="Would you like to define leave type?"
                    onCta= {() => {
                        navigate("new")
                    }}
                />}
            </div>
        </div>
        <AlertDialog isOpen={itemId !== null}>
            <AlertTitle>Delete</AlertTitle>
            <AlertBody>Are you sure you wish to delete `{leaves.filter(x => x.id === itemId)[0]?.name ?? ""}`? This operation can't be undone.</AlertBody>
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

function LeaveTypeRow({no, leave, name, initial, gender, max, halfday, carried, earnable, onClick, onDelete}) {
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
        "
        onClick={onClick}
        >
            <td className="sticky left-0 text-center font-bs text-bs">
                {no ?? ''}
            </td>
            <td className="sticky left-0 bg-white group-hover:bg-primary-50 text-left">
                    <p className="font-bs text-bs">{name}</p>
            </td>
            <td className="text-center font-ll text-ll min-w-[150px]">
                {initial} day(s)
            </td>
            <td className="text-center font-ll text-ll min-w-[50px]">
                {gender}
            </td>
            <td className="items-center gap-[4px] text-center font-ll text-ll min-w-[100px]">
                {max} day(s)
            </td>
            <td className="text-center font-ll text-ll min-w-[150px]">
                {!!halfday ? 'Allowed' : 'Not Allowed'}
            </td>
            <td className="text-center font-ll text-ll min-w-[50px]">
                {!!carried ? 'Yes' : 'No'}
            </td>
            <td className="items-center gap-[4px] text-center font-ll text-ll min-w-[100px]">
                {!!earnable ? 'Yes' : 'No'}
            </td>
            <td className="font-ll text-ll whitespace-nowrap">
                <button className="my-auto text-danger-600 hover:opacity-25 transition-all" onClick={onDelete}>
                    <LucideIcon size={18} name="trash-2"/>
                </button>
            </td>
            {/* <td className="text-center font-ll text-ll">

            </td> */}
        </tr>
    )
}
