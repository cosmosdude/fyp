import LucideIcon from "../lib/LucideIcon";

function HoverInfo({children}) {
    return (
        <div className="group relative flex flex-col">
            <LucideIcon className="" name={"triangle-alert"} size={18}/>
            <div className="
                absolute left-0 top-full 
                flex invisible opacity-0 group-hover:visible group-hover:opacity-100
                z-[1] bg-white min-w-[300px] max-w-[300px]
                transition-all
                ">
                <div className="text-ll px-[10px] py-[4px] bg-bg-0 border rounded-[6px]">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default HoverInfo;