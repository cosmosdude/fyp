function FilledButton({src, children, onClick}) {
    return ( 
        <button 
            className="
                flex items-center gap-[10px]
                px-[16px] py-[10px]
                text-white text-bs font-bs
                bg-primary-500 
                rounded-[4px]
            "
            onClick={onClick && onClick(e)}
        >
            {src && <img className="w-[18px] h-[18px]" src={src}/>}
            {children}
        </button>
    );
}

export default FilledButton;