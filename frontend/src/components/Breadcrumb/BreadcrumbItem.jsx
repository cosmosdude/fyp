import { Link } from "react-router-dom";
import LucideIcon from "../../lib/LucideIcon";

function BreadcrumbItem({title, current, onClick, to}) {
    let hasAction = !!onClick || !!to
    return ( 
        <li 
            className={`
                p-[4px] 
                text-bs font-bs 
                ${current ? 'text-primary' : 'text-neutral-900'}
                ${hasAction && 'hover:opacity-25'}
                transition-all
            `}
        >
            {
                hasAction ? (
                    onClick ? <button>{title}</button> : <Link to={to}><TextOrIcon title={title} path={to}/></Link>
                ) : <p>{title}</p>
            }
            {/* { */}
        </li>
    );
}

function TextOrIcon({title, path}) {
    return <>
        {(title === 'Home' && path === '/') && <LucideIcon size={18} name="home"/>}
        {(title !== 'Home' && path !== '/') && <p>{title}</p>}
    </>
}

export default BreadcrumbItem;