import { useNavigate } from "react-router-dom";
import LucideIcon from "../../lib/LucideIcon";

export default function GhostButton({
    className, style,
    icon, rightIcon, src, children, onClick, to
}) {
    let navigate = useNavigate()

    let textColor = 'text-primary'
    if (style == 'danger') textColor = 'text-danger-500'

    return ( 
        <button 
            className={`
                flex items-center gap-[10px]
                px-[16px] py-[10px]
                text-bs font-bs
                ${textColor} 
                rounded-[4px]
                hover:${textColor}/25
                transition-all
                ${className}
            `}
            onClick={(e) => {
                onClick && onClick(e)
                if (to) {
                    e.preventDefault()
                    navigate(to)
                }
            }}
        >
            {src && <img className="w-[18px] h-[18px]" src={src}/>}
            {icon && <LucideIcon name={icon} size={18} strokeWidth={2}/>}
            <div className="grow text-center">{children}</div>
            {rightIcon && <LucideIcon name={rightIcon} size={18} strokeWidth={2}/>}
        </button>
    );
}