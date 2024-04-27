import { useState } from "react";
import LucideIcon from "../lib/LucideIcon";
import AcknowledgementBackend from "./Acknowledgement/AcknowledgementBackend";
import AcknowledgementFrontend from "./Acknowledgement/AcknowledgementFrontend";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../components/Breadcrumb/BreadcrumbItem";

function FrontendLicensesPage() {
    return (
        <div className="flex flex-col gap-[20px] w-full">
            {/* Top nav */}
            <div className="flex items-center">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Acknowledgements" current/>
                </Breadcrumb>
                <div className="grow"/>
                {/* <FilledButton to="requests" rightIcon='arrow-right'>Attendance Requests</FilledButton> */}
            </div>
            <Accordion title="Frontend Acknowledgements">
                <AcknowledgementFrontend/>
            </Accordion>
            <Accordion title="Backend Acknowledgements">
                <AcknowledgementBackend/>
            </Accordion>
            <Accordion title="Design">
                <div className="flex flex-col p-[20px] gap-[20px]">
                    <div className="flex flex-col">
                        <span className="text-bl font-bl flex gap-[10px] items-center"> 
                            <img className="rounded" src="https://static.figma.com/app/icon/1/icon-192.png" width={18} height={18}/>
                            <a className="hover:opacity-25 transition-all text-primary-500" href="https://www.figma.com/">Figma: The Collaborative Interface Design Tool</a>
                        </span>
                        <p className="text-bm font-bm">Thank you for providing me a student license.</p>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-bl font-bl flex gap-[10px] items-center"> 
                            <img className="rounded" src="https://undraw.co/favicon-32x32.png" width={18} height={18}/>
                            <a className="hover:opacity-25 transition-all text-primary-500" href="https://undraw.co/">unDraw: Open-source illustrations</a>
                        </span>
                        <p className="text-bm font-bm">Some of the illustrations were originated from this site.</p>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-bl font-bl flex gap-[10px] items-center"> 
                            <img className="rounded" src="https://lucide.dev/logo.light.svg" width={18} height={18}/>
                            <a className="hover:opacity-25 transition-all text-primary-500" href="https://lucide.dev/">Lucide: Beautiful & Consistent Icon</a>
                        </span>
                        <p className="text-bm font-bm">All of the icons used in the project were originated from this site.</p>
                    </div>

                    
                </div>
                
            </Accordion>
        </div>
    );
}

export default FrontendLicensesPage;


function Accordion({title, children}) {
    let [hidden, setHidden] = useState(true)
    return (
        <div className="p-[20px] flex flex-col bg-background-1 rounded-[14px] transition-all">
            <span 
            className="font-tm text-tm flex items-center gap-[10px] hover:opacity-65 transition-all cursor-pointer"
            onClick={() => setHidden(x => !x)}
            >
                <span className={`${hidden ? 'rotate-0': 'rotate-45'} transition-all`}>
                    <LucideIcon size={24} name="plus"/>
                </span>
                {title}
            </span>
            <div className="transition-all" hidden={hidden}>
                {children}
            </div>
        </div>
    )
}