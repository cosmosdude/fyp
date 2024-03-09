import { useReducer } from "react";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import DatePicker from "../../components/DatePicker";
import SelectBox from "../../components/SelectBox";
import TextField from "../../components/TextField";

import { format } from 'date-fns';
import AvatarInput from "../../components/AvatarInput";
import FileField from "../../components/FileField";

import { apiPaths, apiRoute } from "../../configs/api.config";
import { useAuthContext } from "../../hooks/AuthStateContext";

function employeeReducer(state, action) {
    let {type, value} = action
    switch(type) {
        case 'avatar':
            return {
                ...state,
                avatarBlob: value,
                avatarSrc: value ? URL.createObjectURL(value): null
            }
        case 'dob': 
            return {
                ...state, 
                dobText: format(action.value, 'd MMM yyyy'),
                dob: action.value
            }
        case 'gender':
            return {
                ...state,
                gender: action.value
            }
        case 'employmentContract':
            return {
                ...state,
                employmentContractFilename: value.name,
                employmentContractFile: value.file
            }
        default: 
            let newObject = {...state}
            for (const [k, v] of Object.entries(value)) {
                console.log(k, v)
                newObject[k] = v
            }
            return newObject
    }
}



function EmployeeNewPage() {
    let authToken = useAuthContext()

    let [employee, dispatchEmployee] = useReducer(employeeReducer, {
        avatarBlob: null /*File*/, avatarSrc: null /*string*/,
        username: "", password: "", retypePassword: "",

        firstname: "", lastname: "",
        dob: null /*Date*/, dobText: "" /*string*/,
        gender: "",
        email: "", phone: "",
        address: "",

        workEmail: "", workPhone: "",
        department: null, departmentName: "", 
        designation: null, designationName: "",

        ecName1: "", ecRelation1: "",
        ecPhone1: "",
        ecName2: "", ecRelation2: "",
        ecPhone2: ""
    })

    function getFormData() {
        let f = new FormData()
        let obj = {
            avatar: employee.avatarBlob,
            username: employee.username,
            password: employee.password,

            first_name: employee.firstname,
            last_name: employee.lastname,
            phone: employee.phone,
            email: employee.email,
            work_email: employee.workEmail,
            work_phone: employee.workPhone,
            // role_id: 4, // temporarily 4
            dob: null,
        }
        
        return f
    }

    async function createEmployee() {
        let form = getFormData()
        try {

            let res = await fetch(apiRoute(apiPaths.employee.create), {
                headers: {
                    'authorization': `Bearer ${authToken}`
                },
                body: form
            })
        } catch {

        }
    }

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Employees" to='/employees'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="New" current/>
                </Breadcrumb>
                <div className="grow"/>
                {/* Show only when type is detail */}
                {/* {type === 'detail' && <FilledButton to='update'>Update</FilledButton>} */}
            </div>
            
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">New Employee</h1>
                <p className="text-neutral-900 text-bm font-bm">Create new employee record.</p>
            </div>

            {/* Content View */}
            <form 
                className="pt-[20px] pb-[200px] grow flex flex-col gap-[40px] overflow-y-scroll" 
                onSubmit={(e) => {
                    e.preventDefault()
                    createEmployee()
                }}
            >
                {/* Section */}
                <section className="grid grid-cols-2 gap-[20px]">
                    {/* Left side */}
                    <div className="flex flex-col border-t border-t-neutral-100">
                        <h1 className="text-neutral-900 text-ts font-ts">Account</h1>
                        <p className="text-neutral-900 text-ll font-ll">System account related information.</p>
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col gap-[20px]">
                        {/* One item row */}
                        <div className="grid grid-cols-2 gap-[20px]">
                            <AvatarInput 
                                className="aspect-square"
                                src={employee.avatarSrc}
                                onAvatarSelect={avatar => {
                                    dispatchEmployee({type: 'avatar', value: avatar})
                                }}
                            />
                        </div>
                        {/* Row */}
                        <div className="grid grid-cols-1 gap-[20px]">
                            <TextField 
                                title='Username (required)' 
                                placeholder="eg. john-doe"
                                text={employee.username}
                                required
                                onChange={(e) => {
                                    dispatchEmployee({value: {
                                        username: e.target.value
                                    }})
                                }}
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-[20px]">
                            <TextField 
                                title='Password (required)' 
                                placeholder="eg. john1234"
                                text={employee.password}
                                required
                                secureTextEntry
                                onChange={(e) => {
                                    dispatchEmployee({value: {
                                        password: e.target.value
                                    }})
                                }}
                            />
                            <TextField 
                                title='Retype Password (required)' 
                                placeholder="eg. john1234"
                                text={employee.retypePassword}
                                required
                                secureTextEntry
                                onChange={(e) => {
                                    dispatchEmployee({value: {
                                        retypePassword: e.target.value
                                    }})
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* Section */}
                <section className="grid grid-cols-2 gap-[20px]">
                    {/* Left side */}
                    <div className="flex flex-col border-t border-t-neutral-100">
                        <h1 className="text-neutral-900 text-ts font-ts">Personal</h1>
                        <p className="text-neutral-900 text-ll font-ll">
                            Employee's personal information.
                        </p>
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col gap-[20px]">
                        {/* One item row */}

                        {/* Row */}
                        <div className="grid grid-cols-2 gap-[20px]">
                            <TextField 
                                title='First Name' 
                                placeholder="eg. John"
                                text={employee.firstname}
                                onChange={(e) => {
                                    dispatchEmployee({value: {
                                        firstname: e.target.value
                                    }})
                                }}
                            />
                            <TextField 
                                title='Last Name' 
                                placeholder="eg. Doe"
                                text={employee.lastname}
                                onChange={(e) => {
                                    dispatchEmployee({value: {
                                        lastname: e.target.value
                                    }})
                                }}
                            />
                        </div>

                        {/* Row */}
                        <div className="grid grid-cols-2 gap-[20px]">
                            <DatePicker 
                                title='Date of Birth' 
                                placeholder="Select date"
                                text={employee.dobText || ""}
                                date={employee.dob}
                                // disabled
                                onDateSelect={(date, text) => {
                                    dispatchEmployee({
                                        type: 'dob',
                                        value: date
                                    })
                                }}
                            />
                            <SelectBox 
                                title='Gender' 
                                placeholder="Unspecified"
                                text={employee.gender}
                                options={['Male', 'Female', 'Unspecified']}
                                onSelect={(item) => {
                                    dispatchEmployee({value: {
                                        gender: item
                                    }})
                                }}
                            />
                        </div>

                        {/* Row */}
                        <div className="grid grid-cols-2 gap-[20px]">
                            <TextField 
                                title='Email' 
                                placeholder=""
                                text={employee.email}
                                onChange={(e) => {
                                    dispatchEmployee({value: {
                                        email: e.target.value
                                    }})
                                }}
                            />
                            <TextField 
                                title='Phone' 
                                placeholder=""
                                text={employee.phone}
                                onChange={(e) => {
                                    dispatchEmployee({value: {
                                        phone: e.target.value
                                    }})
                                }}
                            />
                        </div>

                        {/* Row */}
                        <div className="grid grid-cols-1 gap-[20px]">
                            <TextField 
                                title='Address' 
                                placeholder=""
                                text={employee.address}
                                onChange={(e) => {
                                    dispatchEmployee({value: {
                                        address: e.target.value
                                    }})
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* Section */}
                <section className="grid grid-cols-2 gap-[20px]">
                    {/* Left side */}
                    <div className="flex flex-col border-t border-t-neutral-100">
                        <h1 className="text-neutral-900 text-ts font-ts">
                            Work
                        </h1>
                        <p className="text-neutral-900 text-ll font-ll">
                            Detail workplace contact information.
                        </p>
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col gap-[20px]">

                        {/* Row */}
                        <div className="grid grid-cols-1 gap-[20px]">
                            <TextField 
                                title='Work Email (required)' 
                                placeholder="eg. john.work@hrms.com"
                                text={employee.workEmail}
                                required
                                onChange={(e) => {
                                    dispatchEmployee({value: {
                                        workEmail: e.target.value
                                    }})
                                }}
                            />
                        </div>

                        {/* Row */}
                        <div className="grid grid-cols-1 gap-[20px]">
                            <TextField 
                                title='Work Phone' 
                                placeholder="eg. 0123456789"
                                text={employee.workPhone}
                                onChange={(e) => {
                                    dispatchEmployee({value: {
                                        workPhone: e.target.value
                                    }})
                                }}
                            />
                        </div>

                        {/* Row */}
                        <div className="grid grid-cols-1 gap-[20px]">
                            <SelectBox 
                                title='Department' 
                                placeholder="Select department"
                                text={employee.departmentName}
                                options={['Male', 'Female', 'Unspecified']}
                                onSelect={(item, index) => {
                                    dispatchEmployee({value: {
                                        departmentName: item
                                    }})
                                }}
                            />
                        </div>

                        {/* Row */}
                        <div className="grid grid-cols-1 gap-[20px]">
                            <SelectBox 
                                title='Designation' 
                                placeholder="Select designation"
                                text={employee.designationName}
                                options={['Male', 'Female', 'Unspecified']}
                                onSelect={(item, index) => {
                                    dispatchEmployee({value: {
                                        designationName: item
                                    }})
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* Section */}
                <section className="grid grid-cols-2 gap-[20px]">
                    {/* Left side */}
                    <div className="flex flex-col border-t border-t-neutral-100">
                        <h1 className="text-neutral-900 text-ts font-ts">
                            Emergeny Contact
                        </h1>
                        <p className="text-neutral-900 text-ll font-ll">
                            Primary and secondary emergency contact information.
                        </p>
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col gap-[20px]">

                        {/* Row */}
                        <div className="grid grid-cols-2 gap-[20px]">
                            <TextField 
                                title='Name' 
                                placeholder="eg. john1234"
                                text={employee.ecName1}
                                onChange={(e) => {
                                    dispatchEmployee({value: {
                                        ecName1: e.target.value
                                    }})
                                }}
                            />
                            <TextField 
                                title='Relationship' 
                                placeholder="eg. john1234"
                                text={employee.ecRelation1}
                                onChange={(e) => {
                                    dispatchEmployee({value: {
                                        ecRelation1: e.target.value
                                    }})
                                }}
                            />
                        </div>
                        {/* Row */}
                        <div className="grid grid-cols-1 gap-[20px]">
                            <TextField 
                                title='Phone' 
                                placeholder="eg. john1234"
                                text={employee.ecPhone1}
                                onChange={(e) => {
                                    dispatchEmployee({value: {
                                        ecPhone1: e.target.value
                                    }})
                                }}
                            />
                        </div>

                        {/* Row */}
                        <div className="grid grid-cols-2 gap-[20px]">
                            <TextField 
                                title='Name' 
                                placeholder="eg. john1234"
                                text={employee.ecName2}
                                onChange={(e) => {
                                    dispatchEmployee({value: {
                                        ecName2: e.target.value
                                    }})
                                }}
                            />
                            <TextField 
                                title='Relationship' 
                                placeholder="eg. john1234"
                                text={employee.ecRelation2}
                                onChange={(e) => {
                                    dispatchEmployee({value: {
                                        ecRelation2: e.target.value
                                    }})
                                }}
                            />
                        </div>
                        {/* Row */}
                        <div className="grid grid-cols-1 gap-[20px]">
                            <TextField 
                                title='Phone' 
                                placeholder="eg. john1234"
                                text={employee.ecPhone2}
                                onChange={(e) => {
                                    dispatchEmployee({value: {
                                        ecPhone2: e.target.value
                                    }})
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* Section */}
                <section className="grid grid-cols-2 gap-[20px]">
                    {/* Left side */}
                    <div className="flex flex-col border-t border-t-neutral-100">
                        <h1 className="text-neutral-900 text-ts font-ts">
                            Employment Contract
                        </h1>
                        <p className="text-neutral-900 text-ll font-ll">
                            Employment contract file.
                        </p>
                    </div>
                    {/* Right side */}
                    <div className="flex flex-col gap-[20px]">
                        {/* Row */}
                        <div className="grid grid-cols-1 gap-[20px]">
                            <FileField
                                title='Employment Contract' 
                                placeholder="No file selected"
                                text={employee.employmentContractFilename}
                                onFileSelect={(file, name) => {
                                    dispatchEmployee({
                                        type: 'employmentContract',
                                        value: {file, name}
                                    })
                                }}
                            />
                        </div>
                    </div>
                </section>

                {/* Section */}
                <section className="grid grid-cols-2 gap-[20px]">
                    <div/>
                    {/* Right side */}
                    <div className="flex flex-col gap-[20px]">

                        {/* Row */}
                        <div className="grid grid-cols-2 gap-[20px]">
                            <div/>
                            <FilledButton>Testing 1 2 3</FilledButton>
                        </div>
                    </div>
                </section>
            </form>
        </div>
    );
}

export default EmployeeNewPage;