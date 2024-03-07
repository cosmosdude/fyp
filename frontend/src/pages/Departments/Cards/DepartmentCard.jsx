import DepartmentIcon from '../../../assets/Icons/Departments/department.svg'

function DepartmentCard({title}) {
    return (
        <button className="
            flex items-center gap-[20px] p-[20px] 
            text-bm font-bm
            bg-background-1 rounded-[14px] 
            hover:opacity-25 transition-all">
            <img className="w-[18px] h-[18px]" src={DepartmentIcon}/>
            {title}
        </button>
    );
}

export default DepartmentCard;