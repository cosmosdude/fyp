import EyeOnSVG from '../assets/Icons/eye.svg'
import EyeOffSVG from '../assets/Icons/eye-off.svg'
import { forwardRef, useRef, useState } from 'react'

const TextField = forwardRef(function TextField({
    title, placeholder, error, 
    text, secureTextEntry,
    name, required,
    leftImageSrc, rightImageSrc,
    onTextChange
}, ref) {

    let eye = { on: EyeOnSVG, off: EyeOffSVG }

    let [revealed, setRevealed] = useState(false)
    let [isInvalid, setIsInvalid] = useState(false)

    // s, !r => 'password'
    // s, r => 'text'
    // !s, r => 'text'
    // !s, !r => 'text'

    return (
        <div className="flex flex-col gap-[4px]">
            { !!title && <p className="font-bs text-lm text-neutral-900">{title}</p> }

            {/* Textfield like area */}
            <div 
                className={`
                flex items-center gap-[10px] 
                px-[10px] h-[41px] 
                rounded-[4px] border 
                ${ (!isInvalid && !error) ? 'border-neutral-200' : 'border-danger-200'}
                focus-within:border-primary-400
                `}
            >
                {/* Left Image */}
                {!!leftImageSrc && <img className="w-[18px] h-[18px]" src={leftImageSrc}/>}
                {/* Input Field - text|password */}
                <input 
                    ref={ref}
                    className="
                    peer 
                    grow outline-none text-neutral-900 placeholder-neutral-300
                    "
                    name={name}
                    placeholder={placeholder}
                    value={text ? text : undefined}
                    type={(secureTextEntry && !revealed) ? 'password' : 'text'}
                    required={required}
                    onInvalid={(e) => { 
                        console.log(e)
                        setIsInvalid(true) // set error
                        console.log(e.validity)
                        console.log(e.value)
                    }}
                    onInput={(e) => {
                        onTextChange && onTextChange(e.target.value)
                        setIsInvalid(false) // clear error
                    }}
                />
                {!!rightImageSrc && <img className="w-[18px] h-[18px]" src={rightImageSrc}/>}
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