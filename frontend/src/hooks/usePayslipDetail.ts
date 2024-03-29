import { useEffect, useState } from "react";
import { useAuthContext } from "./AuthStateContext";
import employeeService from "../services/employeeService";
import { apiPaths, apiRoute } from "../configs/api.config";

function usePayslipDetail(id) {
    let [payslip, setPayslip] = useState({})
    let auth = useAuthContext()
    useEffect(() => {
        let aborter = new AbortController()
        async function fetchData() {
            try {
                let res = await fetch(apiRoute(apiPaths.payslip.detail(id)), {
                    method: "GET",
                    signal: aborter.signal,
                    headers: {
                        'authorization': `Bearer ${auth}`
                    }
                })

                if (res.status >= 200 && res.status < 300) {
                    setPayslip(await res.json())
                }
            } catch { }
        }
        if(id) fetchData()
        return () => aborter.abort()
    }, [id])

    return payslip
}

export default usePayslipDetail;