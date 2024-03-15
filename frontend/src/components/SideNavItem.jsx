
import { Link, useLocation } from "react-router-dom"
import LucideIcon from "../lib/LucideIcon"


export default function SideNavItem({to, title, icon}) {
    let {pathname} = useLocation()
    console.log('location', location)
    console.log('to', to)
    let isCurrent = false

    // if to is exactly /, match exactly as is
    if (to === '/')  isCurrent = pathname === to
    // otherwise, it is ok if a path starts with value
    else isCurrent = pathname.startsWith(to)

    let bgColor = !isCurrent 
    ? 'hover:bg-primary-50'
    : 'bg-primary'

    let tintColor = !isCurrent 
    ? 'text-primary'
    : 'text-white'

    return (
        <Link 
            to={to} 
            className={`
            flex items-center gap-[20px] 
            px-[16px] py-[12px] 
            rounded-[6px]  
            ${bgColor} 
            text-primary ${tintColor} 
            transition-all duration-300
            `}
        >
            <LucideIcon name={icon}/>
            <h1 className={`text-bs font-bs  transition-all`}>{title}</h1>
        </Link>
    )
}