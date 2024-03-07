function EmployeeCard() {
    return (
        <button 
            className="
            flex flex-col p-[20px] gap-[10px] 
             bg-background-1
            rounded-[14px] 
            hover:opacity-50 transition-all
        ">
            <div className="w-[50px] h-[50px] p-[2px] rounded-full border-[2px] border-neutral-300">
                <img className="bg-neutral-200 rounded-full w-full h-full"/>
            </div>
            
            <div className="grow flex flex-col gap-[10px]">
                <div className="flex flex-col gap-[0px]">
                    <h4 className="font-bm text-bm text-left">Thwin Htoo Aung</h4>
                    <p className="font-bs text-bs text-left">admin@yopmail.com</p>
                </div>
                <div className="flex items-center gap-[10px]">
                    <img className="w-[18px] h-[18px]"/>
                    <p className="font-ll text-ll text-left">0123456789</p>
                </div>
                <div className="flex items-center gap-[10px]">
                    <img className="w-[18px] h-[18px]"/>
                    <p className="font-ll text-ll text-left">0123456789</p>
                </div>
                <div className="flex items-center gap-[10px]">
                    <img className="w-[18px] h-[18px]"/>
                    <p className="font-ll text-ll text-left">0123456789</p>
                </div>
            </div>
        </button>
    );
}

export default EmployeeCard;