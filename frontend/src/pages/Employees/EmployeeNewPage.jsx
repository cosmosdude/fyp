import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import DatePicker from "../../components/DatePicker";
import SelectBox from "../../components/SelectBox";
import TextField from "../../components/TextField";

function EmployeeNewPage() {
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

                        {/* Row */}
                        <div className="grid grid-cols-1 gap-[20px]">
                            <TextField 
                                title='Username (required)' 
                                placeholder="eg. john-doe"
                                text={undefined}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-[20px]">
                            <TextField 
                                title='Password (required)' 
                                placeholder="eg. john1234"
                                text={undefined}
                                required
                            />
                            <TextField 
                                title='Retype Password (required)' 
                                placeholder="eg. john1234"
                                text={undefined}
                                required
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
                                text={undefined}
                            />
                            <TextField 
                                title='Last Name' 
                                placeholder="eg. Doe"
                                text={undefined}
                            />
                        </div>

                        {/* Row */}
                        <div className="grid grid-cols-2 gap-[20px]">
                            <DatePicker 
                                title='Date of Birth' 
                                placeholder=""
                                text={undefined}
                            />
                            <SelectBox 
                                title='Gender' 
                                placeholder="Unspecified"
                                text={undefined}
                                options={['Male', 'Female', 'Unspecified']}
                            />
                        </div>

                        {/* Row */}
                        <div className="grid grid-cols-2 gap-[20px]">
                            <TextField 
                                title='Email' 
                                placeholder=""
                                text={undefined}
                            />
                            <TextField 
                                title='Phone' 
                                placeholder=""
                                text={undefined}
                            />
                        </div>

                        {/* Row */}
                        <div className="grid grid-cols-1 gap-[20px]">
                            <TextField 
                                title='Address' 
                                placeholder=""
                                text={undefined}
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
                                text={undefined}
                                required
                            />
                        </div>

                        {/* Row */}
                        <div className="grid grid-cols-1 gap-[20px]">
                            <TextField 
                                title='Work Phone' 
                                placeholder="eg. 0123456789"
                                text={undefined}
                            />
                        </div>

                        {/* Row */}
                        <div className="grid grid-cols-1 gap-[20px]">
                            <SelectBox 
                                title='Department' 
                                placeholder="Select department"
                                text={undefined}
                                options={['Male', 'Female', 'Unspecified']}
                            />
                        </div>

                        {/* Row */}
                        <div className="grid grid-cols-1 gap-[20px]">
                            <SelectBox 
                                title='Designation' 
                                placeholder="Select designation"
                                text={undefined}
                                options={['Male', 'Female', 'Unspecified']}
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
                                text={undefined}
                            />
                            <TextField 
                                title='Relationship' 
                                placeholder="eg. john1234"
                                text={undefined}
                            />
                        </div>
                        {/* Row */}
                        <div className="grid grid-cols-1 gap-[20px]">
                            <TextField 
                                title='Phone' 
                                placeholder="eg. john1234"
                                text={undefined}
                            />
                        </div>

                        {/* Row */}
                        <div className="grid grid-cols-2 gap-[20px]">
                            <TextField 
                                title='Name' 
                                placeholder="eg. john1234"
                                text={undefined}
                            />
                            <TextField 
                                title='Relationship' 
                                placeholder="eg. john1234"
                                text={undefined}
                            />
                        </div>
                        {/* Row */}
                        <div className="grid grid-cols-1 gap-[20px]">
                            <TextField 
                                title='Phone' 
                                placeholder="eg. john1234"
                                text={undefined}
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