import LucideIcon from "../../lib/LucideIcon";
import NotiCard from "./NotiCard";

function NotiStackView({notiState}) {
    let [notis, setNotis] = notiState
    console.log("pn", "Noti State is", notis)
    return (
        <div className="fixed z-[100] top-0 right-0 pb-[10px] flex flex-col gap-[0px] overflow-scroll max-h-screen">
            {notis.length > 1 && <button 
                className="
                flex gap-[10px] 
                ml-auto mt-[20px] mr-[20px] 
                px-[12px] py-[8px]
                rounded-[6px] border
                text-lm font-bold 
                bg-background-1
                hover:bg-background-2
                transition-all
                animate-slidein-rl
                "
                onClick={e => { setNotis([]) }}
            >Clear All <LucideIcon name="x" size={18}/> </button>}
            {notis.map((x, i) => {
                return <NotiCard 
                    key={x.id}
                    title={x.title} message={x.message} 
                    style={x.style}
                    onDismiss={() => {
                        setNotis(ns => ns.filter(n => n.id !== x.id))
                    }}
                />
            })}
        </div>
    );
}

export default NotiStackView;