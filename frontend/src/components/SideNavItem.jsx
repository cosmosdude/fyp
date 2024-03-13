import { Link, useLocation } from "react-router-dom"

export default function SideNavItem({to, title, unselected, selected}) {


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
        <Link to={to} className={`flex gap-[20px] px-[16px] py-[12px] items-center ${bgColor} transition-all duration-300`}>
            <img 
                src={isCurrent ? selected : unselected}
                className="w-[30px] h-[30px]"
            />
            <h1 className={`text-bs font-bs text-primary ${tintColor} transition-all`}>{title}</h1>
        </Link>
    )
}