function Breadcrumb({children}) {
    return ( 
        <ul className="flex gap-[4px] min-h-[41px]">
            {children}
        </ul> 
    );
}

export default Breadcrumb;