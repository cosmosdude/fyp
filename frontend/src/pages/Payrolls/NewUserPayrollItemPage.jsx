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
import useUserPayrollItems from "../../hooks/useUserPayrollItems";
import { useEffect, useState } from "react";
import CheckBox from "../../components/CheckBox";
import SelectBox from "../../components/SelectBox";
import { capitalize } from "../../utils/capitalized";

export default function NewUserPayrollItemPage() {

    let navigate = useNavigate()
    let pushNoti = usePushNoti()
    let auth = useAuthContext()

    let {userId} = useParams()

    let [data, setData] = useState({
        name: "",
        type: "allowance",
        amount: 0,
        relative_amount: false
    })

    async function addItem() {
        let amount = data.amount
        if (data.relative_amount) amount /= 100
        try {
            let res = await fetch(apiRoute(apiPaths.payroll.createUserPayrollItems(userId)), {
                method: "POST",
                headers: {
                    'authorization': `Bearer ${auth}`,
                    'content-type': 'application/x-www-form-urlencoded'
                },
                body: `name=${data.name}&amount=${amount}&relative_amount=${data.relative_amount}&type=${data.type}`
            })

            if (res.status >= 200 && res.status < 300) {
                // setPayroll(await res.json())
                pushNoti({
                    title: "Success", 
                    message: "Payroll item added successfully.",
                    style: "success"
                })
                navigate(-1)
            } else {
                pushNoti({
                    title: "Error", 
                    message: `Unable to add payroll item. (${await res.text()})`,
                    style: "danger"
                })
            }
        } catch (error) { 
            pushNoti({
                title: "Error", 
                message: `Unable to add payroll item. ${error}`,
                style: "danger"
            })
        }
    }

    return (
        <div className="flex flex-col w-full h-full gap-[20px] overflow-x-hidden overflow-y-scroll">
            {/* Top nav */}
            <div className="flex items-center">
                <Breadcrumb>
                <BreadcrumbItem title="Home" to='/'/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Payroll" to="/payrolls"/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Update" to={-1}/>
                    <BreadcrumbItem title="/"/>
                    <BreadcrumbItem title="Add Item" current/>
                </Breadcrumb>
                <div className="grow"/>
            </div>
            {/* Title */}
            <div className="flex flex-col">
                <h1 className="text-neutral-900 text-tl font-tl">Add Item</h1>
                <p className="text-neutral-900 text-bm font-bm">Add a payroll item.</p>
            </div>
            {/* Title */}
            <div className="grid grid-cols-2 gap-[20px]">
                <div className="flex flex-col gap-[10px]">
                    
                    <TextField 
                        title="Name"
                        text={data.name}
                        onChange={e => {setData({...data, name: e.target.value})}}
                    />
                    {/* <TextField title="Type" text={""} onChange={e => {}}/> */}
                    <SelectBox 
                        title="Type" 
                        text={capitalize(data.type)}
                        options={["Allowance", "Deduction"]}
                        selected={["Allowance", "Deduction"].indexOf(capitalize(data.type))}
                        onSelect={x => setData({...data, type: x.toLowerCase()}) }
                    />

                    <TextField 
                        title={`Amount (${data.relative_amount ? "%" : "MMK"})`} 
                        text={ Math.abs(~~Number(data.amount)) } 
                        onChange={e => {
                            setData({...data, amount: ~~Number(e.target.value)})
                        }}
                    />
                    <CheckBox 
                        label="Relative To Salary?" 
                        checked={data.relative_amount}
                        onChange={e => {
                        setData({...data, relative_amount: e.target.checked})
                    }}/>
                    <div className="grid grid-cols-2 gap-[20px]">
                        <FilledButton onClick={addItem}>Create</FilledButton>
                        <div/>
                    </div>
                </div>
                <div/>
            </div>
            
        </div>

    );
}
