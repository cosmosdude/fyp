import DepartmentIcon from '../../../assets/Icons/Departments/department.svg'

function DepartmentCard({title, onClick}) {
    return (
        <button className="
            flex items-center gap-[20px] p-[20px] 
            text-bm font-bm
            bg-background-0 rounded-[14px] 
            border border-neutral-100
            hover:opacity-25 transition-all"
            onClick={onClick}
        >
            <img className="w-[18px] h-[18px]" src={DepartmentIcon}/>
            {title}
        </button>
    );
}

export default DepartmentCard;