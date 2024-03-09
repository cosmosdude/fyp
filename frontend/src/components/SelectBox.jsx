import { useState } from 'react';
import Icon from '../assets/Icons/chevron-down.svg'

function SelectBox({
    title, placeholder, error, 
    text = undefined,
    options,
    disabled,
    leftImageSrc,
    selected, onSelect,
}) {
    if (!options) options = []
    console.log()
    let [show, setShow] = useState(false)

    function isIndexSelected(index) {
        // if given selected is set, fast search it
        if (selected instanceof Set) return selected.has(index)
        // if given selected is array, linear search it
        if (Array.isArray(selected)) return selected.includes(index)
        // if normal, just check if two are equal
        return selected === index
    }

    return (
        <div className="relative flex flex-col gap-[4px]">
            { !!title && <p className="font-bs text-lm text-neutral-900">{title}</p> }

            {/* Textfield like area */}
            <button 
                className={`
                flex items-center gap-[10px] 
                px-[10px] h-[41px] 
                rounded-[4px] 
                ${ show ? 'border-[2px]' : 'border'}
                ${ show ? 'border-primary-500' : error ? 'border-danger-300' : 'border-neutral-200'} 
                ${ !disabled && 'hover:bg-primary-50'}
                ${ disabled ? 'bg-background-1' : ''}
                transition-all
                `}
                disabled={disabled}
                onClick={(e) => {
                    e.preventDefault()
                    setShow(x => !x)
                }}
                onFocus={undefined}
            >
                {/* Left Image */}
                {!!leftImageSrc && <img className="w-[18px] h-[18px]" src={leftImageSrc}/>}
                <label 
                    className={` 
                    grow
                    text-left 
                    ${text ? 'text-neutral-900': 'text-neutral-300'}
                    pointer-events-none
                    `}
                >{text ? text : (placeholder || " ")}</label>
                <img className="w-[18px] h-[18px]" src={Icon}/>
            </button>
            { !!error && <p className="text-danger-400">{error}</p> }

            <div
                className={`
                absolute 
                left-0 top-full
                pt-[5px]
                z-50
                ${show ? 'visible opacity-100': 'invisible opacity-0'}
                w-full
                transition-all
                `}
            >
                <ul 
                    className="
                    flex flex-col gap-[4px]
                    rounded-[4px] border border-neutral-200
                    w-full min-w-[200px] max-h-[160px] overflow-y-scroll
                    px-[4px] py-[4px] bg-background-0
                    shadow-md
                    "
                >
                    {options.map((o, index) => {
                        let isSelected = isIndexSelected(index)
                        return <li 
                            key={index}
                            className={`
                            rounded-[4px] px-[10px] py-[10px]
                            ${isSelected ? 'bg-primary-500' : 'hover:bg-primary-50'} 
                            ${isSelected ? 'text-white' : 'text-neutral-900'}
                            transition-all
                            cursor-pointer
                            text-ll font-ll
                            `}
                            onClick={() => {
                                console.log("SelectBox.onClick")
                                setShow(false)
                                onSelect && onSelect(o, index)
                            }}
                        >{
                            typeof(o) === 'string' ? o: o.name
                        }</li>
                    })}

                    {/* label for no option */}
                    {(options.length == 0) && 
                    <li className="text-center text-ll font-ll p-[10px] text-neutral-300">No option</li>
                    }
                    {/* <li>Empty</li> */}
                </ul>
            </div>
            
        </div>
    );
}

export default SelectBox;