import Avatar from "../../../components/Avatar";

import { LucideCalendarDays } from "lucide-react";

function EmployeeCard({avatarSrc, title, subtitle, joinDate}) {
    subtitle = subtitle.trim()
    console.log("Subtitle", subtitle.length)
    return (
        <button 
            className="
            flex p-[20px] gap-[12px] 
             bg-background-0
            border rounded-[14px] 
            hover:opacity-50 transition-all
            // overflow-scroll
            "
            onClick={e => {
                e.preventDefault()
                e.stopPropagation()
            }}
        >
            <div className="">
                <Avatar title={title} src={avatarSrc}/>
            </div>
            
            <div className="flex flex-col gap-[4px] ">
                <div className="flex flex-col gap-[4px]">
                    <h4 className="font-bs text-bs text-left">{title}</h4>
                    {subtitle && <p className="font-ll text-ll text-left">{subtitle}</p>}
                </div>
                <div className="flex items-center gap-[4px] text-neutral-500 ">
                    {/* <img className="w-[18px] h-[18px]"/> */}
                    {/* <CalendarDays size={18} color="text-black"/> */}
                    <LucideCalendarDays size={18} strokeWidth={1.5}/>
                    <p className="font-ls text-ls text-left">{joinDate}</p>
                </div>
            </div>
        </button>
    );
}

export default EmployeeCard;