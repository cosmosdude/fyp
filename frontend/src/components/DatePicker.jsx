import { useRef, useState } from 'react'
import Icon from '../assets/Icons/calendar.svg'

function DatePicker({title, placeholder, text, error, disabled}) {
    let picker = useRef(null)
    // let [show, setShow] = useState(false)
    return (
        <div className="relative flex flex-col gap-[4px]">
            { !!title && <p className="font-bs text-lm text-neutral-900">{title}</p> }

            {/* Textfield like area */}
            <button 
                className={`
                flex items-center gap-[10px] 
                px-[10px] h-[41px] 
                rounded-[4px] 
                border
                border-neutral-200
                ${error ? 'border-danger-300' : 'border-neutral-200'}
                //${ error ? 'border-danger-300' : 'border-neutral-200'} 
                ${ !disabled && 'hover:bg-primary-50'}
                ${ disabled ? 'bg-background-1' : ''}
                peer-focus:bg-blue-100
                transition-all
                `}
                disabled={disabled}
                onClick={(e) => {
                    e.preventDefault()
                    // setShow(x => !x)
                    picker.current.disabled = !picker.current.disabled
                    console.log('Disabled?', picker.current.disabled)
                    if (!picker.current.disabled) picker.current.focus()
                }}
            >
                <label 
                    className={` 
                    grow
                    text-left 
                    ${text ? 'text-neutral-900': 'text-neutral-300'}
                    pointer-events-none
                    `}
                >{text ? text : (placeholder || " ")}</label>
                <img className="w-[18px] h-[18px]" src={Icon}/>
                <input 
                    ref={picker}
                    className={`peer absolute w-[0px] h-[0px]`} 
                    type='date'
                    
                    autoFocus
                />
            </button>
            { !!error && <p className="text-danger-400">{error}</p> }
        </div>
    )
}

export default DatePicker;