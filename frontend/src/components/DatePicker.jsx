import { useRef, useState } from 'react'
import Icon from '../assets/Icons/calendar.svg'

import { format }  from 'date-fns'

/**
 * @param title Title label
 * @param placeholder Placeholder text for absence of text
 * @param text Display text
 * @param date Date object to control input type
 * @param error Error text
 * @param disabled Disable state
 * @param onDateSelect Date selection callback
*/
function DatePicker({
    title, placeholder, 
    text = undefined,  // to display
    date, // to control input
    error, disabled, 
    onDateSelect,
}) {
    let [fallbackText, setFallbackText] = useState("")
    let textToDisplay = text === undefined ? fallbackText : text
    // for input type
    let inputValue = format(date ?? new Date(), 'yyyy-MM-dd')
    let picker = useRef(null)

    return (
        <div className="relative flex flex-col gap-[4px]">
            { !!title && <p className="font-bs text-lm text-neutral-900">{title}</p> }

            {/* Textfield like area */}
            <button 
                className={`
                h-[41px] 
                flex items-center gap-[10px]
                px-[10px] focus-within:px[8px]
                rounded-[4px] 
                border focus-within:border-2
                border-neutral-200
                ${error ? 'border-danger-300' : 'border-neutral-200'}
                focus-within:border-primary
                ${ !disabled && 'hover:bg-primary-50'}
                ${ disabled ? 'bg-background-1' : ''}
                transition-all
                `}
                disabled={disabled}
                onClick={(e) => {
                    e.preventDefault()
                    picker.current?.showPicker()
                }}
            >
                <label 
                    className={` 
                    grow
                    text-left 
                    ${(!disabled && text) ? 'text-neutral-900': 'text-neutral-300'}
                    pointer-events-none
                    `}
                >{textToDisplay ? textToDisplay : (placeholder || " ")}</label>
                <img className="w-[18px] h-[18px]" src={Icon}/>
                <input 
                    ref={picker}
                    className={`top-[105%] left-0 absolute w-[0px] h-[0px]`} 
                    type='date'
                    value={inputValue}
                    disabled={disabled}
                    onKeyDown={e => {
                        e.preventDefault()
                        // return false
                    }}
                    onInput={e => {
                        console.log(e.target.value)
                        console.log(e.target.valueAsDate)
                        onDateSelect && onDateSelect(e.target.valueAsDate, e.target.value)
                        setFallbackText(e.target.value)
                    }}
                />
            </button>
            { !!error && <p className="text-danger-400">{error}</p> }
        </div>
    )
}

export default DatePicker;