import icon from '../assets/Icons/loader.svg'

export default function ActivityIndicator({className}) {
    return (
        <div className={`flex items-center justify-center ${className}`}>
            <img className='block w-[24px] h-[24px] m-auto animate-spin' src={icon}/>
        </div>
    )
}