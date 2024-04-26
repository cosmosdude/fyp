import { useNavigate } from "react-router-dom";
import LucideIcon from "../../lib/LucideIcon";

function FilledButton({icon, rightIcon, src, children, onClick, to, disabled}) {
    let navigate = useNavigate()
    return ( 
        <button 
            className={`
                flex items-center gap-[10px]
                px-[16px] py-[10px]
                text-white text-bs font-bs
                ${disabled ? 'bg-neutral-200' :'bg-primary'}
                
                rounded-[4px]
                ${disabled ? '': 'hover:bg-primary-400'}
                transition-all
            `}
            disabled={disabled}
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

export default FilledButton;