import { forwardRef, useEffect, useReducer, useState } from "react";
import Avatar from "../../components/Avatar";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";
import BreadcrumbItem from "../../components/Breadcrumb/BreadcrumbItem";
import FilledButton from "../../components/Buttons/FilledButton";
import GhostButton from "../../components/Buttons/GhostButton";
import SelectBox from "../../components/SelectBox";
import TextField from "../../components/TextField";
import CheckBox from "../../components/CheckBox";
import DatePicker from "../../components/DatePicker";
import { useParams } from "react-router-dom";
import useEffectUserDetail from "../../hooks/useEffectUserDetail";
import { fullname } from "../../utils/fullname";
import { position } from "../../utils/position";
import { apiPaths, apiRoute, imageRoute } from "../../configs/api.config";
import useUserShifts from "../../hooks/useUserShifts";
import { format } from "../../utils/fast-date-fns";
import { usePushNoti } from "../../components/Noti/NotiSystem";
import { useAuthContext } from "../../hooks/AuthStateContext";
import LucideIcon from "../../lib/LucideIcon";
import HoverInfo from "../../components/HoverInfo";
import usePayslipDetail from "../../hooks/usePayslipDetail";

export default function PayslipDetailPage() {

    let pushNoti = usePushNoti()

    let { id } = useParams()

    let auth = useAuthContext()

    let payslip = usePayslipDetail(id)
    console.log("Payslip", payslip)
    let user = useEffectUserDetail(payslip?.detail?.user_id ?? "")

    let salary = Number(payslip.detail?.salary)
    let tax = Number(payslip.detail?.tax)

    let allowances = payslip.items?.filter(x => x.type === 'allowance') ?? []
    let deductions = payslip.items?.filter(x => x.type === 'deduction') ?? []

    let from = new Date(payslip.detail?.from_date)
    let fromText = isNaN(from) ? "" : format(from, "d MMMM yyyy")

    let to = new Date(payslip.detail?.to_date)
    let toText = isNaN(to) ? "" : format(to, "d MMMM yyyy")

    function money(amount, salary, relative) {
        amount = Number(amount).isNaN ? 0 : Number(amount)
        salary = Number(salary).isNaN ? 0 : Number(salary)
        return (relative ? salary * amount: amount)
    }

    function moneyText(amount, salary, relative) {
        let value = Number(amount).isNaN ? 0 : Number(amount)
        salary = Number(salary).isNaN ? 0 : Number(salary)
        let percentage = `${(amount * 100).toFixed(0)}%`

        let text = `${relative ? `(${percentage} of salary) ` : ""}${money(value, salary, relative)} MMK`

        return text
    }

    let grossIncome = allowances.reduce(
        (p, c) => p + money(c.amount, payslip.detail?.salary ?? 0, c.relative_amount), 
        Number(payslip.detail?.salary) + Number(payslip.detail?.overtime)
    )

    let grossDeduction = deductions.reduce(
        (p, c) => p + money(c.amount, payslip.detail?.salary ?? 0, c.relative_amount), 
        (Number(payslip.detail?.tax) * salary) + Number(payslip.detail?.ssb)
    )

    let deductionCap = (grossIncome / 2)

    let overDeducted = grossDeduction > deductionCap
    let deductionRelief = 0
    if (overDeducted) {
        deductionRelief = grossDeduction - deductionCap
        grossDeduction = deductionCap
    }
    
    function hasOvertime() {
        ~~Number(payslip.detail?.overtime) !== 0
    }

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center gap-[20px]">
                <Breadcrumb>
                    <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Payslips" to='/payslips'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Update" current/>
                </Breadcrumb>
                <div className="grow"/>
            </div>
            
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Schedule Shift</h1>
                <p className="text-neutral-900 text-bm font-bm">Schedule weekly shift for an employee.</p>
            </div>

            {/* User */}
            <div className="flex items-center gap-[10px]">
                <Avatar src={imageRoute(user.avatar_path)} size={40} title="A"/>
                <div className="flex flex-col">
                    <p className="font-ll text-ll">{fullname(user.first_name, user.last_name)}</p>
                    <p className="font-ls text-ls">{position(user.designation_name, user.department_name)}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-[20px]">
                <div className="grid grid-cols-2 gap-[20px]">
                    <div className="flex flex-col p-[10px] bg-background-1 rounded-[6px]">
                        <h3 className="text-bl font-bold">{fromText}</h3>
                        <p className="text-bs">From</p>
                    </div>
                    <div className="flex flex-col p-[10px] bg-background-1 rounded-[6px]">
                        <h3 className="text-bl font-bold">{toText}</h3>
                        <p className="text-bs">To</p>
                    </div>
                </div>
                <div/>
                <div className="flex flex-col">
                    <PayslipItem boldTitle title="Income"/>

                    <PayslipItem title="Base Salary" amount={payslip.detail?.salary ?? ""} boldAmount/>
                    {allowances.map(x => {
                        return <PayslipItem 
                            key={x.id} 
                            title={x.name}
                            amount={moneyText(x.amount, payslip.detail?.salary, x.relative_amount)}
                            style="success"
                        />
                    })}
                    {hasOvertime() && <PayslipItem title="Overtime" amount={payslip.detail?.overtime ?? ""} boldAmount/>}
                    <Separator/>
                    <PayslipItem boldTitle title="Gross Income" amount={`${grossIncome} MMK`} boldAmount style="success"/>
                    <Separator/>
                    <PayslipItem boldTitle title="Deduction"/>
                    {deductions.map(x => {
                        return <PayslipItem 
                            key={x.id} 
                            title={x.name}
                            amount={moneyText(x.amount, payslip.detail?.salary, x.relative_amount)}
                            style="danger"
                        />
                    })}
                    {overDeducted && <PayslipItem 
                            title="Lawful Overdeduction relief"
                            amount={moneyText(deductionRelief)}
                            style="danger"
                        />}
                    <PayslipItem title="Income Tax" amount={`${tax * grossIncome} MMK`} style="danger"/>
                    <PayslipItem title="SSB" amount={`${payslip.detail?.ssb ?? 0} MMK`} style="danger"/>
                    <Separator/>
                    <PayslipItem boldTitle title="Gross Deduction" amount={`${grossDeduction} MMK`} boldAmount style="danger"/>
                    <Separator/>
                    <PayslipItem boldTitle title="Net Salary" amount={`${grossIncome - grossDeduction} MMK`} boldAmount/>
                    <Separator/>
                </div>
            </div>
        </div>

    );
}

function PayslipItem({title, boldTitle = false, amount, boldAmount = false, style}) {
    let textColor = "text-neutral-900"
    if (style === 'danger') textColor = 'text-danger-600'
    if (style === 'success') textColor = 'text-success-600'
    
    return (
        <div className="p-[10px] flex">
            <h3 className={`text-bs ${boldTitle ? 'font-bold' : 'font-normal'}`}>{title}</h3>
            <div className="grow"/>
            {amount != null && <p className={`text-ll ${boldAmount ? "font-bold": ""} ${textColor}`}>{amount}</p>}
        </div>
    )
}

function Separator() {
    return (<div className="h-[1px] bg-background-2"/>)
}
