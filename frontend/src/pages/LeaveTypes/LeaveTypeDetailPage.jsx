import { forwardRef, useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import GhostButton from "../../components/Buttons/GhostButton";
import SelectBox from "../../components/SelectBox";
import TextField from "../../components/TextField";
import CheckBox from "../../components/CheckBox";
import { useNavigate, useParams } from "react-router-dom";
import { apiPaths, apiRoute } from "../../configs/api.config";
import runAsyncWithAborter from "../../utils/runAsyncWithAborter";
import { useAuthContext } from "../../hooks/AuthStateContext";
import { usePushNoti } from "../../components/Noti/NotiSystem";
import useAllLeaveTypes from "../../hooks/useAllLeaveTypes";

export default function LeaveTypeDetailPage() {
    let navigate = useNavigate()
    let { id } = useParams()
    let type = 'update'
    if (id === 'new') type = 'new'

    let pushNoti = usePushNoti()

    let auth = useAuthContext()
    let [leave, setLeave] = useState({
        name: "", initial: 0,
        max: 0, gender: "All",
        halfday: 0, carried: 0, 
        earnable: 0, enabled: 1
    })

    let leaves = useAllLeaveTypes()
    let offInLieu = leaves?.filter(x => x.earnable)?.[0]

    useEffect(() => {
        let aborter = runAsyncWithAborter(async aborter => {
            if (type === 'new') return
            
            let res = await fetch(apiRoute(apiPaths.leave.system.get(id)), {
                method: "GET",
                signal: aborter.signal,
                headers: {
                    'authorization': `Bearer ${auth}`
                }
            })

            if (res.status >= 200 && res.status < 300) {
                setLeave(await res.json())
                // pushNoti({title: "Success", message: "Data fetched."})
            }
        }, e => {
            if (e.name === "AbortError") return

            pushNoti({
                title: "Error", 
                message: "Failed to fetch leave data.", 
                style: "danger"
            })
        })
        return () => aborter.abort()
    }, [])

    function submit() {
        if (type === 'new') create()
        else update()
    }

    async function create() {
        // if (leave.earnable && offInLieu) {
        //     return pushNoti({
        //         title: "Error", 
        //         message: "Earnable leave already exists",
        //         style: "danger"
        //     })
        // }
        let f = new FormData()
        for(const [k,v] of Object.entries(leave)) {
            // console.log(k, v)
            f.set(k, v)
        }
        try {
            let res = await fetch(apiRoute(apiPaths.leave.system.create()), {
                method: 'POST',
                headers: {
                    'authorization': `Bearer ${auth}`
                },
                body: f
            })

            if (res.status >= 200 && res.status < 300) {
                pushNoti({title: "Success", message: "Leave successfully created", style: "success"})
                navigate(-1)
            }
        } catch (error) {
            pushNoti({
                title: "Error", 
                message: error.toString(),
                style: "danger"
            })
        }
    }

    async function update() {
        let f = new FormData()
        for(const [k,v] of Object.entries(leave)) {
            // console.log(k, v)
            f.set(k, v)
        }
        try {
            let res = await fetch(apiRoute(apiPaths.leave.system.update(id)), {
                method: 'PUT',
                headers: {
                    'authorization': `Bearer ${auth}`
                },
                body: f
            })

            if (res.status >= 200 && res.status < 300) {
                pushNoti({title: "Success", message: "Leave successfully updated", style: "success"})
            } else {
                pushNoti({title: "Error", message: await res.text(), style: "danger"})
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
            <div className="flex items-center gap-[20px]">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Leaves" to='/leaves'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Leave Types" to='/leaves/types'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title={type === 'new' ? 'New' : 'Update'} current/>
                </Breadcrumb>
                <div className="grow"/>
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">{type === 'new' ? 'New Leave': 'Update Leave'}</h1>
                <p className="text-neutral-900 text-bm font-bm">
                {type === 'new' 
                ? 'Create a new leave type.'
                : 'Update leave settings.'}
                </p>
            </div>
            <div className="grid grid-cols-2">
                <form 
                    className="flex flex-col gap-[20px]"
                    onSubmit={(e) => {
                        e.preventDefault()
                        submit()
                    }}
                    >
                    <TextField 
                        title='Name (required)' 
                        placeholder="eg. Casual Leave"
                        text={leave.name}
                        // disabled={type === 'detail'}
                        required
                        onChange={(e) => {
                            setLeave(x => ({...x, name: e.target.value}))
                        }}
                    />
                    <section className="grid grid-cols-2 gap-[20px]">
                        <TextField 
                            title='Initial (days)' 
                            placeholder="eg. Casual Leave"
                            text={leave.initial}
                            required
                            onChange={(e) => {
                                let value = e.target.value
                                if (!value) value = '0'
                                let int = parseInt(value)
                                if (isNaN(int) || int < 0) return
                                setLeave({...leave, initial: int})
                            }}
                        />
                        <TextField 
                            title='Max (days)' 
                            placeholder="eg. Casual Leave"
                            text={leave.max}
                            required
                            onChange={(e) => {
                                let value = e.target.value
                                if (!value) value = '0'
                                let int = parseInt(value)
                                if (isNaN(int) || int < 0) return
                                setLeave({...leave, max: int})
                            }}
                        />
                    </section>
                    <section className="grid grid-cols-1 gap-[20px]">
                        <SelectBox 
                            title='Gender' 
                            text={leave.gender}
                            // disabled={type === 'detail'}
                            selected={['All', 'Male', 'Female', 'Unspecified'].indexOf(leave.gender)}
                            required
                            disabled={leave.earnable}
                            options={['All', 'Male', 'Female', 'Unspecified']}
                            onSelect={(item) => {
                                setLeave({
                                    ...leave, 
                                    gender: item
                                })
                            }}
                        />
                    </section>

                    <section className="grid grid-cols-2 gap-[20px]">
                        <CheckBox 
                            label="Halfday allowed"
                            checked={!!leave.halfday}
                            onChange={e => {
                                setLeave({
                                    ...leave, 
                                    halfday: Number(e.target.checked)
                                })
                            }}
                        />
                        <CheckBox 
                            label="Carry Next Year"
                            checked={!!leave.carried}
                            onChange={e => {
                                setLeave({
                                    ...leave, 
                                    carried: Number(e.target.checked)
                                })
                            }}
                        />
                        {(!offInLieu || offInLieu?.id === leave?.id) && <CheckBox
                            label="Earnable"
                            checked={!!leave.earnable}
                            onChange={e => {
                                let isChecked = Number(e.target.checked)
                                setLeave({
                                    ...leave, 
                                    earnable: Number(e.target.checked),
                                    gender: isChecked ? "All" : leave.gender
                                })
                            }}
                        />}
                        {type !== 'new' && <CheckBox
                            label="Enabled"
                            checked={!!leave.enabled}
                            onChange={e => {
                                setLeave({
                                    ...leave, 
                                    enabled: Number(e.target.checked)
                                })
                            }}
                        />}
                        {/* <div className="flex items-center gap-[10px]">
                        </div> */}
                    </section>
                    <section className="grid grid-cols-2 gap-[20px]">
                        <FilledButton>
                            {type === 'new' ? "Create" : "Update"}
                        </FilledButton>
                    </section>
                </form>
                
            </div>
        </div>

    );
}
