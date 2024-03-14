/**
 * Avatar Icon
*/
function Avatar({src = undefined, title = "", size = 40}) {
    let starts = title.split(' ').filter(x => x.length != 0)
        .map(x => x.charAt(0).toUpperCase())
        .join("")

    size = parseInt(size)
    if (isNaN(size)) size = 40

    return (
        <span 
            className={`
            relative inline-flex w-[${size}px] h-[${size}px] 
            rounded-full overflow-hidden 
            items-center justify-center
            bg-neutral-900
            `}
        >
            {src && <img className="object-cover w-full h-full" src={src}/>}
            {!src && <p className="absolute text-white text-ls font-ls">{starts}</p>}
        </span>
    );
}

export default Avatar;