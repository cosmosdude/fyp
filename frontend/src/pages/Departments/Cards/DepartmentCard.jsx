import DepartmentIcon from '../../../assets/Icons/Departments/department.svg'
import LucideIcon from '../../../lib/LucideIcon';

function DepartmentCard({title, onClick, onDelete}) {
    return (
        <div className="
            flex items-center gap-[20px] p-[20px] 
            text-bm font-bm
            bg-background-0 rounded-[6px] 
            border border-neutral-100
            "
            onClick={onClick}
        >
            <div className="flex grow gap-[20px] hover:opacity-25 transition-all">
                <img className="w-[18px] h-[18px]" src={DepartmentIcon}/>
                <p className="grow text-left">{title}</p>
            </div>
            
            <button 
                className='text-danger-500 hover:opacity-25 transition-all'
                onClick={e => {
                    e.stopPropagation()
                    e.preventDefault()
                    onDelete?.()
                }}
            >
                <LucideIcon size={18} name="trash-2"/>
            </button> 
        </div>
    );
}

export default DepartmentCard;