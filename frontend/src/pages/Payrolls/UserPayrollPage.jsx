import { format } from "date-fns";
import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import useEffectGetHolidays from "../../hooks/useEffectGetHolidays";
import { useNavigate, useParams } from "react-router-dom";
import useEffectUserDetail from "../../hooks/useEffectUserDetail";
import { apiPaths, apiRoute, imageRoute } from "../../configs/api.config";
import { fullname } from "../../utils/fullname";
import { position } from "../../utils/position";
import TextField from "../../components/TextField";
import LucideIcon from "../../lib/LucideIcon";
import useUserPayroll from "../../hooks/useUserPayroll";
import { usePushNoti } from "../../components/Noti/NotiSystem";
import { useAuthContext } from "../../hooks/AuthStateContext";

export default function UsersPayrollPage() {

    let navigate = useNavigate()
    let pushNoti = usePushNoti()
    let auth = useAuthContext()

    let {userId} = useParams()

    let user = useEffectUserDetail(userId)

    let [payroll, setPayroll] = useUserPayroll(userId)

    function setWage(wage) {
        wage = Math.abs(~~Number(wage))
        setPayroll({
            ...payroll, wage: wage.toFixed(0), salary: (wage * 30).toFixed(0)
        })
    }

    function setSalary(salary) {
        salary = Math.abs(~~Number(salary))
        setPayroll({
            ...payroll, wage: (salary / 30).toFixed(0), salary: salary.toFixed(0)
        })
    }

    function getOvertimeRate() {
        let rate = Number(payroll.overtime_rate)
        if (isNaN(rate)) return 0
        return (rate * 100).toFixed(0)
    }
    function setOvertimeRate(rate) {
        rate = Math.abs(~~Number(rate))
        console.log("Rate", rate, rate / 100)
        setPayroll({
            ...payroll, overtime_rate: (rate / 100)
        })
    }

    let past = useEffectGetHolidays('past')
    let upcoming = useEffectGetHolidays('upcoming')

    async function updatePayroll() {
        try {
            let res = await fetch(apiRoute(apiPaths.payroll.userPayroll(userId)), {
                method: "PUT",
                headers: {
                    'authorization': `Bearer ${auth}`,
                    'content-type': 'application/x-www-form-urlencoded'
                },
                body: `salary=${payroll.salary}&wage=${payroll.wage}&overtime_rate=${payroll.overtime_rate}`
            })

            if (res.status >= 200 && res.status < 300) {
                // setPayroll(await res.json())
                pushNoti({
                    title: "Success", 
                    message: "Payroll data updated",
                    style: "success"
                })
            } else {
                pushNoti({
                    title: "Error", 
                    message: "Unable to update payroll.",
                    style: "danger"
                })
            }
        } catch (error) { 
            pushNoti({
                title: "Error", 
                message: `Unable to update payroll. ${error}`,
                style: "danger"
            })
        }
    }

    function deleteItem() {

    }

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Holidays" current/>
                </Breadcrumb>
                <div className="grow"/>
                <FilledButton icon='plus' to='new'>Add Payroll Item</FilledButton>
            </div>
            {/* Title */}
            <div className="grid grid-cols-2 gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                    <div className="flex items-center gap-[10px]">
                        <Avatar src={imageRoute(user.avatar_path)} size={40} title="A"/>
                        <div className="flex flex-col">
                            <p className="font-ll text-ll">{fullname(user.first_name, user.last_name)}</p>
                            <p className="font-ls text-ls">{position(user.designation_name, user.department_name)}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-[20px]">
                        <TextField title="Wage (MMK)" text={payroll.wage ?? "0"} onChange={e => {setWage(e.target.value)}}/>
                        <TextField title="Salary (MMK)" text={payroll.salary ?? "0"} onChange={e => {setSalary(e.target.value)}}/>
                    </div>
                    <TextField 
                        title="Overtime Pay Rate (%)"
                        text={ getOvertimeRate() }
                        onChange={e => {setOvertimeRate(e.target.value)}}
                    />
                    <div className="grid grid-cols-2 gap-[20px]">
                        <FilledButton onClick={updatePayroll}>Update</FilledButton>
                        <div/>
                    </div>
                </div>
                <div/>
            </div>
            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-[20px] overflow-hidden">
                <div className="flex flex-col gap-[10px] overflow-hidden ">
                    <h2 className="font-ts text-ts">Allowances</h2>
                    <PayrollItemTable>
                        <PayrollItemTableHeader/>
                        <tbody className="">
                            {/* <AttendanceRow /> */}
                            {past.map((x, i) => (
                                <PayrollItemTableRow 
                                    key={x.id} 
                                    no={i} 
                                    name={x.name}
                                    date={format(new Date(x.date), 'd MMM')} 
                                    day={format(new Date(x.date), 'EEE')}
                                    onClick={() => navigate(x.id)}
                                />
                            )
                            )}
                        </tbody>
                    </PayrollItemTable>
                </div>

                <div className="flex flex-col gap-[10px] overflow-hidden ">
                    <h2 className="font-ts text-ts">Deductions</h2>
                    <PayrollItemTable>
                        <PayrollItemTableHeader/>
                        <tbody className="">
                            {/* <AttendanceRow /> */}
                            {upcoming.map((x, i) => (
                                <PayrollItemTableRow 
                                    key={x.id} 
                                    no={i} 
                                    name={x.name}
                                    date={format(new Date(x.date), 'd MMM')} 
                                    day={format(new Date(x.date), 'EEE')}
                                    onClick={() => navigate(x.id)}
                                />
                            )
                            )}
                        </tbody>
                    </PayrollItemTable>
                </div>
            </div>
        </div>

    );
}

function PayrollItemTable({children}) {
    children = children ?? []
    return (
        <div className="overflow-hidden md:overflow-scroll w-full border rounded-[6px]">
            <table className="table-auto min-w-full mx-auto border-separate border-spacing-0">
                {children}
            </table>
        </div>
    )
}

function PayrollItemTableHeader() {
    return (
        <thead className="sticky top-[0px] left-0 z-10">
            <tr className="
            [&>*]:px-[24px] [&>*]:py-[16px]
            [&>*]:border-[0.5px] 
            [&>*]:font-bm [&>*]:text-bm
            [&>*]:bg-background-1
            ">
                <th className="min-w-[75px] w-[50px]">No.</th>
                <th className="text-left font-bm text-bm whitespace-nowrap">Name</th>
                <th className="min-w-[125px] whitespace-nowrap">Amount</th>
                <th></th>
            </tr>
        </thead>
    )
}

function PayrollItemTableRow({no, name, date, day, onClick}) {
    return (
        <tr className="
        group
        [&>*]:px-[16px] [&>*]:py-[12px] 
        bg-background-0
        hover:bg-primary-50
        cursor-pointer
        transition-all
        [&>*]:transition-all
        "
        onClick={onClick}
        >
            <td className="text-center font-ls text-ls w-[50px]">
                {no ?? ''}
            </td>
            <td className="text-left font-bs text-bs whitespace-nowrap">
                {name}
                {/* Thingyan lkasjdf kljaskldjf klasjdklfj aklsdfkljklasdfkl */}
            </td>
            <td className="text-center font-ll text-ll whitespace-nowrap">
                {date}
                {/* 13 April, 2024 */}
            </td>
            <td className="text-center font-ll text-ll whitespace-nowrap">
                <button className="text-danger-600 hover:opacity-25 transition-all">
                    <LucideIcon size={18} name="trash-2"/>
                </button>
            </td>
        </tr>
    )
}