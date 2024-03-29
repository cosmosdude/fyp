import { useEffect, useState } from "react"
import { useAuthContext } from "./AuthStateContext"
import { apiPaths, apiRoute } from "../configs/api.config"

/**
 * Fetch shifts of given user with
*/
export default function useUserPayroll(id) {
    let auth = useAuthContext()
    let [payroll, setPayroll] = useState({})
    useEffect(() => {
        let aborter = new AbortController()
        async function fetchData() {
            try {
                let res = await fetch(apiRoute(apiPaths.payroll.userPayroll(id)), {
                    method: "GET",
                    signal: aborter.signal,
                    headers: {
                        'authorization': `Bearer ${auth}`
                    }
                })

                if (res.status >= 200 && res.status < 300) {
                    setPayroll(await res.json())
                }
            } catch { }
        }
        if(id) fetchData()
        return () => aborter.abort()
    }, [id])

    return [payroll, setPayroll]
}