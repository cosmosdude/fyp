function Breadcrumb({children}) {
    return ( 
        <ul className="flex gap-[4px]">
            {children}
        </ul> 
    );
}

export default Breadcrumb;