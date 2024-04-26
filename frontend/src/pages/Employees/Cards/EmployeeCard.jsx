import Avatar from "../../../components/Avatar";

import { LucideCalendarDays } from "lucide-react";

function EmployeeCard({avatarSrc, id, me, emp, title, subtitle, status, joinDate, onClick}) {
    subtitle = subtitle.trim()
    // console.log("Subtitle", subtitle.length)

    let isNotActive = status !== 'active'
    let isYou = (!!me?.id && id === me?.id)
    let isMissingContract = !emp.employment_agreement_filename
    return (
        <button 
            className="
            flex p-[20px] gap-[12px] 
             bg-background-0
            border rounded-[6px] 
            hover:opacity-50 transition-all
            
            "
            onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                onClick?.()
            }}
        >
            <div className="">
                <Avatar title={title} src={avatarSrc}/>
            </div>
            
            <div className="flex flex-col gap-[4px] ">
                { (isYou || isNotActive || isMissingContract) &&<div className="flex gap-[10px]">
                    {isYou && <span className="ml-[0px] px-[4px] py-[2px] bg-background-3 text-ls font-ls">You</span>}
                    {isNotActive && <p className="px-[4px] py-[2px] ont-lm text-lm text-left text-white bg-danger-500">Terminated</p>}
                    {isMissingContract && <p className="px-[4px] py-[2px] ont-lm text-lm text-left text-warning-900 bg-warning-500 animate-pulse">
                        Employment Contract
                    </p>}
                </div>}
                <div className="flex flex-col gap-[4px]">
                    <p className="font-bs text-bs text-left">
                        {title} 
                    </p>
                    
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