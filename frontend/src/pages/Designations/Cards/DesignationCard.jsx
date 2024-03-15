import Icon from '../../../assets/Icons/Designations/designation.svg'

function DesignationCard({title, onClick}) {
    return (
        <button className="
            flex items-center gap-[20px] p-[20px] 
            text-bm font-bm
            bg-background-0 rounded-[6px] 
            border border-neutral-100
            hover:opacity-25 transition-all"
            onClick={onClick}
        >
            <img className="w-[18px] h-[18px]" src={Icon}/>
            {title}
        </button>
    );
}

export default DesignationCard;