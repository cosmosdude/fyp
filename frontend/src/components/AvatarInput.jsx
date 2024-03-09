import { useRef } from "react";
import CameraIcon from "../assets/Icons/camera.svg"

function AvatarInput({className, src, onAvatarSelect}) {
    let imagePicker = useRef()

    return (
    <div className={`
        group relative flex 
        overflow-hidden 
        border border-neutral-200 hover:border-primary-500 hover:border-[2px]
        rounded-[4px] 
        transition-all
        ${className}
        `}
    >
        {/* Underlay */}
        <div className="absolute block left-0 top-0 w-full h-full">
            {/* Actual Image */}
            {src && <img 
                src={src} 
                className="border-red-100 w-full h-full object-cover bg-background-2"
            />}
        </div>
        
        {/* Camera Overlay */}
        <button 
            className="
            absolute cursor-pointer 
            flex 
            left-0 top-0 w-full h-full 
            bg-transparent group-hover:bg-primary-50/25
            transition-all
            "
            onClick={e => {
                e.preventDefault() // so that enclosing form doesn't submit automatically
                imagePicker.current.showPicker() // show file picker
            }}
        >
            {!src && <img 
                src={CameraIcon} 
                className="w-[38px] h-[38px] m-auto"
            />}
            <input 
                ref={imagePicker}
                className="w-[0px] h-[0px]" type="file" accept="image/*" 
                onChange={e => {
                    // get the first file
                    let file = e.target.files[0]
                    // if the file exists
                    if (file) onAvatarSelect && onAvatarSelect(file)
                }}
                onInput={e => {
                    console.log("Image inputted.")
                }}
            />
        </button>
        
    </div>
    );
}

export default AvatarInput;