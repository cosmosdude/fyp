import {noDataSVG} from '../assets/Assets'


function EmptyView({title, body, cta, onCta}) {
    return (
        <div className="p-[24px] flex flex-col mx-auto items-center justify-center gap-[10px]">
            <img src={noDataSVG} width={150} height={150}/>
            <h3 className="text-ts font-ts">{title ?? "No data"}</h3>
            <p className="text-ll font-ll">{body ?? "There are no data for now"}</p>
            {cta && <button className="text-bs font-bs text-primary-500 hover:opacity-25 transition-all" onClick={onCta}>
                {cta ?? "CTA"}
            </button>}
        </div>
    );
}

export default EmptyView;