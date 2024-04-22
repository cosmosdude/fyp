export function AlertDialog({children, isOpen}) {
    return (
        <>
        {isOpen && <div className="
        fixed z-[100000] top-0 left-0 w-full h-full 
        bg-black/50
        flex
        ">
            <div 
                className="
                mx-auto mt-[100px] mb-auto
                min-w-[300px] max-w-[375px] 
                px-[20px] py-[20px]
                bg-white
                rounded-[4px]
                flex flex-col gap-[10px]
                "
            >
                {children}
            </div>
        </div>}
        </>
    );
}

export function AlertTitle({children}) {
    return (
        <h3 className={`text-ts font-ts text-neutral-900 text-center`}>
            {children}
        </h3>
    )
}

export function AlertBody({children}) {
    return (
        <p className="text-ll font-ll text-neutral-700 text-center">
            {children}
        </p>
    )
}

export function AlertActions({children}) {
    return (
        <div className="flex gap-[20px] mx-auto">
            {children}
        </div>
    )
}

export function AlertButton({children, onClick, style='default'}) {
    return (
        <button 
            className={`
            hover:opacity-25 transition-all
            text-bs font-bs
            ${style === 'danger' ? 'text-danger-600' : 'text-neutral-700'}
            `}
            onClick={onClick}
        >{children}</button>
    )
}