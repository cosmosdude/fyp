import NotiCard from "./NotiCard";

function NotiStackView({notiState}) {
    let [notis, setNotis] = notiState
    console.log("pn", "Noti State is", notis)
    return (
        <div className="fixed z-[100] top-0 right-0 pb-[10px] flex flex-col gap-[0px] overflow-scroll max-h-screen">
            {notis.length > 1 && <button 
                className="ml-auto mt-[20px] mr-[20px] rounded-full text-lm font-bold bg-background-1 border px-[24px] py-[8px]"
                onClick={e => { setNotis([]) }}
            >Clear All</button>}
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