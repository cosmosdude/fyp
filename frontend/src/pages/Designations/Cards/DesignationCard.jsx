import Icon from '../../../assets/Icons/Designations/designation.svg'

function DesignationCard({title}) {
    return (
        <button className="
            flex items-center gap-[20px] p-[20px] 
            text-bm font-bm
            bg-background-1 rounded-[14px] 
            hover:opacity-25 transition-all">
            <img className="w-[18px] h-[18px]" src={Icon}/>
            {title}
        </button>
    );
}

export default DesignationCard;