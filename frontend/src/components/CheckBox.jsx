import { forwardRef } from "react";
import LucideIcon from "../lib/LucideIcon";

const CheckBox = forwardRef(function({checked, label, name, onInput, onChange}, ref) {
    return (
        <div className="flex items-center gap-[10px]">
            <span className="relative flex">
                <input 
                    className="
                    peer
                    cursor-pointer
                    w-[18px] h-[18px] 
                    appearance-none 
                    border border-neutral-200
                    rounded-[3px] 
                    checked:border-primary-500
                    checked:bg-primary-500
                    transition-all
                    "
                    name={name} checked={checked} ref={ref}
                    type="checkbox" 
                    onInput={e => {onInput?.(e)}} onChange={e => {onChange?.(e)}}
                    />
                {/* <img className="absolute top-0 left-0 w-[18px] h-[18px]" /> */}
                <LucideIcon 
                    className="
                    absolute left-[1px] top-[1px] 
                    pointer-events-none
                    opaticy-0 peer-checked:opacity-100
                    transition-all
                    " 
                    name="check" 
                    size={16} 
                    color="#ffffff"
                />
            </span>
            
            { label && <label className="text-ll font-ll">{label}</label>}
        </div>
        
    );
})

export default CheckBox;