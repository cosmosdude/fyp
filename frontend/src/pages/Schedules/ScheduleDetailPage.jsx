import { forwardRef, useReducer } from "react";
import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import GhostButton from "../../components/Buttons/GhostButton";
import SelectBox from "../../components/SelectBox";
import TextField from "../../components/TextField";
import CheckBox from "../../components/CheckBox";
import DatePicker from "../../components/DatePicker";

export default function ScheduleDetailPage() {

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center gap-[20px]">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Schedules" to='/schedules'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Update" current/>
                </Breadcrumb>
                <div className="grow"/>
                {/* <GhostButton to="settings" rightIcon='settings'>Leave Types</GhostButton> */}
                <FilledButton>Update</FilledButton>
            </div>
            
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Schedule Shift</h1>
                <p className="text-neutral-900 text-bm font-bm">Schedule weekly shift for an employee.</p>
            </div>

            {/* User */}
            <div className="flex items-center gap-[10px]">
                <Avatar size={40} title="A"/>
                <div className="flex flex-col">
                    <p className="font-ll text-ll">Admin</p>
                    <p className="font-ls text-ls">at Administration</p>
                </div>
            </div>

            <div className="
            grid grid-cols-2 gap-[20px] overflow-scroll
            items-start
            [&>fieldset>legend]:font-bs
            [&>fieldset>legend]:text-bs
            [&>fieldset>legend]:p-[4px]
            ">
                {/* <form className="flex flex-col gap-[20px]"> */}
                    
                    <ScheduleItem day="Sunday" isOff={true}/>
                    <ScheduleItem day="Monday" isOff={false}/>
                    <ScheduleItem day="Tuesday" isOff={false}/>
                    <ScheduleItem day="Wednesday" isOff={false}/>
                    <ScheduleItem day="Thursday" isOff={false}/>
                    <ScheduleItem day="Friday" isOff={false}/>
                    <ScheduleItem day="Saturday" isOff={false}/>
                {/* </form> */}
                
            </div>
        </div>

    );
}

function ScheduleItem({day, onToggle, isOff}) {
    return (
        <fieldset className={`
        relative rounded-[6px] 
        border-neutral-100
        border p-[10px]
        ${isOff ? 'bg-background-1' : 'bg-background-0'}
        `}>
            <legend className="flex w-full items-center gap-[4px]">
                {day ?? ''}
                <div className="grow h-[0.5px] bg-neutral-100"/>
                <div>
                    <CheckBox label="Off-day" checked={isOff} onInput={onToggle}/>
                </div>
            </legend>
            <section className="grid grid-cols-2 gap-[20px]">
                <DatePicker 
                    title="Start" type="time"
                    disabled={isOff}
                />
                <DatePicker 
                    title="End" type="time"
                    disabled={isOff}
                />
                <TextField 
                    title='Break (mins)' 
                    placeholder="0"
                    rightIcon='timer'
                    disabled={isOff}
                />
            </section>
            {/* <p className="
            m-auto 
            border rounded-[6px] border-dashed 
            px-[24px] py-[16px] 
            text-center
            ">Off day</p> */}
            {/* <section className="
            absolute left-[8px] right-[8px]
            top-[8px] bottom-[8px]
            flex flex-col items-center justify-center
            border-2 border-dashed
            rounded-[6px] bg-background-1 p-[10px]
            ">
                <p className="font-ts text-ts">Off-day</p>
            </section> */}
        </fieldset>
    )
}