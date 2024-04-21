import LucideIcon from "../lib/LucideIcon";

function SearchBox({text, placeholder, onInput, onChange}) {
    return (
        <div className="
        flex p-[10px] 
        border border-border rounded-[4px] focus-within:border-primary
        gap-[10px]
        transition-all
        ">
            <LucideIcon size={18} name='search'/>
            <input 
                className="
                w-full h-full 
                bg-transparent outline-none
                font-ll text-ll
                "
                type="text"
                value={text}
                placeholder={placeholder}
                onInput={onInput}
                onChange={onChange}
            />
        </div>
    );
}

export default SearchBox;