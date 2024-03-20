import { forwardRef } from "react";
import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import GhostButton from "../../components/Buttons/GhostButton";
import SelectBox from "../../components/SelectBox";
import TextField from "../../components/TextField";
import CheckBox from "../../components/CheckBox";

export default function LeaveTypeDetailPage() {

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center gap-[20px]">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Leaves" to='/leaves'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Leave Types" to='/leaves/types'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="New" current/>
                </Breadcrumb>
                <div className="grow"/>
                {/* <GhostButton to="settings" rightIcon='settings'>Leave Types</GhostButton> */}
                {/* <FilledButton to="requests" rightIcon='arrow-right'>New Type</FilledButton> */}
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">New Type</h1>
                <p className="text-neutral-900 text-bm font-bm">Create a new leave type.</p>
            </div>
            <div className="grid grid-cols-2">
                <div className="flex flex-col gap-[20px]">
                    <TextField 
                        title='Name (required)' 
                        placeholder="eg. Casual Leave"
                        // text={employee.username}
                        // disabled={type === 'detail'}
                        required
                        // onChange={(e) => {
                        //     dispatchEmployee({value: {
                        //         username: e.target.value
                        //     }})
                        // }}
                    />
                    <section className="grid grid-cols-2 gap-[20px]">
                        <TextField 
                            title='Initial (days)' 
                            placeholder="eg. Casual Leave"
                            // text={employee.username}
                            // disabled={type === 'detail'}
                            required
                            // onChange={(e) => {
                            //     dispatchEmployee({value: {
                            //         username: e.target.value
                            //     }})
                            // }}
                        />
                        <TextField 
                            title='Max (days)' 
                            placeholder="eg. Casual Leave"
                            // text={employee.username}
                            // disabled={type === 'detail'}
                            required
                            // onChange={(e) => {
                            //     dispatchEmployee({value: {
                            //         username: e.target.value
                            //     }})
                            // }}
                        />
                    </section>
                    <section className="grid grid-cols-1 gap-[20px]">
                        <SelectBox 
                            title='Gender' 
                            placeholder="eg. Casual Leave"
                            // text={employee.username}
                            // disabled={type === 'detail'}
                            required
                            options={'Male,Female,Unspecified'.split(',')}
                            // onChange={(e) => {
                            //     dispatchEmployee({value: {
                            //         username: e.target.value
                            //     }})
                            // }}
                        />
                    </section>

                    <section className="grid grid-cols-3 gap-[20px]">
                        <CheckBox label="Halfday allowed"/>
                        <CheckBox label="Carried"/>
                        <CheckBox label="Earnable"/>
                        {/* <div className="flex items-center gap-[10px]">
                        </div> */}
                    </section>
                    <section className="grid grid-cols-2 gap-[20px]">
                        <FilledButton>
                            Create
                        </FilledButton>
                    </section>
                </div>
                
            </div>
        </div>

    );
}
