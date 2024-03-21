import { useEffect } from "react";
import LucideIcon from "../../lib/LucideIcon";

function NotiCard({title, message, style = 'default', onDismiss}) {
    let bg = 'bg-background-0'
    let border = 'border-neutral-100'
    let fg = 'text-neutral-900'

    if (style === 'danger') {
        bg = 'bg-danger-100'
        border = 'border-danger-200'
        fg = 'text-danger-600'
    }

    if (style === 'success') {
        bg = 'bg-success-100'
        border = 'border-success-200'
        fg = 'text-success-700'
    }

    let timer
    const clearTimer = () => {
        clearTimeout(timer)
        timer = null
    }
    useEffect(() => {
        timer = setTimeout(() => {
            onDismiss()
        }, 5000)
        return () => clearTimer()
    }, [])

    return (
        <div className={`
            p-[10px] 
            flex items-start gap-[10px] 
            w-[375px]
            ${bg}
            border ${border} rounded-[6px]
            mt-[20px] mr-[20px]
            ${fg}
            shadow-md
            `}
        >
            <LucideIcon name="info" size={18}/>
            <div className="flex flex-col gap-[0px] grow">
                <h3 className="text-lm font-lm">{title ?? ' '}</h3>
                <p className="text-ls font-ls">{message ?? ' '}</p>
            </div>
            <button className="hover:opacity-25 transition-all" onClick={e => {
                clearTimer()
                onDismiss?.(e)
            }}>
                <LucideIcon name="x" size={18}/>
            </button>
        </div>
    );
}

export default NotiCard;