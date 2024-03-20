import EyeOnSVG from '../assets/Icons/eye.svg'
import EyeOffSVG from '../assets/Icons/eye-off.svg'
import { forwardRef, useState } from 'react'
import LucideIcon from '../lib/LucideIcon'

const TextField = forwardRef(function TextField({
    title, placeholder, error, 
    text = undefined, secureTextEntry,
    name, required,
    disabled,
    leftImageSrc, rightImageSrc,
    leftIcon, rightIcon,
    onChange
}, ref) {
    
    let eye = { on: EyeOnSVG, off: EyeOffSVG }

    let [revealed, setRevealed] = useState(false)
    let [isInvalid, setIsInvalid] = useState(false)

    // if given text is null, reset to empty.
    if (text === null) text = ''
    // s, !r => 'password'
    // s, r => 'text'
    // !s, r => 'text'
    // !s, !r => 'text'
    // if (!text) { text = ""}

    return (
        <div className="flex flex-col gap-[4px]">
            { !!title && <p className="font-bs text-lm text-neutral-900">{title}</p> }

            {/* Textfield like area */}
            <div 
                className={`
                flex items-center gap-[10px] 
                px-[10px] h-[41px] 
                focus-within:px-[9px]
                rounded-[4px] 
                border 
                focus-within:border-[2px]
                ${ (!isInvalid && !error) ? 'border-neutral-200' : 'border-danger-200'}
                focus-within:border-primary
                ${disabled ? 'bg-background-2' : 'bg-background-0'}
                transition-all
                `}
            >
                {/* Left Image */}
                {!!leftImageSrc && <img className="w-[18px] h-[18px]" src={leftImageSrc}/>}
                { leftIcon && <LucideIcon name={leftIcon} size={18}/>}
                {/* Input Field - text|password */}
                <input 
                    ref={ref}
                    className={`
                    peer 
                    grow outline-none text-neutral-900 placeholder-neutral-300
                    disabled:bg-transparent
                    
                    `}
                    name={name}
                    placeholder={placeholder}
                    value={text}
                    type={(secureTextEntry && !revealed) ? 'password' : 'text'}
                    required={required}
                    disabled={disabled}
                    onInvalid={(e) => { 
                        console.log(e)
                        setIsInvalid(true) // set error
                    }}
                    onInput={(e) => {
                        onChange && onChange(e)
                        setIsInvalid(false) // clear error
                    }}
                />
                {!!rightImageSrc && <img className="w-[18px] h-[18px]" src={rightImageSrc}/>}
                { rightIcon && <LucideIcon name={rightIcon} size={18}/>}
                {!!secureTextEntry && <a onClick={() => setRevealed(x => !x)}>
                    <img 
                        className="block w-[18px] h-[18px]" 
                        src={revealed ? eye.off : eye.on}
                    /> 
                </a>}
            </div>
            { !!error && <p className="text-danger-400">{error}</p> }
        </div>
    )
})

export default TextField
/*

*/
