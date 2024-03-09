import { useRef, useState } from 'react'
import Icon from '../assets/Icons/file.svg'

import { format }  from 'date-fns'

/**
 * @param title Title label
 * @param placeholder Placeholder text for absence of text
 * @param text Display text
 * @param error Error text
 * @param disabled Disable state
 * @param onDateSelect Date selection callback
*/
function FileField({
    title, placeholder, 
    text = undefined,  // to display
    error, disabled, 
    onFileSelect,
}) {
    let [fallbackText, setFallbackText] = useState("")
    let textToDisplay = text === undefined ? fallbackText : text

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
                focus-within:border-primary-500
                ${ !disabled && 'hover:bg-primary-50'}
                ${ disabled ? 'bg-background-1' : ''}
                transition-all
                `}
                disabled={disabled}
                onClick={(e) => {
                    e.preventDefault()
                    picker.current.showPicker()
                }}
            >
                <img className="w-[18px] h-[18px]" src={Icon}/>
                <label 
                    className={` 
                    grow
                    text-left 
                    ${(!disabled && textToDisplay) ? 'text-neutral-900': 'text-neutral-300'}
                    pointer-events-none
                    `}
                >{textToDisplay ? textToDisplay : (placeholder || " ")}</label>
                <input 
                    ref={picker}
                    className={`top-[100%] left-0 absolute w-[0px] h-[0px]`} 
                    type='file'
                    disabled={disabled}
                    onChange={e => {
                        console.log(e.target.value)
                        console.log(e.target.files)

                        let file = e.target.files[0]
                        let filename = ""
                        if (file) filename = file.name
                        else { filename = "" }

                        onFileSelect && onFileSelect(e.target.files[0], filename)
                        setFallbackText(filename)
                    }}
                />
            </button>
            { !!error && <p className="text-danger-400">{error}</p> }
        </div>
    )
}

export default FileField;