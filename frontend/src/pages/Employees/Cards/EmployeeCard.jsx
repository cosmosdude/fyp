import Avatar from "../../../components/Avatar";

import { LucideCalendarDays } from "lucide-react";

function EmployeeCard() {
    return (
        <button 
            className="
            flex p-[20px] gap-[12px] 
             bg-background-1
            rounded-[14px] 
            hover:opacity-50 transition-all
            //overflow-hidden
            "
            onClick={e => {
                e.preventDefault()
                e.stopPropagation()
            }}
        >
            {/* <div className="w-[40px] h-[40px] p-[2px] rounded-full border-[2px] border-neutral-300">
                <img className="bg-neutral-200 rounded-full w-full h-full"/>
            </div> */}
            <div>
            <Avatar/>
            </div>
            
            
            <div className="grow flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[4px]">
                    <h4 className="font-bs text-bs text-left">Thwin Htoo Aung</h4>
                    <p className="font-ll text-ll text-left">Junior Software Developer of Software Development</p>
                </div>
                <div className="flex items-center gap-[4px] text-neutral-500">
                    {/* <img className="w-[18px] h-[18px]"/> */}
                    {/* <CalendarDays size={18} color="text-black"/> */}
                    <LucideCalendarDays size={18} strokeWidth={1.5}/>
                    <p className="font-ls text-ls text-left">Since June 2024</p>
                </div>
            </div>
        </button>
    );
}

export default EmployeeCard;