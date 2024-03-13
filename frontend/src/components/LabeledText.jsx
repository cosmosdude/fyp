function LabeledText({title, value}) {
    return (
        <div className="flex flex-col gap-[0px]">
            <p className="font-bs text-lm text-neutral-900">{title}</p>
            <div 
                className={`
                flex items-center gap-[10px] 
                min-h-[41px] 
                transition-all
                `}
            >
                {value}
            </div>
        </div>
    );
}

export default LabeledText;