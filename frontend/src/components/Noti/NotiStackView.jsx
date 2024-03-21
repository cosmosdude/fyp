import NotiCard from "./NotiCard";

function NotiStackView({notiState}) {
    let [notis, setNotis] = notiState
    console.log("pn", "Noti State is", notis)
    return (
        <div className="fixed z-[1] top-0 right-0 flex flex-col gap-[0px]">
            {/* <NotiCard title="Title" message="Message" style="default"/>
            <NotiCard title="Title" message="Message" style="danger"/>
            <NotiCard title="Title" message="Message" style="success"/> */}
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