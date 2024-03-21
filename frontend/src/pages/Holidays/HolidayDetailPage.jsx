import { forwardRef, useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import GhostButton from "../../components/Buttons/GhostButton";
import SelectBox from "../../components/SelectBox";
import TextField from "../../components/TextField";
import CheckBox from "../../components/CheckBox";
import DatePicker from "../../components/DatePicker";
import { useNavigate, useParams } from "react-router-dom";
import holidayService from "../../services/holiday";
import { useAuthContext } from "../../hooks/AuthStateContext";
import { format } from "date-fns";
import { usePushNoti } from "../../components/Noti/NotiSystem";

export default function HolidayDetailPage() {

    let navigate = useNavigate()
    let pushNoti = usePushNoti()

    let { id } = useParams()
    let type = id === 'new' ? 'new' : 'update'

    let auth = useAuthContext()
    let [holiday, setHoliday] = useState({name: '', date: null})

    useEffect(() => {
        let aborter = new AbortController()

        async function fetchData() {
            try {
                let res = await holidayService.get(auth, aborter.signal, id)

                if (res.status >= 200 && res.status < 300) {
                    let json = await res.json()
                    setHoliday(json)
                } else {
                    if (type !== 'new')
                        pushNoti({
                            title: "Error", 
                            message: "Unable to get holiday data.",
                            style: 'danger'
                        })
                }
            } catch (error) { 
                if (error.name !== 'AbortError') {
                    pushNoti({
                        title: "Error", 
                        message: "Unable to get holiday data.",
                        style: 'danger'
                    })
                }
            }
            
        }
        fetchData()
        return () => aborter.abort()
    }, [])

    function submit() {
        if (type === 'new') create()
        else update()
    }

    async function create() {
        console.log("Creating holiday")
        try {
            let res = await holidayService.create(auth, holiday.name, holiday.date)
            if (res.status >= 200 & res.status < 300) {
                console.log(await res.json())
                navigate("/holidays")
            }

            console.log(res)
        } catch(error) {
            console.log(error)
        }
    }

    async function update() {
        
        console.log("Updating holiday")
        try {
            let res = await holidayService.update(auth, id, holiday.name, holiday.date)
            if (res.status >= 200 & res.status < 300) {
                console.log(await res.json())
                pushNoti({
                    title: "Success", 
                    message: "Data updated successfully",
                    style: "success"
                })
            }
            console.log(res)
        } catch(error) {
            console.log(error)
        } 
        
    }

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center gap-[20px]">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Holidays" to='/holidays'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title={type === 'new' ? "New" : "Update"} current/>
                </Breadcrumb>
                <div className="grow"/>
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">New Holiday</h1>
                <p className="text-neutral-900 text-bm font-bm">Plan a new holiday.</p>
            </div>
            <div className="grid grid-cols-2">
                <div className="flex flex-col gap-[20px]">
                    
                    <section className="grid grid-cols-2 gap-[20px]">
                        <TextField 
                            title='Name (required)' 
                            placeholder="eg. Casual Leave"
                            text={holiday.name}
                            // disabled={type === 'detail'}
                            required
                            onChange={(e) => {
                                setHoliday({...holiday, name: e.target.value})
                            }}
                        />
                        <DatePicker 
                            title="Date" 
                            text={holiday.date ? format(holiday.date, 'd MMM yyyy') : ''}
                            date={holiday.date ? new Date(holiday.date) : null}
                            onDateSelect={(date, dateText) => {
                                setHoliday({...holiday, date: dateText})
                            }}
                            required
                        />
                    </section>
                    
                    <section className="grid grid-cols-2 gap-[20px]">
                        <FilledButton onClick={submit}>
                            {type === 'new' ?  "Create" : "Update"}
                        </FilledButton>
                    </section>
                </div>
                
            </div>
        </div>

    );
}
