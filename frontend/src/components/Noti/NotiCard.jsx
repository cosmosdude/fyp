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

    let timer = null;
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
            p-[20px] 
            flex items-start gap-[10px] 
            w-[375px]
            ${bg}
            border ${border} rounded-[0px]
            mt-[20px] mx-[20px]
            ${fg}
            shadow-md
            animate-slidein-rl
            `}
        >
            <LucideIcon name="info" size={18}/>
            <div className="flex flex-col gap-[0px] grow">
                <h3 className="text-lm font-lm">{title ?? ' '}</h3>
                <p className="text-ls font-ls">{message ?? ' '}</p>
                <div className="mt-[5px] h-[5px] w-full bg-neutral-900/10 rounded-full animate-wshrink"/>
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