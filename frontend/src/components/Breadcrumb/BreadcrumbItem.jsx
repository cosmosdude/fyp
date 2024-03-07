import { Link } from "react-router-dom";

function BreadcrumbItem({title, current, onClick, to}) {
    let hasAction = !!onClick || !!to
    return ( 
        <li 
            className={`
                p-[4px] 
                text-bs font-bs 
                ${current ? 'text-primary-500' : 'text-neutral-900'}
                ${hasAction && 'hover:opacity-25'}
                transition-all
            `}
        >
            {
                hasAction ? (
                    onClick ? <button>{title}</button> : <Link to={to}>{title}</Link>
                ) : <p>{title}</p>
            }
            {/* { */}
        </li>
    );
}

export default BreadcrumbItem;