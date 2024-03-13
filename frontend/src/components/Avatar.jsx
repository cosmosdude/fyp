/**
 * Avatar Icon
*/
function Avatar({src = undefined, name = "", size = 40}) {
    let starts = name.split('').filter(x => x.length != 0)
        .map(x => x.charAt(0).toUpperCase())
        .join()

    size = parseInt(size)
    if (isNaN(size)) size = 40

    return (
        <span 
            className={`
            inline-block w-[${size}px] h-[${size}px] 
            rounded-full overflow-hidden 
            bg-neutral-900
            `}
        >
            {/* <img className="object-cover w-full h-full"/> */}
            <p className="m-auto text-white">{starts}</p>
        </span>
    );
}

export default Avatar;